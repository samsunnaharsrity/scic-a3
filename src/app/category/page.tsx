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

const iconMap: Record<string, any> = {
  Beaches: Waves,
  Beach: Waves,
  beaches: Waves,
  beach: Waves,
  Mountains: Mountain,
  Mountain: Mountain,
  mountains: Mountain,
  mountain: Mountain,
  Historical: Landmark,
  History: Landmark,
  historical: Landmark,
  Cities: Building2,
  City: Building2,
  cities: Building2,
  city: Building2,
  Nature: Trees,
  nature: Trees,
  Camping: Tent,
  camping: Tent,
  Photography: Camera,
  photography: Camera,
  Island: Palmtree,
  island: Palmtree,
};

const colorMap: Record<string, string> = {
  Beaches: "from-sky-500 to-cyan-500",
  Beach: "from-sky-500 to-cyan-500",
  beaches: "from-sky-500 to-cyan-500",
  Mountains: "from-green-600 to-emerald-500",
  Mountain: "from-green-600 to-emerald-500",
  mountains: "from-green-600 to-emerald-500",
  Historical: "from-amber-500 to-orange-500",
  historical: "from-amber-500 to-orange-500",
  Cities: "from-indigo-500 to-violet-500",
  City: "from-indigo-500 to-violet-500",
  cities: "from-indigo-500 to-violet-500",
  Nature: "from-lime-500 to-green-600",
  nature: "from-lime-500 to-green-600",
  Camping: "from-orange-500 to-red-500",
  camping: "from-orange-500 to-red-500",
  Photography: "from-pink-500 to-rose-500",
  photography: "from-pink-500 to-rose-500",
  Island: "from-cyan-500 to-blue-500",
  island: "from-cyan-500 to-blue-500",
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/explore`
        );
        const data = await res.json();
        const places = data.data || data;

        const grouped = places.reduce(
          (acc: Record<string, number>, item: any) => {
            if (item.category) {
              acc[item.category] = (acc[item.category] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        const formatted = Object.entries(grouped).map(
          ([category, total]) => ({
            category,
            total,
          })
        );

        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-10 pt-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            Explore by Category
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 leading-8">
            Browse destinations based on your interests. Whether you love
            beaches, mountains, historical places, or city adventures, we have
            something for everyone.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-col items-center justify-between gap-5 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Popular Categories
            </h2>
            <p className="mt-2 text-gray-500">
              Discover destinations that match your travel style.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-6 py-3 shadow-sm border">
            <span className="text-sm text-gray-500">Total Categories</span>
            <h3 className="text-2xl font-bold text-amber-500">
              {categories.length}
            </h3>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
            <p className="text-gray-500">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <p className="text-gray-500">No categories found.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => {
              const Icon = iconMap[item.category] || MapPin;
              const color = colorMap[item.category] || "from-amber-500 to-orange-500";

              return (
                <div
                  key={item.category}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className={`bg-gradient-to-r ${color} p-8 text-white`}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                      <Icon size={34} />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold">{item.category}</h3>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 leading-7">
                      Discover amazing {item.category.toLowerCase()} destinations.
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} />
                      <span>{item.total} Places</span>
                    </div>

<Link
  href={`/components/explore?category=${encodeURIComponent(item.category)}`}
  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
>
  Explore
  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center text-white">
          <h2 className="text-4xl font-extrabold">Start Your Next Adventure</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-amber-100">
            Discover incredible destinations, save your favorite places, and
            create unforgettable travel experiences with our Explore platform.
          </p>


          <Link
            href="/components/explore"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-amber-600 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          >
            Explore All Destinations
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}