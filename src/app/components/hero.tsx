"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  ShieldCheck,
  Star,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8faf8] via-white to-[#eef8f2] pt-15">

      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-100 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <BadgeCheck size={18} />
            Trusted by 10,000+ Travelers
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 lg:text-7xl">
            Find Your
            <span className="block text-[#16352E]">
              Perfect Stay
            </span>
            Anywhere.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            Discover luxury villas, beach houses, apartments and mountain
            cabins across the world with instant booking and verified hosts.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/explore"
              className="flex items-center gap-2 rounded-2xl bg-[#16352E] px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Explore Stays
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/host"
              className="rounded-2xl border border-[#16352E] px-8 py-4 font-semibold text-[#16352E] transition hover:bg-[#16352E] hover:text-white"
            >
              Become a Host
            </Link>

          </div>

          {/* Features */}

          <div className="mt-12 grid grid-cols-3 gap-6">

            <div className="flex gap-3">
              <ShieldCheck className="text-green-600" />
              <div>
                <h4 className="font-semibold">
                  Verified
                </h4>
                <p className="text-sm text-gray-500">
                  Safe stays
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Star className="text-yellow-500" />
              <div>
                <h4 className="font-semibold">
                  4.9 Rating
                </h4>
                <p className="text-sm text-gray-500">
                  Happy Guests
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <BadgeCheck className="text-green-600" />
              <div>
                <h4 className="font-semibold">
                  Instant
                </h4>
                <p className="text-sm text-gray-500">
                  Booking
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <Image
            src="/hero1.jfif"
            alt="StayNest"
            width={900}
            height={800}
            className="rounded-[35px] shadow-2xl"
          />

          {/* Floating Card */}

          <div className="absolute -left-8 bottom-8 rounded-3xl bg-white/90 p-6 shadow-2xl backdrop-blur">

            <p className="text-sm text-gray-500">
              Happy Travelers
            </p>

            <h2 className="mt-1 text-4xl font-black text-[#16352E]">
              10K+
            </h2>

            <div className="mt-2 flex text-yellow-400">
              ★★★★★
            </div>

          </div>

          {/* Price Card */}

          <div className="absolute -right-6 top-10 rounded-3xl bg-[#16352E] p-5 text-white shadow-xl">

            <p className="text-sm">
              Starting From
            </p>

            <h2 className="text-4xl font-bold">
              $89
            </h2>

            <p>/night</p>

          </div>

        </div>

      </div>

      {/* Floating Search */}

      <div className="relative z-20 mx-auto -mt-10 max-w-6xl px-6">

        <div className="grid rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:grid-cols-5">

          <SearchItem icon={<MapPin size={20} />} title="Destination" />

          <SearchItem icon={<CalendarDays size={20} />} title="Check In" />

          <SearchItem icon={<CalendarDays size={20} />} title="Check Out" />

          <SearchItem icon={<Users size={20} />} title="Guests" />

          <button className="rounded-2xl bg-[#16352E] text-white transition hover:bg-[#0d241e]">
            Search
          </button>

        </div>

      </div>

    </section>
  );
}

function SearchItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-r p-5 last:border-none">
      <div className="text-[#16352E]">{icon}</div>

      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">
          Select
        </p>
      </div>
    </div>
  );
}