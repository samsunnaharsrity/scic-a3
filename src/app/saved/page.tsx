"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Trash2, FolderHeart, ArrowRight, Calendar, BookmarkX } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface SavedItem {
  _id: string;
  placeId: string;
  placeName: string;
  imageUrl: string;
  price?: number;
  location?: string;
  rating?: number;
  savedAt: string;
}

export default function SavedFolderPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const fetchSavedItems = useCallback(async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/user/${user.email}`);
      const data = await res.json();
      if (data.success) {
        setSavedItems(data.savedItems || []);
      }
    } catch (error) {
      console.error("Error fetching saved items:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      fetchSavedItems();
    }
  }, [user?.email, fetchSavedItems]);

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
          setSavedItems((prev) => prev.filter((item) => item.placeId !== placeId));
          setRemovingId(null);
        }, 300);
      } else {
        setRemovingId(null);
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-2xl overflow-hidden h-[320px] bg-white flex flex-col justify-between p-4 space-y-4">
              <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-xl" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
              <div className="h-10 bg-gray-200 animate-pulse rounded-xl w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[75vh] flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50/50">
        <div className="p-4 rounded-3xl bg-amber-50 text-amber-500 mb-5 shadow-sm border border-amber-100 animate-bounce">
          <FolderHeart size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Access Denied</h2>
        <p className="mt-2 text-gray-500 text-sm max-w-xs text-center leading-relaxed">
          Please log in to your account to manage your personalized saved collections.
        </p>
        <Link 
          href="/signin" 
          className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-2xl text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Login to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 max-w-6xl px-4 py-8 sm:px-6 lg:py-12 min-h-[70vh]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b pb-6 border-gray-100">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-500 border border-amber-100/60">
            <FolderHeart size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Saved Collection</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage your favorite bookmarked locations</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full w-fit self-start sm:self-auto">
          Total: {savedItems.length} Items
        </span>
      </div>

      {savedItems.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50 max-w-2xl mx-auto px-6">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
            <BookmarkX size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Your collection is empty</h3>
          <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto leading-relaxed">
            Explore the world's finest spots and save them here for quick access later.
          </p>
          <Link 
            href="/components/explore" 
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold bg-white border text-gray-800 px-5 py-2.5 rounded-xl hover:bg-gray-50 shadow-sm transition"
          >
            Explore Now <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {savedItems.map((item) => (
            <div 
              key={item._id} 
              className={`group relative border border-gray-100 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                removingId === item.placeId ? "opacity-0 scale-95 duration-300" : "opacity-100 scale-100"
              }`}
            >
              <div>
                <div className="aspect-[4/3] w-full bg-gray-50 overflow-hidden relative">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"}
                    alt={item.placeName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <button
                    onClick={() => handleRemove(item.placeId)}
                    disabled={removingId === item.placeId}
                    className="absolute top-3 right-3 bg-white/70 hover:bg-red-50 text-gray-600 hover:text-red-500 p-2 rounded-xl backdrop-blur-md border border-white/40 shadow-sm transition-all duration-200 active:scale-90 z-10 disabled:opacity-50"
                    title="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-base line-clamp-1 group-hover:text-amber-600 transition duration-200">
                    {item.placeName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-400 mt-2 text-xs">
                    <Calendar size={13} />
                    <span>
                      Saved: {new Date(item.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                {/* 🛠️ এখানে ডাইনামিক রাউট পাথটি সংশোধন করা হয়েছে */}
                <Link
                  href={`/explore/${item.placeId}`} 
                  className="w-full text-center flex items-center justify-center gap-1.5 bg-gray-50 group-hover:bg-gray-900 text-gray-700 group-hover:text-white text-xs font-bold py-3 rounded-xl transition-all duration-300 border border-gray-100/80 group-hover:border-transparent"
                >
                  View Details <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}