import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateLimitResult = {
  success: boolean;
  reason?: "misconfigured" | "blocked";
  resetAt?: number;
  remaining?: number;
  limit?: number;
};

let limiter: Ratelimit | null = null;
let isInitialized = false;

function getLimiter(): Ratelimit | null {
  if (isInitialized) {
    return limiter;
  }

  isInitialized = true;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    limiter = null;
    return null;
  }

  const redis = new Redis({ url: redisUrl, token: redisToken });

  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(6, "15 m"),
    prefix: "contact-form",
    analytics: true
  });

  return limiter;
}

export async function checkContactRateLimit(identifier: string): Promise<RateLimitResult> {
  const resolvedLimiter = getLimiter();

  if (!resolvedLimiter) {
    if (process.env.NODE_ENV === "production") {
      return { success: false, reason: "misconfigured" };
    }

    return { success: true };
  }

  try {
    const response = await resolvedLimiter.limit(identifier);
    return {
      success: response.success,
      reason: response.success ? undefined : "blocked",
      limit: response.limit,
      remaining: response.remaining,
      resetAt: response.reset
    };
  } catch {
    if (process.env.NODE_ENV === "production") {
      return { success: false, reason: "misconfigured" };
    }

    return { success: true };
  }
}
