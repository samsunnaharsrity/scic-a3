"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface PlaceDetailProps {
  placeId: string;
  placeName: string;
  imageUrl?: string;
  category?: string; 
}

export default function PlaceActions({ placeId, placeName, imageUrl, category }: PlaceDetailProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [relatedItems, setRelatedItems] = useState<any[]>([]);

  const { data: session } = authClient.useSession();
  const user = session?.user;


  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/user/${user.email}`);
        const data = await res.json();
        if (data.success) {
          const found = data.savedItems.some((item: any) => item.placeId === placeId);
          setIsSaved(found);
        }
      } catch (err) {
        console.error(err);
      }
    };


    const fetchRelated = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/places?category=${category || "all"}`);
        const data = await res.json();

        const filtered = data.places?.filter((p: any) => p._id !== placeId).slice(0, 3) || [];
        setRelatedItems(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    checkSavedStatus();
    fetchRelated();
  }, [placeId, user?.email, category]);

  const handleSaveToggle = async () => {
    if (!user) return alert("Please log in to save this place.");
    if (saving) return;

    try {
      setSaving(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          userEmail: user.email,
          placeName,
          imageUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSaved(data.isSaved);
        alert(data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 my-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-gray-900">{placeName}</h2>
        <button
          onClick={handleSaveToggle}
          disabled={saving}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${
            isSaved 
              ? "bg-amber-50 text-amber-600 border-amber-200" 
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          {isSaved ? "Saved in Folder" : "Save to Folder"}
        </button>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3">Related Items</h3>
        {relatedItems.length === 0 ? (
          <p className="text-sm text-gray-400">No related items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedItems.map((item) => (
              <Link 
                key={item._id} 
                href={`/places/${item._id}`} // 
                className="group block border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img 
                    src={item.imageUrl || "/placeholder.jpg"} 
                    alt={item.placeName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                  />
                </div>
                <h4 className="font-medium text-sm text-gray-900 group-hover:text-black line-clamp-1">
                  {item.placeName}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">View details →</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}