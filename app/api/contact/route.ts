import { NextRequest, NextResponse } from "next/server";

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_PER_WINDOW = 6;
const MIN_FORM_FILL_MS = 2500;
const MAX_MESSAGE_LENGTH = 4000;

type RateEntry = {
  count: number;
  resetAt: number;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
  turnstileToken?: unknown;
};

declare global {
  var __contactRateStore: Map<string, RateEntry> | undefined;
}

const rateStore = globalThis.__contactRateStore ?? new Map<string, RateEntry>();
if (!globalThis.__contactRateStore) {
  globalThis.__contactRateStore = rateStore;
}

function json(data: Record<string, unknown>, status = 200): NextResponse {
  const response = NextResponse.json(data, { status });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

function getAllowedOrigins(): Set<string> {
  const configured = process.env.CONTACT_ALLOWED_ORIGINS;
  if (!configured) {
    return new Set(["https://mikeyerke.com", "https://www.mikeyerke.com", "http://localhost:3000"]);
  }

  return new Set(
    configured
      .split(",")
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0)
  );
}

function isAllowedRequestOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  if (origin === request.nextUrl.origin) {
    return true;
  }

  return getAllowedOrigins().has(origin);
}

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  return realIp ? realIp.trim() : "unknown";
}

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(clientIp);

  if (!entry || entry.resetAt <= now) {
    rateStore.set(clientIp, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  rateStore.set(clientIp, entry);
  return false;
}

async function verifyTurnstileToken(token: string, clientIp: string): Promise<boolean> {
  const secret = process.env.CONTACT_TURNSTILE_SECRET;
  if (!secret || !token) {
    return true;
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  body.set("remoteip", clientIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body
  });

  if (!response.ok) {
    return false;
  }

  const payload = (await response.json()) as { success?: boolean };
  return payload.success === true;
}

async function deliverViaWebhook(payload: {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      source: "mikeyerke.com/contact",
      submittedAt: new Date().toISOString(),
      ...payload
    })
  });

  if (!response.ok) {
    throw new Error("Webhook delivery failed.");
  }

  return true;
}

async function deliverViaResend(payload: {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New contact request from ${payload.name}`,
      reply_to: payload.email,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || "Not provided"}`,
        `Role: ${payload.role || "Not provided"}`,
        "",
        "Message:",
        payload.message
      ].join("\n")
    })
  });

  if (!response.ok) {
    throw new Error("Email delivery failed.");
  }

  return true;
}

export async function POST(request: NextRequest) {
  if (!isAllowedRequestOrigin(request)) {
    return json({ error: "Origin not allowed." }, 403);
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return json({ error: "Too many requests. Please try again soon." }, 429);
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const name = asText(body.name);
  const email = asText(body.email).toLowerCase();
  const company = asText(body.company);
  const role = asText(body.role);
  const message = asText(body.message);
  const website = asText(body.website);
  const startedAtRaw = asText(body.startedAt);
  const turnstileToken = asText(body.turnstileToken);

  if (website) {
    return json({ success: true });
  }

  const startedAt = Number.parseInt(startedAtRaw, 10);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_FILL_MS) {
    return json({ error: "Submission blocked. Please try again." }, 400);
  }

  if (!name || name.length > 80) {
    return json({ error: "Please enter your name." }, 400);
  }

  if (!email || email.length > 120 || !isEmailValid(email)) {
    return json({ error: "Please enter a valid email." }, 400);
  }

  if (!message || message.length < 20 || message.length > MAX_MESSAGE_LENGTH) {
    return json({ error: "Message must be between 20 and 4000 characters." }, 400);
  }

  if (!(await verifyTurnstileToken(turnstileToken, clientIp))) {
    return json({ error: "Captcha verification failed." }, 400);
  }

  try {
    const viaWebhook = await deliverViaWebhook({ name, email, company, role, message });
    const viaResend = await deliverViaResend({ name, email, company, role, message });

    if (!viaWebhook && !viaResend) {
      return json({ error: "Contact delivery is not configured yet." }, 503);
    }
  } catch {
    return json({ error: "Message delivery failed. Please email me directly." }, 502);
  }

  return json({ success: true });
}
