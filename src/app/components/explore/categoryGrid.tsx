"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Mountain,
  Waves,
  Trees,
  Building2,
  Landmark,
  Tent,
  Camera,
  Palmtree,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  category: string;
  total: number;
}

interface CategoryGridProps {
  limit?: number; 
}

const iconMap: Record<string, any> = {
  Beaches: Waves, Beach: Waves, beaches: Waves, beach: Waves,
  Mountains: Mountain, Mountain: Mountain, mountains: Mountain, mountain: Mountain,
  Historical: Landmark, History: Landmark, historical: Landmark,
  Cities: Building2, City: Building2, cities: Building2, city: Building2,
  Nature: Trees, nature: Trees,
  Camping: Tent, camping: Tent,
  Photography: Camera, photography: Camera,
  Island: Palmtree, island: Palmtree,
};

const colorMap: Record<string, string> = {
  Beaches: "from-sky-500 to-cyan-500", Beach: "from-sky-500 to-cyan-500", beaches: "from-sky-500 to-cyan-500",
  Mountains: "from-green-600 to-emerald-500", Mountain: "from-green-600 to-emerald-500", mountains: "from-green-600 to-emerald-500",
  Historical: "from-amber-500 to-orange-500", historical: "from-amber-500 to-orange-500",
  Cities: "from-indigo-500 to-violet-500", City: "from-indigo-500 to-violet-500", cities: "from-indigo-500 to-violet-500",
  Nature: "from-lime-500 to-green-600", nature: "from-lime-500 to-green-600",
  Camping: "from-orange-500 to-red-500", camping: "from-orange-500 to-red-500",
  Photography: "from-pink-500 to-rose-500", photography: "from-pink-500 to-rose-500",
  Island: "from-cyan-500 to-blue-500", island: "from-cyan-500 to-blue-500",
};

export default function CategoryGrid({ limit }: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/explore`);
        const data = await res.json();
        const places = data.data || data;

        const grouped = places.reduce((acc: Record<string, number>, item: any) => {
          if (item.category) {
            acc[item.category] = (acc[item.category] || 0) + 1;
          }
          return acc;
        }, {});

        const formatted = Object.entries(grouped).map(([category, total]) => ({
          category,
          total: total as number,
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);


  const displayCategories = limit ? categories.slice(0, limit) : categories;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <p className="text-sm text-gray-500 font-medium">Loading top categories...</p>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Section Header */}
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-black text-[#16352E] md:text-4xl">
            Popular <span className="text-green-600">Categories</span>
          </h2>
          <p className="mt-2 text-gray-500">
            Discover amazing places that match your unique travel style.
          </p>
        </div>
        
        {limit && categories.length > limit && (
          <Link
            href="/category" 
            className="group inline-flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 transition"
          >
            See All Categories
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayCategories.map((item) => {
          const Icon = iconMap[item.category] || MapPin;
          const color = colorMap[item.category] || "from-amber-500 to-orange-500";

          return (
            <div
              key={item.category}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg flex flex-col justify-between"
            >
              <div className={`bg-gradient-to-r ${color} p-6 text-white`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs">
                  <Icon size={26} />
                </div>
                <h3 className="mt-4 text-xl font-bold">{item.category}</h3>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={14} />
                  <span>{item.total} Destinations</span>
                </div>

                <Link
                  href={`/components/explore?category=${encodeURIComponent(item.category)}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800"
                >
                  Explore Places
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}