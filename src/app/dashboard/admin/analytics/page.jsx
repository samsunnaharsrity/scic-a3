"use client";

import {
  Users,
  Hotel,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Stays",
      value: "186",
      icon: Hotel,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Bookings",
      value: "3,492",
      icon: CalendarCheck,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Revenue",
      value: "$42,850",
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Overview of your StayNest platform performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-600" />
            <h2 className="text-xl font-semibold">
              Monthly Performance
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
            ].map((month, index) => (
              <div
                key={month}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-neutral-800"
              >
                <span>{month}</span>

                <span className="font-semibold text-green-600">
                  +{(index + 1) * 12}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-6 flex items-center gap-2">
            <Activity className="text-indigo-600" />
            <h2 className="text-xl font-semibold">
              Popular Categories
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Luxury Hotel",
                bookings: 540,
              },
              {
                name: "Resort",
                bookings: 420,
              },
              {
                name: "Apartment",
                bookings: 380,
              },
              {
                name: "Villa",
                bookings: 250,
              },
            ].map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-neutral-800"
              >
                <span>{category.name}</span>

                <span className="font-semibold">
                  {category.bookings}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placeholder Chart */}
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-neutral-700 dark:bg-neutral-900">
        <h3 className="text-lg font-semibold">
          Revenue Chart
        </h3>

        <p className="mt-2 text-gray-500">
          Connect Recharts or Chart.js to display real analytics.
        </p>

        <div className="mt-8 flex h-64 items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-800">
          <span className="text-gray-400">
            Chart Placeholder
          </span>
        </div>
      </div>
    </div>
  );
}