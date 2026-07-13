"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarCheck, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client"; 

interface BookNowButtonProps {
  placeId: string;
  placeName: string;
  image: string;
  price: number;
  location: string;
}


export default function BookNowButton({
  placeId,
  placeName,
  image,
  price,
  location,
}: BookNowButtonProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const handleBookNow = async () => {
    console.log("Booking Details:", { placeName, location, date });

    if (!user?.email) {
      toast.error("Please log in to book this place.");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            placeId,
            placeName,
            image,
            location, 
            date,
            price,
          }),
        }
      );

      const data = await res.json();
      console.log("API Response Data:", data);

      if (data.success) {
        toast.success("Booking successful!");
        setDate("");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error details:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium uppercase text-gray-400">
        Select Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        className="w-full rounded-lg border p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-900"
      />

      <button
        onClick={handleBookNow}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-950 px-6 py-3 text-white text-sm font-semibold disabled:opacity-50 transition active:scale-95 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Booking...
          </>
        ) : (
          <>
            <CalendarCheck size={18} />
            Book Now
          </>
        )}
      </button>
    </div>
  );
}