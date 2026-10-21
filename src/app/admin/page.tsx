import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "Admin Dashboard · Ahmed Raza",
  robots: {
    index: false,
    follow: false,
  },
};

async function AdminContent() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
        ✓
      </div>
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-deep mb-2">
        Admin Dashboard
      </h1>
      <p className="text-muted text-base mb-8">
        Logged in as{" "}
        <span className="font-semibold text-deep block sm:inline mt-1 sm:mt-0">
          {session.email}
        </span>
      </p>
      <LogoutButton />
    </div>
  );
}

export default function AdminHomePage() {
  return (
    <div className="w-full bg-background py-16 sm:py-24 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        <Suspense
          fallback={
            <div className="bg-surface border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center animate-pulse">
              <div className="w-12 h-12 rounded-full bg-border/40 mb-4" />
              <div className="h-6 w-48 bg-border/40 rounded mb-2" />
              <div className="h-4 w-32 bg-border/40 rounded mb-8" />
              <div className="h-10 w-24 bg-border/40 rounded" />
            </div>
          }
        >
          <AdminContent />
        </Suspense>
      </div>
    </div>
  );
}
