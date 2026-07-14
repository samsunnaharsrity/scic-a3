"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Hotel,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Activity,
  Loader2,
} from "lucide-react";

interface MonthlyGrowth {
  month: string;
  percentage: number;
}

interface Category {
  name: string;
  bookings: number;
}

interface AnalyticsData {
  totalUsers: number;
  totalStays: number;
  totalBookings: number;
  totalRevenue: number;
  monthlyGrowth: MonthlyGrowth[];
  categories: Category[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalStays: 0,
    totalBookings: 0,
    totalRevenue: 0,
    monthlyGrowth: [],
    categories: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await res.json();


        if (data.success) {
          setAnalytics(data.data);
        } else {
          setAnalytics(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Stays",
      value: analytics.totalStays,
      icon: Hotel,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Bookings",
      value: analytics.totalBookings,
      icon: CalendarCheck,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Revenue",
      value: `$${analytics.totalRevenue}`,
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-8 p-6 mt-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="mt-1 text-gray-500">
          Overview of your platform performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
              >
                <item.icon size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Growth */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="text-green-600" />
            <h2 className="text-xl font-semibold">
              Monthly Performance
            </h2>
          </div>

          {analytics.monthlyGrowth.length > 0 ? (
            <div className="space-y-3">
              {analytics.monthlyGrowth.map((item) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                >
                  <span>{item.month}</span>
                  <span className="font-semibold text-green-600">
                    +{item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No data available.</p>
          )}
        </div>

        {/* Categories */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Activity className="text-indigo-600" />
            <h2 className="text-xl font-semibold">
              Popular Categories
            </h2>
          </div>

          {analytics.categories.length > 0 ? (
            <div className="space-y-3">
              {analytics.categories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                >
                  <span>{cat.name}</span>
                  <span className="font-semibold">
                    {cat.bookings} Bookings
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}