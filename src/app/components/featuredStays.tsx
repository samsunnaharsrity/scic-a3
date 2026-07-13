"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Loader2, DollarSign, ShieldCheck } from "lucide-react";

interface Stay {
  _id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
}

export default function FeaturedStays() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchStays = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stays`);

      const data = await res.json();

      setStays(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchStays();
}, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 bg-[#F8FBF9]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <p className="text-sm text-gray-500 font-medium">Loading premium stays...</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Title */}
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-black text-[#16352E] md:text-4xl">
              Featured <span className="text-green-600">Accommodations</span>
            </h2>
            <p className="mt-2 text-gray-500 max-w-xl">
              Book luxury hotels, premium resorts, and cozy villas verified by our travel experts.
            </p>
          </div>
          
          <Link
            href="/stays"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-green-600 hover:text-green-700 transition"
          >
            View All Properties
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Stays Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stays.map((stay) => (
            <div
              key={stay._id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-[#F8FBF9] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image
                src={stay.image}
                alt={stay.title}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-gray-900 shadow-xs">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>{stay.rating}</span>
                  <span className="text-gray-400 font-normal">({stay.reviewsCount})</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <MapPin size={14} className="text-green-600" />
                  <span className="truncate">{stay.location}</span>
                </div>

                <h3 className="text-lg font-bold text-[#16352E] tracking-tight line-clamp-1 group-hover:text-green-600 transition">
                  {stay.title}
                </h3>

                {/* Amenities Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5 min-h-[24px]">
                  {stay.amenities?.slice(0, 2).map((amenity, i) => (
                    <span key={i} className="rounded-md bg-white border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                      {amenity}
                    </span>
                  ))}
                  {stay.amenities?.length > 2 && (
                    <span className="text-[10px] text-gray-400 self-center font-medium">
                      +{stay.amenities.length - 2} more
                    </span>
                  )}
                </div>

                <hr className="my-4 border-gray-200/60" />

                {/* Pricing & Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Per Night</span>
                    <span className="text-xl font-black text-[#16352E] flex items-center">
                      <DollarSign size={16} className="-mr-0.5 text-green-600 stroke-[3]" />
                      {stay.price}
                    </span>
                  </div>

                  <Link
                    href={`/stays/${stay._id}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white transition-all group-hover:bg-green-600"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}