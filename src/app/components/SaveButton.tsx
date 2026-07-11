"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface SavedItem {
  placeId: string;
  userEmail: string;
}

export default function SaveButton({ placeId }: { placeId: string }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email || !placeId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/save/user/${user.email}`
        );

        if (!res.ok) return;

        const data = await res.json();

        if (data.success) {
          const found = data.savedItems.some(
            (item: SavedItem) =>
              String(item.placeId) === String(placeId)
          );

          setIsSaved(found);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkStatus();
  }, [user?.email, placeId]);

  const handleSaveToggle = async () => {
    if (!user?.email) {
      alert("Please login first.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/save/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placeId,
            userEmail: user.email,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setIsSaved(data.isSaved);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
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
          ? "bg-amber-50 border-amber-200 text-amber-600"
          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Bookmark
        size={18}
        fill={isSaved ? "currentColor" : "none"}
      />

      {loading
        ? "Loading..."
        : isSaved
        ? "Saved in Folder"
        : "Save to Folder"}
    </button>
  );
}