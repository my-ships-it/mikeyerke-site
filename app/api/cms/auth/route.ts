import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "cms_oauth_state";

function getBaseUrl(request: NextRequest): string {
  if (process.env.CMS_BASE_URL) {
    return process.env.CMS_BASE_URL.replace(/\/$/, "");
  }

  return `${request.nextUrl.protocol}//${request.nextUrl.host}`;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.CMS_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("CMS OAuth is not configured. Missing CMS_GITHUB_CLIENT_ID.", {
      status: 500
    });
  }

  const state = randomUUID();
  const baseUrl = getBaseUrl(request);
  const redirectUri = `${baseUrl}/api/cms/callback`;

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("allow_signup", "false");

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set({
    name: STATE_COOKIE,
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/cms",
    maxAge: 60 * 10
  });

  return response;
}
