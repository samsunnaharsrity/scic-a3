"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Heart, Star, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { useDashboard } from "@/app/components/dashboardData/dashboardProvider";

export default function UserDashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);


const session = useDashboard();
const user = session?.user;

useEffect(() => {
  if (!user?.email) return;

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/dashboard?email=${encodeURIComponent(
          user.email
        )}`
      );

      const data = await res.json();

      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user?.email]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  const stats = [
    { title: "Total Bookings", value: dashboardData?.totalBookings || 0, color: "bg-blue-500", icon: <CalendarDays size={28} /> },
    { title: "Saved Places", value: dashboardData?.savedPlaces || 0, color: "bg-pink-500", icon: <Heart size={28} /> },
    { title: "Reviews", value: dashboardData?.totalReviews || 0, color: "bg-yellow-500", icon: <Star size={28} /> },
    { title: "Visited", value: dashboardData?.totalVisited || 0, color: "bg-emerald-500", icon: <MapPin size={28} /> },
  ];

  return (
    <div className="space-y-8 mt-20">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#16352E] to-[#2a7b62] p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">Welcome Back, {dashboardData?.userName || "Traveler"} 👋</h1>
        <p className="mt-3 text-white/80">Manage your trips and explore new destinations with ease.</p>
        <Link href="/components/explore" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#16352E] hover:scale-105 transition">
          Explore Places <ArrowRight size={18} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, idx) => (
          <div key={idx} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-white ${item.color}`}>
              {item.icon}
            </div>
            <h3 className="text-3xl font-bold">{item.value}</h3>
            <p className="text-gray-500">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity (Dynamic Mapping) */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
        <div className="space-y-4">
          {dashboardData?.recentActivity?.length > 0 ? (
            dashboardData.recentActivity.map((activity: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50 transition">
                <div>
                  <h4 className="font-semibold">{activity.title}</h4>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                  activity.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
}