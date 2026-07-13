"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session || !session.user) {
      router.replace("/login");
      return;
    }


    const rawRole = (session.user as any).role || "user";
    const userRole = String(rawRole).toLowerCase().trim();

    if (userRole === "admin") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/user");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      Redirecting to your workspace...
    </div>
  );
}