"use client";

import { Search } from "lucide-react";

interface ExploreFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  location: string;
  setLocation: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  rating: string;
  setRating: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function ExploreFilters({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
  price,
  setPrice,
  rating,
  setRating,
  sort,
  setSort,
}: ExploreFiltersProps) {
  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Search */}

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search destinations, places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-xl border border-gray-200 pl-11 pr-4 text-sm outline-none transition focus:border-green-600"
        />
      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
        >
          <option value="">All Categories</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="City">City</option>
          <option value="Resort">Resort</option>
          <option value="Villa">Villa</option>
        </select>

        {/* Location */}

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
        />

        {/* Price */}

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
        >
          <option value="">All Prices</option>
          <option value="100">$0 - $100</option>
          <option value="200">$101 - $200</option>
          <option value="300">$201 - $300</option>
          <option value="500">$300+</option>
        </select>

        {/* Rating */}

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
        >
          <option value="">Most Popular</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
        </select>

      </div>
    </div>
  );
}