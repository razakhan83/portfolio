import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export const SESSION_COOKIE_NAME = "portfolio_admin_session";

// Secret key for JWT signing and verification using Web Crypto API compatible with Edge & Node
const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set in environment variables");
  }
  return new TextEncoder().encode(secret);
};

export interface SessionPayload {
  email: string;
  adminId?: string;
  [key: string]: unknown;
}

/**
 * Sign a 7-day session token with AUTH_SECRET
 */
export async function signSession(payload: SessionPayload): Promise<string> {
  const secretKey = getSecretKey();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verify a session token with AUTH_SECRET
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Compare plain password against bcrypt hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

/**
 * In-memory brute-force rate limiter
 * 5 failed attempts within 15 minutes blocks subsequent attempts for 15 minutes
 */
interface FailedAttempt {
  count: number;
  blockedUntil?: number;
}

const loginAttempts = new Map<string, FailedAttempt>();

export function checkRateLimit(email: string): { allowed: boolean; remainingMinutes?: number } {
  const key = email.toLowerCase().trim();
  const record = loginAttempts.get(key);

  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.blockedUntil && now < record.blockedUntil) {
    const remainingMinutes = Math.ceil((record.blockedUntil - now) / (60 * 1000));
    return { allowed: false, remainingMinutes };
  }

  // If block period expired, reset
  if (record.blockedUntil && now >= record.blockedUntil) {
    loginAttempts.delete(key);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(email: string): void {
  const key = email.toLowerCase().trim();
  const record = loginAttempts.get(key) || { count: 0 };
  record.count += 1;

  if (record.count >= 5) {
    record.blockedUntil = Date.now() + 15 * 60 * 1000; // 15 minutes block
  }

  loginAttempts.set(key, record);
}

export function clearFailedAttempts(email: string): void {
  const key = email.toLowerCase().trim();
  loginAttempts.delete(key);
}
