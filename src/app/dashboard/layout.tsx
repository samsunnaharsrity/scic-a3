import { DashboardSidebar } from "../components/dashboardData/dashboardSlidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    role: "admin",
    name: "",
    email: "",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar user={user} />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}