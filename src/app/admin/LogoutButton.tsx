"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="outline"
      className="border-primary text-primary hover:bg-primary hover:text-[#FFFEF7] font-semibold text-sm px-6 py-2.5 min-h-[44px] rounded-lg transition-all cursor-pointer"
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
