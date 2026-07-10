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

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/*  Background Image  */}

      <div className="absolute inset-0">

        <Image
          src="/img2.jfif"
          alt="Luxury Resort"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#16352E]/90 via-[#16352E]/65 to-[#16352E]/30" />

        {/* Decorative Blur */}

        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-green-300/20 blur-[120px]" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-[150px]" />

      </div>

      {/*  Hero Content  */}

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-16 px-6 pt-28 pb-20 lg:grid-cols-2">

        {/*  LEFT  */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-lg">

            <BadgeCheck size={18} />

            Trusted by 10,000+ Travelers

          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">

            Discover Your

            <span className="block bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">

              Dream Stay

            </span>

            Around The World

          </h1>

          <p className="mt-6 max-w-xl text-md leading-8 text-gray-200">

            Book luxury villas, beachfront resorts, mountain cabins and premium
            apartments with verified hosts and instant booking.

          </p>

          {/* CTA Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/explore"
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-[#16352E] shadow-xl transition duration-300 hover:-translate-y-1"
            >
              Explore Stays
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/host"
              className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-[#16352E]"
            >
              Become a Host
            </Link>

          </div>

          {/* Features */}

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-lg">

              <ShieldCheck className="text-green-300" />

              <div>

                <h4 className="font-semibold text-white">
                  Verified
                </h4>

                <p className="text-sm text-gray-300">
                  Safe Booking
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-lg">

              <Star className="fill-yellow-400 text-yellow-400" />

              <div>

                <h4 className="font-semibold text-white">
                  4.9 Rating
                </h4>

                <p className="text-sm text-gray-300">
                  Happy Guests
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-lg">

              <BadgeCheck className="text-green-300" />

              <div>

                <h4 className="font-semibold text-white">
                  Instant
                </h4>

                <p className="text-sm text-gray-300">
                  Booking
                </p>

              </div>

            </div>

          </div>


                    {/* Statistics */}

          <div className="mt-14 flex flex-wrap gap-10">

            <div>
              <h2 className="text-4xl font-black text-white">
                50K+
              </h2>
              <p className="text-gray-300">
                Happy Guests
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white">
                1200+
              </h2>
              <p className="text-gray-300">
                Luxury Villas
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white">
                80+
              </h2>
              <p className="text-gray-300">
                Countries
              </p>
            </div>

          </div>

        </div>

        {/*  RIGHT  */}

 <div className="relative">

  {/* Hero Image */}
  <div className="overflow-hidden rounded-[30px] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,.25)]">

    <Image
      src="/hero1.jfif"
      alt="Luxury Stay"
      width={900}
      height={800}
      priority
      className="h-[260px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[380px] md:h-[500px] lg:h-[700px]"
    />

  </div>

  {/* Happy Travelers */}
  <div className="absolute bottom-2 left-2 rounded-2xl border border-white/20 bg-white/20 px-3 py-2 text-white backdrop-blur-xl shadow-xl sm:bottom-4 sm:left-4 sm:px-4 sm:py-3 lg:-left-8 lg:bottom-8 lg:px-6 lg:py-5">

    <p className="text-[9px] uppercase tracking-wide text-gray-200 sm:text-xs">
      Happy Travelers
    </p>

    <h2 className="text-lg font-black sm:text-2xl lg:text-5xl">
      10K+
    </h2>

    <div className="mt-1 flex gap-0.5 text-[10px] text-yellow-400 sm:text-sm">
      <Star size={10} fill="currentColor" />
      <Star size={10} fill="currentColor" />
      <Star size={10} fill="currentColor" />
      <Star size={10} fill="currentColor" />
      <Star size={10} fill="currentColor" />
    </div>

    <p className="mt-1 text-[9px] text-gray-200 sm:text-xs">
      Rated Excellent
    </p>

  </div>

  {/* Price Card */}
  <div className="absolute right-2 top-2 rounded-2xl border border-white/20 bg-[#16352E]/90 px-3 py-2 text-white backdrop-blur-xl shadow-xl sm:right-4 sm:top-4 sm:px-4 sm:py-3 lg:-right-6 lg:top-10 lg:px-6 lg:py-5">

    <p className="text-[9px] uppercase tracking-wide text-green-100 sm:text-xs">
      Starting From
    </p>

    <h2 className="text-lg font-black sm:text-2xl lg:text-5xl">
      $89
    </h2>

    <p className="text-[9px] text-green-100 sm:text-xs">
      /night
    </p>

  </div>

  {/* Verified Badge */}
  <div className="absolute bottom-20 right-2 hidden rounded-xl border border-white/20 bg-white/20 px-3 py-2 backdrop-blur-xl shadow-xl md:flex lg:right-0 lg:bottom-28 lg:px-4 lg:py-3">

    <ShieldCheck
      className="mr-2 text-green-300"
      size={18}
    />

    <div>

      <h4 className="text-sm font-semibold text-white">
        Verified
      </h4>

      <p className="text-xs text-gray-200">
        Secure Booking
      </p>

    </div>

  </div>

</div>

      </div>


            {/*  Floating Search Box  */}

      <div className="relative z-20 mx-auto -mt-10 max-w-6xl px-6">

        <div className="grid gap-4 rounded-[30px] border border-white/20 bg-white/90 p-5 shadow-[0_25px_70px_rgba(0,0,0,.18)] backdrop-blur-xl lg:grid-cols-5">

          <SearchItem
            icon={<MapPin size={22} />}
            title="Destination"
          />

          <SearchItem
            icon={<CalendarDays size={22} />}
            title="Check In"
          />

          <SearchItem
            icon={<CalendarDays size={22} />}
            title="Check Out"
          />

          <SearchItem
            icon={<Users size={22} />}
            title="Guests"
          />

          <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#16352E] to-[#1E5A45] px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

            <Search size={20} />

            Search Stay

          </button>

        </div>

      </div>

      {/*  Trusted Brands  */}

      <div className="mx-auto mt-20 max-w-6xl px-6 pb-20">

        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[5px] text-gray-300">
          Trusted by Travelers Worldwide
        </p>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">

          {[
            "Airbnb",
            "Booking.com",
            "Expedia",
            "Tripadvisor",
            "Agoda",
            "Hotels.com",
          ].map((brand) => (
            <div
              key={brand}
              className="rounded-2xl border border-white/20 bg-white/10 py-6 text-center font-semibold text-white backdrop-blur-lg transition duration-300 hover:-translate-y-2 hover:bg-white/20"
            >
              {brand}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

/*  Search Item  */

function SearchItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition hover:border-[#16352E]/20 hover:bg-[#F4F8F5]">

      <div className="rounded-xl bg-[#EAF6EF] p-3 text-[#16352E] transition group-hover:scale-110">
        {icon}
      </div>

      <div>

        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          Select
        </p>

      </div>

    </div>
  );
}