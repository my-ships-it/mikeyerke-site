import { NextRequest, NextResponse } from "next/server";

const AUTH_REALM = "Private Portfolio";
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Cache-Control": "no-store"
};

function applySecurityHeaders(response: NextResponse) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }
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

function unauthorizedResponse() {
  const response = new NextResponse("Authentication required", { status: 401 });
  response.headers.set("WWW-Authenticate", `Basic realm="${AUTH_REALM}", charset="UTF-8"`);
  applySecurityHeaders(response);
  return response;
}

function misconfiguredResponse() {
  const response = new NextResponse("Site protection is not configured correctly.", { status: 503 });
  applySecurityHeaders(response);
  return response;
}

export async function middleware(request: NextRequest) {
  const expectedUsername = process.env.SITE_USERNAME;
  const expectedPassword = process.env.SITE_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    if (process.env.NODE_ENV === "production") {
      return misconfiguredResponse();
    }

    const devResponse = NextResponse.next();
    applySecurityHeaders(devResponse);
    return devResponse;
  }

  const authorization = request.headers.get("authorization");
  if (!authorization || !authorization.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encodedCredentials = authorization.slice("Basic ".length).trim();
  let decodedCredentials = "";

  try {
    decodedCredentials = atob(encodedCredentials);
  } catch {
    return unauthorizedResponse();
  }

  const separatorIndex = decodedCredentials.indexOf(":");
  if (separatorIndex === -1) {
    return unauthorizedResponse();
  }

  const providedUsername = decodedCredentials.slice(0, separatorIndex);
  const providedPassword = decodedCredentials.slice(separatorIndex + 1);

  const usernameMatches = await secureCompare(providedUsername, expectedUsername);
  const passwordMatches = await secureCompare(providedPassword, expectedPassword);

  if (!usernameMatches || !passwordMatches) {
    return unauthorizedResponse();
  }

  const response = NextResponse.next();
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: "/:path*"
};
