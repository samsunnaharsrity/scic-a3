"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Review {
  _id: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewSection({ placeId }: { placeId: string }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0 });

  // Fetch reviews function
  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/place/${placeId}`
      );
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
        setStats({
          totalReviews: data.totalReviews,
          averageRating: data.averageRating,
        });
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  useEffect(() => {
    if (placeId) {
      fetchReviews();
    }
  }, [placeId]);

  // Submit new review function
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      alert("Please login first to add a review.");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a comment.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeId,
          userName: user.name || "Anonymous",
          userEmail: user.email,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setComment("");
        setRating(5);
        await fetchReviews();
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      <div className="space-y-6 lg:col-span-1">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-center">
          <p className="text-sm font-medium text-gray-500 uppercase">Average Rating</p>
          <p className="mt-2 text-5xl font-extrabold text-gray-900">
            {stats.averageRating}
          </p>
          <div className="mt-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < Math.round(stats.averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">Based on {stats.totalReviews} reviews</p>
        </div>

        <form onSubmit={handleSubmitReview} className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition transform active:scale-95"
                  >
                    <Star
                      size={24}
                      className={
                        starValue <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* comments*/}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Comment</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience about this place..."
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>


      <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {reviews.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center border border-dashed border-gray-200 rounded-2xl text-gray-400">
            <MessageSquare size={32} className="mb-2 stroke-1" />
            <p className="text-sm">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{review.userName}</h4>
                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}