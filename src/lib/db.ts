import * as dns from "node:dns";
import mongoose from "mongoose";

// Set reliable DNS servers for Node SRV record resolution
try {
  const setServers =
    dns.setServers ?? (dns as unknown as { default?: { setServers?: typeof dns.setServers } }).default?.setServers;
  if (typeof setServers === "function") {
    setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch {
  // Ignore if not supported in environment
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  uri?: string;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
  uri: undefined,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // If URI changed or connection was closed, reset cache
  if (cached.uri !== uri || (cached.conn && cached.conn.connection.readyState === 0)) {
    if (cached.conn) {
      await cached.conn.disconnect().catch(() => {});
    }
    cached.conn = null;
    cached.promise = null;
    cached.uri = uri;
  }

  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.uri = uri;
    try {
      const setServers =
        dns.setServers ?? (dns as unknown as { default?: { setServers?: typeof dns.setServers } }).default?.setServers;
      if (typeof setServers === "function") {
        setServers(["8.8.8.8", "1.1.1.1"]);
      }
    } catch {
      // Ignore
    }

    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    cached.conn = null;
    const isSrvError =
      error instanceof Error &&
      (error.message.includes("querySrv") ||
        ("code" in error && (error as { code?: string }).code === "ECONNREFUSED"));
    if (isSrvError) {
      try {
        const setServers =
          dns.setServers ?? (dns as unknown as { default?: { setServers?: typeof dns.setServers } }).default?.setServers;
        if (typeof setServers === "function") {
          setServers(["8.8.8.8", "1.1.1.1"]);
        }
      } catch {}
      cached.promise = mongoose.connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      });
      cached.conn = await cached.promise;
      return cached.conn;
    }
    throw error;
  }

  return cached.conn;
}

export default connectDB;
