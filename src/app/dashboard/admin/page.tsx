"use client";

import { useEffect, useState } from "react";
import { Users, Hotel, CalendarDays, DollarSign, Star, Loader2, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={48} />
    </div>
  );

  return (
    <div className="p-8 mt-10 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Control Center</h1>
          <p className="mt-2 max-w-xl text-sm text-gray-600">
            Monitor bookings, users, properties, and platform performance from one centralized dashboard with real-time insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border shadow-sm text-sm font-semibold text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Operational
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Earnings" value={`$${data.totalRevenue}`} icon={DollarSign} change="+12.5%" color="bg-orange-500" />
        <StatCard title="Total Bookings" value={data.totalBookings} icon={CalendarDays} change="+8.2%" color="bg-blue-500" />
        <StatCard title="Total Users" value={data.totalUsers} icon={Users} change="+4.3%" color="bg-purple-500" />
        <StatCard title="Active Stays" value={data.totalStays} icon={Hotel} change="0%" color="bg-emerald-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Bookings</h2>
          <div className="space-y-4">
            {data.recentBookings.map((b: any) => (
              <div key={b._id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                    {(b?.email?.charAt(0) || "U").toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{b?.placeName || "Unknown User"}</p>
                    <p className="text-xs text-gray-500">{b?.location || "No location"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${b?.price || 0}</p>
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                    {b?.status || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Health */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Platform Health</h2>
          <div className="space-y-6">
            <HealthItem label="Average Rating" value={data.averageRating} icon={Star} color="text-amber-500" />
            <HealthItem label="API Latency" value={data.apiLatency} icon={Activity} color="text-indigo-500" />
            <HealthItem label="Monthly Growth" value="+24%" icon={TrendingUp} color="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, change, color }: any) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white mb-4`}>
        <Icon size={24} />
      </div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <div className="flex items-end justify-between mt-1">
        <h3 className="text-2xl font-black text-gray-900">{value}</h3>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{change}</span>
      </div>
    </div>
  );
}

function HealthItem({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
      <div className="flex items-center gap-3">
        <Icon size={20} className={color} />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}