"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, CreditCard, Eye, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";


interface Booking {
  _id: string; 
  placeId: string;
  placeName: string;
  location?: string;
  checkIn?: string; 
  date?: string;    
  checkOut?: string;
  guests?: number;
  price: number;
  total?: number;
  status: "Confirmed" | "Pending" | "Cancelled" | "pending" | "cancelled";
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const fetchBookings = useCallback(async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings?email=${user.email}`);
      const data = await res.json();
      

      if (data.success) {
        setBookings(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email, fetchBookings]);

  if (isPending || (user && loading)) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[75vh] flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50/50">
        <div className="p-4 rounded-3xl bg-amber-50 text-amber-500 mb-5 border border-amber-100 animate-bounce">
          <CalendarDays size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Access Denied</h2>
        <p className="mt-2 text-gray-500 text-sm max-w-xs text-center leading-relaxed">
          Please log in to your account to view your stay bookings.
        </p>
        <Link 
          href="/signin" 
          className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-2xl text-sm font-semibold hover:bg-black transition-all shadow-md active:scale-95"
        >
          Login to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-20 max-w-6xl mx-auto px-4 sm:px-6 min-h-[70vh]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-2 text-gray-500">
          View and manage all of your stay bookings.
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-xl border bg-white p-6 shadow-sm max-w-xs">
        <h2 className="text-sm text-gray-500 font-medium">Total Bookings</h2>
        <p className="mt-2 text-3xl font-bold text-gray-900">{bookings.length}</p>
      </div>

      {/* Booking List Conditional Rendering */}
      {bookings.length > 0 ? (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {booking.placeName || "Unknown Destination"}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} />
                    {booking.location || (
                        booking.placeName?.toLowerCase().includes("mahasthangarh") 
                        ? "Bogura, Bangladesh" 
                        : booking.placeName?.toLowerCase().includes("himchari")
                        ? "Cox's Bazar, Bangladesh"
                        : "Bangladesh" 
                    )}
                    </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <CalendarDays size={16} />
                    {booking.date || `${booking.checkIn} - ${booking.checkOut}`}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <CreditCard size={16} />
                    ${booking.price || booking.total}
                  </div>

                  {booking.guests && (
                    <p className="text-sm text-gray-600 font-medium">
                      Guests: {booking.guests}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wider text-xs ${
                      booking.status.toLowerCase() === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                  <Link
                    href={`/exploreDetailes/${booking.placeId}`}
                    className="flex items-center gap-2 rounded-lg bg-gray-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-black transition shadow-sm active:scale-95"
                  >
                    <Eye size={18} />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-white py-20 text-center shadow-sm max-w-2xl mx-auto">
          <CalendarDays
            size={60}
            className="mx-auto mb-4 text-gray-300"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            No Bookings Yet
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-xs mx-auto">
            You haven't booked any stays yet. Explore our awesome destinations.
          </p>
          <Link
            href="/components/explore"
            className="mt-6 inline-block rounded-lg bg-gray-900 text-white px-6 py-3 text-sm font-semibold hover:bg-black transition shadow-md"
          >
            Explore Stays
          </Link>
        </div>
      )}
    </div>
  );
}