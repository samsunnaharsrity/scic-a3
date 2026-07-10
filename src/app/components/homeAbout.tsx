"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Star } from "lucide-react";

export default function HomeAbout() {
  return (
    <section className="bg-white py-20">

      {/* Section Header */}

<div className="mb-12 text-center">

  <h2 className="mt-5 text-3xl font-black text-[#16352E] lg:text-5xl">
    Discover the
    <span className="text-green-600"> StayNest Experience</span>
  </h2>

  <p className="mx-auto mt-5 max-w-xl text-md text-gray-600">
    We help travelers discover premium accommodations, trusted hosts,
    and unforgettable travel experiences across the world.
  </p>

</div>
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">

        {/* Left Image */}
        <div className="relative">

          <Image
            src="/img3.jfif"
            alt="About StayNest"
            width={700}
            height={700}
            className="h-[350px] w-full rounded-[30px] object-cover shadow-2xl lg:h-[500px]"
          />

          {/* Floating Rating */}
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl">

            <div className="flex items-center gap-2">
              <Star
                size={20}
                fill="currentColor"
                className="text-yellow-500"
              />

              <span className="font-bold text-[#16352E]">
                4.9 Rating
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Trusted by 10K+ Travelers
            </p>

          </div>

        </div>

        {/* Right */}
        <div>

          <h2 className="mt-6 text-4xl font-black text-[#16352E] lg:text-5xl">
            Your Trusted Travel
            <span className="block text-green-600">
              Accommodation Partner
            </span>
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            StayNest helps travelers discover verified hotels,
            luxury villas, apartments and unique stays around
            the world. We make booking simple, secure and
            memorable.
          </p>

          {/* Features */}

          <div className="mt-8 space-y-5">

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-100 p-3">
                <ShieldCheck className="text-green-700" />
              </div>

              <div>
                <h3 className="font-bold">
                  Secure Booking
                </h3>

                <p className="text-sm text-gray-500">
                  Verified hosts & safe payments.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-100 p-3">
                <Globe className="text-blue-700" />
              </div>

              <div>
                <h3 className="font-bold">
                  Worldwide Destinations
                </h3>

                <p className="text-sm text-gray-500">
                  Premium stays in 80+ countries.
                </p>
              </div>
            </div>

          </div>

          {/* Stats */}

          <div className="mt-10 flex gap-10">

            <div>
              <h3 className="text-3xl font-black text-[#16352E]">
                10K+
              </h3>

              <p className="text-sm text-gray-500">
                Happy Guests
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-[#16352E]">
                1200+
              </h3>

              <p className="text-sm text-gray-500">
                Properties
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-[#16352E]">
                80+
              </h3>

              <p className="text-sm text-gray-500">
                Countries
              </p>
            </div>

          </div>

          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-[#16352E] px-7 py-4 font-semibold text-white transition hover:bg-[#0f241f]"
          >
            Learn More
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}