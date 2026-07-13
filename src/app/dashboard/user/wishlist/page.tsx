"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star, Trash2 } from "lucide-react";

const wishlist = [
  {
    id: 1,
    title: "Ocean View Resort",
    location: "Cox's Bazar",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    price: 120,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Mountain Cabin",
    location: "Bandarban",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    price: 90,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Luxury Beach Villa",
    location: "Saint Martin",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    price: 180,
    rating: 4.9,
  },
];

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="mt-2 text-gray-500">
          Your favorite stays are saved here.
        </p>
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
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((stay) => (
            <div
              key={stay.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={stay.image}
                  alt={stay.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h2 className="text-xl font-semibold">{stay.title}</h2>

                  <div className="mt-2 flex items-center gap-1 text-gray-500">
                    <MapPin size={16} />
                    <span>{stay.location}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="font-medium">{stay.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-primary">
                    ${stay.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      / night
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/stays/${stay.id}`}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-center font-medium text-white transition hover:opacity-90"
                  >
                    View Details
                  </Link>

                  <button
                    className="rounded-lg border border-red-500 p-2 text-red-500 transition hover:bg-red-50"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-white py-20 text-center shadow-sm">
          <Heart
            size={60}
            className="mx-auto mb-4 text-gray-300"
          />

          <h2 className="text-2xl font-semibold">
            Your Wishlist is Empty
          </h2>

          <p className="mt-2 text-gray-500">
            Save your favorite stays and they will appear here.
          </p>

          <Link
            href="/stays"
            className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white"
          >
            Explore Stays
          </Link>
        </div>
      )}
    </div>
  );
}