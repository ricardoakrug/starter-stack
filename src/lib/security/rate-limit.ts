import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

const defaultConfig: RateLimitConfig = {
  limit: 100, // requests
  windowMs: 60 * 1000, // 1 minute
};

const store = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(config: Partial<RateLimitConfig> = {}) {
  const { limit, windowMs } = { ...defaultConfig, ...config };
  return async function rateLimitMiddleware(request: NextRequest) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1';
    const now = Date.now();

    const record = store.get(ip);
    if (!record) {
      store.set(ip, { count: 1, resetTime: now + windowMs });
      return NextResponse.next();
    }

    if (now > record.resetTime) {
      store.set(ip, { count: 1, resetTime: now + windowMs });
      return NextResponse.next();
    }

    if (record.count >= limit) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    record.count += 1;
    return NextResponse.next();
  };
}
