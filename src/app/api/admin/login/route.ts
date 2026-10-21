import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Admin } from "@/models";
import {
  signSession,
  verifyPassword,
  checkRateLimit,
  recordFailedAttempt,
  clearFailedAttempts,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { email, password } = body;
    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check brute-force rate limit guard
    const rateLimit = checkRateLimit(cleanEmail);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please try again in ${rateLimit.remainingMinutes || 15} minutes.`,
        },
        { status: 429 }
      );
    }

    // 2. Connect to database and look up admin
    await connectDB();
    const admin = await Admin.findOne({ email: cleanEmail });

    if (!admin) {
      recordFailedAttempt(cleanEmail);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Verify bcrypt password hash
    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      recordFailedAttempt(cleanEmail);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Clear any failed attempts upon successful login
    clearFailedAttempts(cleanEmail);

    // 5. Sign 7-day JWT session token
    const token = await signSession({
      email: admin.email,
      adminId: String(admin._id),
    });

    const response = NextResponse.json({
      success: true,
      email: admin.email,
    });

    // 6. Set httpOnly session cookie (7 days, sameSite: lax, secure in production)
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
