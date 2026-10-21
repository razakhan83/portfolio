import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth";
import AdminNavContent from "./AdminNavContent";
import AdminHeader from "./AdminHeader";

export const metadata = {
  title: "Admin Panel · Ahmed Raza",
  robots: {
    index: false,
    follow: false,
  },
};

async function AdminHeaderSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminHeader email={session.email} />;
}

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans text-foreground">
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-surface shrink-0 h-screen sticky top-0 z-30">
        <AdminNavContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Suspense
          fallback={
            <header className="h-16 border-b border-border bg-surface/90 px-4 sm:px-6 flex items-center justify-between animate-pulse">
              <div className="h-6 w-32 bg-border/40 rounded" />
              <div className="h-8 w-36 bg-border/40 rounded-full" />
            </header>
          }
        >
          <AdminHeaderSession />
        </Suspense>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
