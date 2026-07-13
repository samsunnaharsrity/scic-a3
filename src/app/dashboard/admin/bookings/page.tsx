"use client";

import { useDashboard } from "@/app/components/dashboardData/dashboardProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, X } from "lucide-react";

interface Booking {
  _id: string;
  placeName: string;
  image: string;
  date: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
}

export default function BookingsPage() {
  const session = useDashboard();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const email = encodeURIComponent(user.email);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?email=${email}`
        );
        const data = await res.json();

        if (data.success) {
          setBookings(data.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email]);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setCancellingId(id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/cancel`,
        { method: "PATCH" }
      );
      const data = await res.json();

      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id ? { ...b, status: "cancelled" } : b
          )
        );
      } else {
        alert(data.message || "Cancel failed");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setCancellingId(null);
    }
  };

  const statusStyles: Record<Booking["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (loading) {
    return (
      <div className="mt-20 flex justify-center">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="mt-20 flex flex-col items-center gap-3">
        <p className="text-lg text-gray-500">No bookings found yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="overflow-hidden rounded-xl border bg-white shadow"
        >
          <div className="relative h-40 w-full">
            <Image
              src={booking.image}
              alt={booking.placeName}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold">{booking.placeName}</h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[booking.status]}`}
              >
                {booking.status}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              {booking.date}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              Price: ${booking.price}
            </div>

            {booking.status !== "cancelled" && (
              <button
                onClick={() => handleCancel(booking._id)}
                disabled={cancellingId === booking._id}
                className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
              >
                <X size={14} />
                {cancellingId === booking._id ? "Cancelling..." : "Cancel Booking"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}