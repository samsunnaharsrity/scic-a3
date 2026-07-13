"use client";

import { useState } from "react";
import { Star, MessageSquare, Trash2, Pencil } from "lucide-react";

const initialReviews = [
  {
    id: 1,
    stay: "Ocean View Resort",
    rating: 5,
    date: "12 Jul 2026",
    comment:
      "Amazing stay! The rooms were clean, the staff was friendly, and the sea view was beautiful.",
  },
  {
    id: 2,
    stay: "Mountain Cabin",
    rating: 4,
    date: "05 Jul 2026",
    comment:
      "Very peaceful location. Great experience overall, but Wi-Fi could be improved.",
  },
  {
    id: 3,
    stay: "City Hotel",
    rating: 3,
    date: "20 Jun 2026",
    comment:
      "Good location and affordable price, but the room was smaller than expected.",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);

  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  return (
    <div className="space-y-8 mt-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
        <p className="mt-2 text-gray-500">
          Manage all the reviews you've shared.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <h2 className="mt-2 text-3xl font-bold">{reviews.length}</h2>
            </div>
            <MessageSquare className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <div className="mt-2 flex items-center gap-2">
              <Star className="fill-yellow-400 text-yellow-400" />
              <span className="text-3xl font-bold">
                {reviews.length
                  ? (
                      reviews.reduce((sum, r) => sum + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : "0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">{review.stay}</h2>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={18}
                        className={
                          index < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    Reviewed on {review.date}
                  </p>

                  <p className="text-gray-700">{review.comment}</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border bg-white py-20 text-center shadow-sm">
            <MessageSquare
              size={60}
              className="mx-auto mb-4 text-gray-300"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              No Reviews Yet
            </h2>
            <p className="mt-2 text-gray-500">
              You haven't written any reviews.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}