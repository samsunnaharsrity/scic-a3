"use client";

import { useDashboard } from "@/app/components/dashboardData/dashboardProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, X, Loader2, AlertCircle, MapPin } from "lucide-react";
import toast from "react-hot-toast";

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`);
        const data = await res.json();
        if (data.success) setBookings(data.data);
        toast.success("Bookings loaded");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setCancellingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/cancel`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: "cancelled" } : b));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCancellingId(null);
    }
  };



  const updateStatus = async (
  id: string,
  status: "confirmed" | "cancelled"
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

if (data.success) {
  setBookings((prev) =>
    prev.map((booking) =>
      booking._id === id
        ? {
            ...booking,
            status,
          }
        : booking
    )
  );

if (status === "confirmed") {
  toast.success("Booking confirmed successfully!");
} else {
  toast.error("Booking cancelled successfully!");
}
} else {
  toast.error(data.message || "Failed to update booking");
}
  } catch (err) {
  console.error(err);
  toast.error("Something went wrong!");
}
};

  const statusStyles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  };

  if (loading) return <div className="mt-20 flex justify-center"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;

  return (
    <div className="container mx-auto px-4 py-22">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-gray-50">
          <AlertCircle className="text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 font-medium">No bookings found yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={
                    booking.image?.trim()
                      ? booking.image
                      : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80"
                  }
                  alt={booking.placeName || "Booking Image"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[booking.status]}`}>
                  {booking.status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{booking.placeName}</h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-2 gap-2">
                  <Calendar size={16} /> {new Date(booking.date).toLocaleDateString()}
                </div>
                
                <div className="text-lg font-bold text-indigo-600 mb-5">$ {booking.price}</div>

<div className="mt-5 flex gap-3">
  {booking.status !== "confirmed" && (
    <button
      onClick={() => updateStatus(booking._id, "confirmed")}
      className="flex-1 rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
    >
      Confirm
    </button>
  )}

  {booking.status !== "cancelled" && (
    <button
      onClick={() => updateStatus(booking._id, "cancelled")}
      className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
    >
      Cancel
    </button>
  )}
</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}