import fs from "node:fs";
import { chromium } from "playwright";

const projects = fs
  .readdirSync("content/projects")
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(/\.md$/, ""));

const posts = fs
  .readdirSync("content/blog")
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(/\.md$/, ""));

const tracks = ["revops-director", "head-of-gtm-systems", "fractional"];

const routes = [
  "/",
  "/about",
  "/projects",
  "/blog",
  "/resume",
  "/contact",
  "/hire",
  "/artifacts",
  "/trust",
  "/privacy",
  "/cms",
  ...projects.map((slug) => `/projects/${slug}`),
  ...posts.map((slug) => `/blog/${slug}`),
  ...tracks.map((slug) => `/hire/${slug}`)
];

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const siteUsername = process.env.SITE_USERNAME;
const sitePassword = process.env.SITE_PASSWORD;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

if (siteUsername && sitePassword) {
  const auth = Buffer.from(`${siteUsername}:${sitePassword}`).toString("base64");
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${auth}`
  });
}

const discoveredLinks = new Set();
const pageIssues = [];
const brokenLinks = [];
const staticAssetLinks = [];
const brokenAssetLinks = [];

function isLikelyFileLink(href) {
  return /\.(pdf|md|txt|png|jpg|jpeg|gif|webp|svg|webm|mp4)$/i.test(href);
}

for (const route of routes) {
  const errors = [];
  const badResponses = [];

  const onConsole = (msg) => {
    if (msg.type() === "error") {
      errors.push(`console:${msg.text()}`);
    }
  };

  const onPageError = (error) => {
    errors.push(`pageerror:${error.message}`);
  };

  const onResponse = (response) => {
    const status = response.status();
    const responseUrl = response.url();
    if (status >= 400 && responseUrl.startsWith(baseUrl)) {
      badResponses.push(`${status} ${responseUrl.replace(baseUrl, "")}`);
    }
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("response", onResponse);

  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  const status = response?.status() ?? 0;

  if (status >= 400 || errors.length > 0 || badResponses.length > 0) {
    pageIssues.push({ route, status, errors, badResponses });
  }

  const hrefs = await page.$$eval("a[href]", (anchors) =>
    anchors
      .map((anchor) => anchor.getAttribute("href"))
      .filter((href) => typeof href === "string" && href.length > 0)
  );

  for (const href of hrefs) {
    if (href.startsWith("/")) {
      discoveredLinks.add(href.split("#")[0]);
    }

    if (href.startsWith(baseUrl)) {
      discoveredLinks.add(href.replace(baseUrl, "").split("#")[0]);
    }
  }

  page.off("console", onConsole);
  page.off("pageerror", onPageError);
  page.off("response", onResponse);
}

for (const href of [...discoveredLinks].filter(Boolean).sort()) {
  if (isLikelyFileLink(href)) {
    staticAssetLinks.push(href);
    continue;
  }

  try {
    const response = await page.goto(`${baseUrl}${href}`, { waitUntil: "domcontentloaded" });
    const status = response?.status() ?? 0;
    if (status >= 400) {
      brokenLinks.push({ href, status });
    }
  } catch (error) {
    brokenLinks.push({
      href,
      status: 0,
      error: error instanceof Error ? error.message : "Unknown link navigation error"
    });
  }
}

for (const href of staticAssetLinks) {
  try {
    const response = await page.goto(`${baseUrl}${href}`, { waitUntil: "domcontentloaded" });
    const status = response?.status() ?? 0;
    if (status >= 400) {
      brokenAssetLinks.push({ href, status });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown asset navigation error";
    if (message.includes("Download is starting")) {
      continue;
    }

    brokenAssetLinks.push({
      href,
      status: 0,
      error: message
    });
  }
}

await browser.close();

const report = {
  auditedRoutes: routes.length,
  discoveredInternalLinks: [...discoveredLinks].filter(Boolean).length,
  staticAssetLinks,
  pageIssues,
  brokenLinks,
  brokenAssetLinks
};

console.log(JSON.stringify(report, null, 2));
