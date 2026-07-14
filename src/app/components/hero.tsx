"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const FEATURES = [
  { icon: <ShieldCheck className="text-green-300" size={20} />, title: "Verified", desc: "Safe Booking" },
  { icon: <Star className="fill-yellow-400 text-yellow-400" size={20} />, title: "4.9 Rating", desc: "Happy Guests" },
  { icon: <BadgeCheck className="text-green-300" size={20} />, title: "Instant", desc: "Booking" },
];

const STATS = [
  { value: "50K+", label: "Happy Guests" },
  { value: "1200+", label: "Luxury Villas" },
  { value: "80+", label: "Countries" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#16352E]">
      {/* Background Layer */}
<div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
  {/* Base Background Image */}
  <Image
    src="/img5.jfif"
    alt="Luxury Resort"
    fill
    priority
    className="object-cover opacity-50" 
  />
  <div className="absolute inset-0 bg-gradient-to-b from-[#16352E]/40 via-[#16352E]/70 to-[#16352E]" />
  
  {/* Ambient Glows */}
  <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-green-500/10 blur-[120px]" />
  <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[150px]" />
</div>

      {/* Hero Wrapper */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-30 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex self-start items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <BadgeCheck size={16} className="text-green-300" />
              Trusted by 10,000+ Travelers
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your{" "}
              <span className="bg-gradient-to-r from-green-300 to-emerald-100 bg-clip-text text-transparent">
                Dream Stay
              </span>{" "}
              Around The World
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-300">
              Book luxury villas, beachfront resorts, mountain cabins and premium
              apartments with verified hosts and instant booking safety.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/components/explore"
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#16352E] shadow-lg transition duration-200 hover:bg-gray-50 active:scale-98"
              >
                Explore Stays
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/host"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:bg-white/10 active:scale-98"
              >
                Become a Host
              </Link>
            </div>

            {/* Feature Mini Cards */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {FEATURES.map((item, index) => (
                <div key={index} className="flex items-center gap-3 rounded-xl bg-white/5 p-3.5 border border-white/10 backdrop-blur-md">
                  {item.icon}
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-none">{item.title}</h4>
                    <p className="mt-1 text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Counter Grid */}
            <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
              {STATS.map((stat, idx) => (
                <div key={idx}>
                  <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative lg:ml-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-[4/5] max-h-[580px]">
              <Image
                src="/hero1.jfif"
                alt="Luxury Stay"
                width={800}
                height={1000}
                priority
                className="h-full w-full object-cover transition duration-500 hover:scale-102"
              />
            </div>

            {/* Floating Ratings Overlay */}
            <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-[#16352E]/80 p-4 text-white backdrop-blur-md shadow-xl sm:-left-6 sm:bottom-6">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">Happy Travelers</span>
              <h4 className="text-2xl font-black mt-0.5">10K+</h4>
              <div className="mt-1.5 flex gap-0.5 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>

            {/* Floating Price Tag */}
            <div className="absolute right-4 top-4 rounded-xl border border-white/10 bg-[#16352E] p-4 text-white shadow-xl sm:-right-4 sm:top-8">
              <span className="text-[10px] uppercase tracking-wider text-green-300 block font-medium">Rates From</span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="text-2xl font-black">$89</span>
                <span className="text-xs text-gray-400">/night</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search Bar Widget */}
        <div className="mt-10">
          <div className="grid gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl md:grid-cols-2 lg:grid-cols-5">
            <SearchItem icon={<MapPin size={18} />} title="Destination" placeholder="Where to?" />
            <SearchItem icon={<CalendarDays size={18} />} title="Check In" placeholder="Add date" />
            <SearchItem icon={<CalendarDays size={18} />} title="Check Out" placeholder="Add date" />
            <SearchItem icon={<Users size={18} />} title="Guests" placeholder="Add guests" />
            
            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16352E] to-[#1E5A45] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:opacity-95 active:scale-98 lg:col-span-1 md:col-span-2">
              <Search size={16} />
              Search Stays
            </button>
          </div>
        </div>

        {/* Trusted Brands Panel */}
        <div className="mt-10 border-t border-white/5 pt-12">
          <p className="text-center text-[10px] font-bold uppercase tracking-[3px] text-gray-400">
            Trusted by Travelers Worldwide
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {["Airbnb", "Booking.com", "Expedia", "Tripadvisor", "Agoda", "Hotels.com"].map((brand) => (
              <div
                key={brand}
                className="rounded-xl border border-white/5 bg-white/5 py-4 text-center text-xs font-medium text-gray-300 backdrop-blur-sm transition duration-200 hover:bg-white/10 hover:text-white"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* Reusable Search Item Sub-Component */
function SearchItem({
  icon,
  title,
  placeholder,
}: {
  icon: React.ReactNode;
  title: string;
  placeholder: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-gray-50 p-3 transition hover:bg-gray-50/80 cursor-pointer">
      <div className="rounded-lg bg-green-50 p-2.5 text-[#16352E] transition group-hover:scale-105">
        {icon}
      </div>
      <div className="overflow-hidden">
        <h3 className="text-xs font-bold text-gray-900 leading-none">{title}</h3>
        <p className="text-xs text-gray-400 mt-1 truncate">{placeholder}</p>
      </div>
    </div>
  );
}