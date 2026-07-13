import { auth } from "@/lib/auth";
import DashboardSidebar from "../components/dashboardData/dashboardSidebar";

import { headers } from "next/headers";
import { DashboardProvider } from "../components/dashboardData/dashboardProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <DashboardProvider session={session}>
      <div className="flex min-h-screen bg-gray-50">

        <DashboardSidebar session={session} />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </DashboardProvider>
  );
}