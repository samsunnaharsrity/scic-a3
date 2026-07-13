"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star, Trash2, BookmarkX } from "lucide-react";
import { authClient } from "@/lib/auth-client";


interface WishlistItem {
  _id: string;
  placeId: string;
  placeName: string;
  imageUrl: string;
  price?: number;
  location?: string;
  rating?: number;
  savedAt: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const fetchWishlist = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/user/${user.email}`);
      const data = await res.json();
      if (data.success) {
        setWishlist(data.savedItems || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchWishlist();
    }
  }, [user?.email]);

  const handleRemove = async (placeId: string) => {
    if (!user?.email) return;
    setRemovingId(placeId);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId, userEmail: user.email }),
      });
      const data = await res.json();
      if (data.success && !data.isSaved) {

        setTimeout(() => {
          setWishlist((prev) => prev.filter((item) => item.placeId !== placeId));
          setRemovingId(null);
        }, 300);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      setRemovingId(null);
    }
  };

  if (isPending || (user && loading)) {
    return (
      <div className="mx-auto mt-24 max-w-6xl px-4 py-8 sm:px-6">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-xl mb-8" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-xl overflow-hidden h-[400px] bg-white p-5 space-y-4">
              <div className="w-full h-56 bg-gray-200 animate-pulse rounded-xl" />
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
              <div className="h-10 bg-gray-200 animate-pulse rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[75vh] flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50/50">
        <div className="p-4 rounded-3xl bg-red-50 text-red-500 mb-5 shadow-sm border border-red-100 animate-bounce">
          <Heart size={40} className="fill-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Access Denied</h2>
        <p className="mt-2 text-gray-500 text-sm max-w-xs text-center leading-relaxed">
          Please log in to your account to view your personalized wishlist.
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
    <div className="space-y-8 mt-20 max-w-6xl mx-auto px-4 py-8 sm:px-6 min-h-[70vh]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="mt-2 text-gray-500">Your favorite stays are saved here.</p>
      </div>

      {/* Summary Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Saved Stays</p>
            <h2 className="mt-2 text-3xl font-bold">{wishlist.length}</h2>
          </div>
          <Heart className="h-10 w-10 fill-red-500 text-red-500" />
        </div>
      </div>

      {/* Wishlist Grid */}
      {wishlist.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((stay) => (
            <div
              key={stay._id}
              className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                removingId === stay.placeId ? "opacity-0 scale-95 duration-300" : "opacity-100 scale-100"
              }`}
            >
              <div className="relative h-56 w-full bg-gray-50">
                <Image
                  src={stay.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"}
                  alt={stay.placeName}
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
              </div>

              <div className="space-y-4 p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">{stay.placeName}</h2>

                  <div className="mt-2 flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin size={16} />
                    <span>{stay.location || "Location not available"}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{stay.rating || "4.5"}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold text-gray-900">
                      ${stay.price || "100"}
                      <span className="text-sm font-normal text-gray-500"> / night</span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/exploreDetailes/${stay.placeId}`}
                      className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-center font-medium text-white transition hover:bg-black text-sm flex items-center justify-center"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleRemove(stay.placeId)}
                      disabled={removingId === stay.placeId}
                      className="rounded-lg border border-red-500 p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-xl border bg-white py-20 text-center shadow-sm max-w-2xl mx-auto px-6">
          <BookmarkX size={60} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-800">Your Wishlist is Empty</h2>
          <p className="mt-2 text-gray-500 text-sm max-w-sm mx-auto">
            Save your favorite stays and they will appear here.
          </p>
          <Link
            href="/components/explore"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white hover:bg-black transition shadow-sm text-sm"
          >
            Explore Stays
          </Link>
        </div>
      )}
    </div>
  );
}