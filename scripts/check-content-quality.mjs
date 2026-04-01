import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const rootsToScan = ["app", "components", "content", "lib", "README.md"];
const allowedExtensions = new Set([".ts", ".tsx", ".md", ".mdx"]);

const blockedPatterns = [
  { pattern: /Video Not Added Yet/i, reason: "Unfinished walkthrough placeholder copy." },
  { pattern: /Pending approval for public quote/i, reason: "Unpublished social proof placeholder copy." },
  { pattern: /Replace or refine each metric as you finalize/i, reason: "Draft outcomes placeholder copy." },
  { pattern: /TODO/i, reason: "Unresolved TODO marker." }
];

const ignorePaths = new Set(["node_modules", ".next", ".git"]);
const violations = [];

function scanPath(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return;
  }

  const stat = fs.statSync(absolutePath);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(absolutePath)) {
      if (ignorePaths.has(entry)) {
        continue;
      }
      scanPath(path.join(relativePath, entry));
    }
    return;
  }

  const extension = path.extname(relativePath);
  if (!allowedExtensions.has(extension)) {
    return;
  }

  const content = fs.readFileSync(absolutePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    for (const blocked of blockedPatterns) {
      if (blocked.pattern.test(line)) {
        violations.push({
          file: relativePath,
          line: index + 1,
          reason: blocked.reason,
          snippet: line.trim()
        });
      }
    }
  }
}

for (const root of rootsToScan) {
  scanPath(root);
}

if (violations.length > 0) {
  console.error("Content quality gate failed.");
  for (const violation of violations) {
    console.error(
      `- ${violation.file}:${violation.line} | ${violation.reason}\n  ${violation.snippet}`
    );
  }
  process.exit(1);
}

console.log("Content quality gate passed.");
