"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SaveButton({ placeId }: { placeId: string }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const checkStatus = async () => {
      if (!user?.email || !placeId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/user/${user.email}`);
        const data = await res.json();
        if (data.success) {
          const found = data.savedItems.some((item: any) => item.placeId === placeId);
          setIsSaved(found);
        }
      } catch (err) {
        console.error("Error checking save status:", err);
      }
    };
    checkStatus();
  }, [placeId, user?.email]);

  const handleSaveToggle = async () => {
    if (!user) return alert("Please log in to save this place.");
    if (loading) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          userEmail: user.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSaved(data.isSaved);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Save toggle error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSaveToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition ${
        isSaved
          ? "bg-amber-50 text-amber-600 border-amber-200"
          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
      }`}
    >
      <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
      {isSaved ? "Saved in Folder" : "Save to Folder"}
    </button>
  );
}