"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; 
import ExploreFilters from "./exploreFilters";
import ExploreCard from "./ExploreCard";
import ExplorePagination from "./ExplorePagination";

interface ExplorePlace {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  location: string;
  date: string;
}

interface ExploreSectionProps {
  limit?: number;
}

export default function ExploreSection({ limit }: ExploreSectionProps) {
  const searchParams = useSearchParams();

  const queryCategory = searchParams.get("category") || "";

  const [places, setPlaces] = useState<ExplorePlace[]>([]);
  const [loading, setLoading] = useState(true);

  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); 
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory);
    }
  }, [queryCategory]);

  const filteredPlaces = useMemo(() => {
    let filtered = [...places];

    // Search
    if (search) {
      filtered = filtered.filter(
        (place) =>
          place.title.toLowerCase().includes(search.toLowerCase()) ||
          place.location.toLowerCase().includes(search.toLowerCase()) ||
          place.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category 
    if (category) {
      filtered = filtered.filter(
        (place) => place.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Location
    if (location) {
      filtered = filtered.filter((place) =>
        place.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Price
    if (price) {
      filtered = filtered.filter((place) => {
        if (price === "100") return place.price <= 100;
        if (price === "200") return place.price > 100 && place.price <= 200;
        if (price === "300") return place.price > 200 && place.price <= 300;
        if (price === "500") return place.price > 300;
        return true;
      });
    }

    // Rating
    if (rating) {
      filtered = filtered.filter((place) => place.rating >= Number(rating));
    }

    // Sort
    switch (sort) {
      case "low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [places, search, category, location, price, rating, sort]);

  const cardsPerPage = 8;
  const totalPages = Math.ceil(filteredPlaces.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;

  const paginatedPlaces = filteredPlaces.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const displayPlaces = limit
    ? filteredPlaces.slice(0, limit)
    : paginatedPlaces;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/explore`
        );
        const data = await res.json();
        setPlaces(data.data || []);
      } catch (error) {
        console.log("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading destinations...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#F8FBF9] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-center text-center">
          <h2 className="mt-5 text-4xl font-black text-[#16352E] md:text-5xl">
            Discover Beautiful
            <span className="text-green-600"> Destinations</span>
          </h2>
          <p className="mt-5 max-w-2xl text-gray-600">
            Explore amazing places, luxury stays and unforgettable travel
            experiences around the world.
          </p>
        </div>

        <ExploreFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
          price={price}
          setPrice={setPrice}
          rating={rating}
          setRating={setRating}
          sort={sort}
          setSort={setSort}
        />

        {/* Cards */}
        {displayPlaces.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed mt-6">
            <p className="text-gray-500">No destinations found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {displayPlaces.map((place) => (
              <ExploreCard key={place._id} place={place} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!limit && totalPages > 1 && (
          <ExplorePagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* View More Button (Only Home Page) */}
{limit && filteredPlaces.length > limit && (
  <div className="mt-12 flex justify-center">
    <Link
      href="/components/explore"
      className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white font-semibold transition hover:bg-green-700"
    >
      View More
      <ArrowRight size={18} />
    </Link>
  </div>
)}
      </div>
    </section>
  );
}