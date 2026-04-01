import { NextRequest, NextResponse } from "next/server";

const AUTH_REALM = "Private Portfolio";
const BASE_SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
};

function buildContentSecurityPolicy(pathname: string): string {
  const isAdminRoute = pathname.startsWith("/admin");
  const isDevelopment = process.env.NODE_ENV !== "production";
  const scriptSource = isDevelopment
    ? "'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://challenges.cloudflare.com"
    : "'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com";

  if (isAdminRoute) {
    return [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      `script-src ${isDevelopment ? "'self' 'unsafe-eval'" : "'self'"}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.github.com https://github.com",
      "frame-src 'none'",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests"
    ].join("; ");
  }

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    `script-src ${scriptSource}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://challenges.cloudflare.com https://api.resend.com",
    "frame-src 'self' https://calendly.com https://www.youtube.com https://player.vimeo.com https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests"
  ].join("; ");
}

function applySecurityHeaders(response: NextResponse, pathname: string) {
  for (const [name, value] of Object.entries(BASE_SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }
  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy(pathname));
}

async function sha256(value: string): Promise<Uint8Array> {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return new Uint8Array(digest);
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left[index] ^ right[index];
  }

  return mismatch === 0;
}

async function secureCompare(left: string, right: string): Promise<boolean> {
  const leftHash = await sha256(left);
  const rightHash = await sha256(right);
  return timingSafeEqual(leftHash, rightHash);
}

function unauthorizedResponse(pathname: string) {
  const response = new NextResponse("Authentication required", { status: 401 });
  response.headers.set("WWW-Authenticate", `Basic realm="${AUTH_REALM}", charset="UTF-8"`);
  response.headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate");
  applySecurityHeaders(response, pathname);
  return response;
}

function misconfiguredResponse(pathname: string) {
  const response = new NextResponse("Site protection is not configured correctly.", { status: 503 });
  response.headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate");
  applySecurityHeaders(response, pathname);
  return response;
}

function isStaticAssetPath(pathname: string): boolean {
  if (pathname.startsWith("/_next/")) {
    return true;
  }

  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/api/cms/")) {
    const openResponse = NextResponse.next();
    applySecurityHeaders(openResponse, pathname);
    return openResponse;
  }

  const expectedUsername = process.env.SITE_USERNAME;
  const expectedPassword = process.env.SITE_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    if (process.env.NODE_ENV === "production") {
      return misconfiguredResponse(pathname);
    }

    const devResponse = NextResponse.next();
    applySecurityHeaders(devResponse, pathname);
    return devResponse;
  }

  const authorization = request.headers.get("authorization");
  if (!authorization || !authorization.startsWith("Basic ")) {
    return unauthorizedResponse(pathname);
  }

  const encodedCredentials = authorization.slice("Basic ".length).trim();
  let decodedCredentials = "";

  try {
    decodedCredentials = atob(encodedCredentials);
  } catch {
    return unauthorizedResponse(pathname);
  }

  const separatorIndex = decodedCredentials.indexOf(":");
  if (separatorIndex === -1) {
    return unauthorizedResponse(pathname);
  }

  const providedUsername = decodedCredentials.slice(0, separatorIndex);
  const providedPassword = decodedCredentials.slice(separatorIndex + 1);

  const usernameMatches = await secureCompare(providedUsername, expectedUsername);
  const passwordMatches = await secureCompare(providedPassword, expectedPassword);

  if (!usernameMatches || !passwordMatches) {
    return unauthorizedResponse(pathname);
  }

  const response = NextResponse.next();
  applySecurityHeaders(response, pathname);
  if (!isStaticAssetPath(pathname)) {
    response.headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate");
  }
  return response;
}

export const config = {
  matcher: "/:path*"
};
