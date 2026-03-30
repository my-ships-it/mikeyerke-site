import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "cms_oauth_state";
export const runtime = "nodejs";

function getBaseUrl(request: NextRequest): string {
  if (process.env.CMS_BASE_URL) {
    return process.env.CMS_BASE_URL.replace(/\/$/, "");
  }

  return `${request.nextUrl.protocol}//${request.nextUrl.host}`;
}

function htmlResponse(html: string, status = 200): NextResponse {
  return new NextResponse(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function errorHtml(message: string): string {
  return `<!doctype html><html><body><p>${message}</p><script>window.close();</script></body></html>`;
}

function successHtml(token: string): string {
  const payload = JSON.stringify({ token, provider: "github" });
  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        if (!window.opener) {
          window.close();
          return;
        }

        const content = ${payload};
        function sendAuthResult(targetOrigin) {
          window.opener.postMessage(
            "authorization:github:success:" + JSON.stringify(content),
            targetOrigin
          );
        }

        function receiveMessage(event) {
          sendAuthResult(event.origin);
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }

        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");

        setTimeout(function () {
          window.close();
        }, 2000);
      })();
    </script>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.CMS_GITHUB_CLIENT_ID;
  const clientSecret = process.env.CMS_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return htmlResponse(errorHtml("CMS OAuth is not configured correctly."), 500);
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const oauthError = request.nextUrl.searchParams.get("error");

  if (oauthError) {
    return htmlResponse(errorHtml(`GitHub OAuth error: ${oauthError}`), 400);
  }

  if (!code || !state) {
    return htmlResponse(errorHtml("Missing OAuth code or state."), 400);
  }

  const storedState = request.cookies.get(STATE_COOKIE)?.value;
  if (!storedState || storedState !== state) {
    return htmlResponse(errorHtml("OAuth state check failed."), 403);
  }

  const redirectUri = `${getBaseUrl(request)}/api/cms/callback`;
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      state,
      redirect_uri: redirectUri
    }),
    cache: "no-store"
  });

  if (!tokenResponse.ok) {
    return htmlResponse(errorHtml("Unable to exchange OAuth code for token."), 502);
  }

  const tokenPayload = (await tokenResponse.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!tokenPayload.access_token) {
    const message = tokenPayload.error_description ?? tokenPayload.error ?? "Token exchange failed.";
    return htmlResponse(errorHtml(message), 401);
  }

  const response = htmlResponse(successHtml(tokenPayload.access_token), 200);
  response.cookies.set({
    name: STATE_COOKIE,
    value: "",
    maxAge: 0,
    path: "/api/cms"
  });
  return response;
}
