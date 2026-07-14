"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

interface ExploreCardProps {
  place: {
    _id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    price: number;
    rating: number;
    location: string;
    date: string;
  };
}

export default function ExploreCard({
  place,
}: ExploreCardProps) {
  return (
    <article
      className="
        group
        flex h-full flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      {/* Image */}

      <div className="relative h-52 overflow-hidden">
        <Image
          src={
            place.image?.trim()
              ? place.image
              : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80"
          }
          alt={place.title || "Stay Image"}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#16352E]">
          {place.category}
        </div>
      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-5">

        <h3 className="line-clamp-1 text-lg font-bold text-[#16352E]">
          {place.title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={15} />
          <span>{place.location}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-gray-600">
          {place.description}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <div>
            <span className="text-xs text-gray-400 block font-medium">Per Night</span>
            <p className="text-xl font-bold text-green-600">
              ${place.price}
            </p>

            <p className="text-xs text-gray-400">
              {place.date}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold">
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />
            {place.rating}
          </div>

        </div>

<Link
  href={`/exploreDetailes/${place._id}`}
  className="
    mt-6
    block
    w-full
    rounded-xl
    bg-green-600
    py-3
    text-center
    font-semibold
    text-white
    transition
    hover:bg-green-700
  "
>
  View Details
</Link>

      </div>
    </article>
  );
}