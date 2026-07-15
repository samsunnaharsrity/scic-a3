"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe,
  HeartHandshake,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#F8FBF9]">

      {/*  Hero  */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#16352E] via-[#1E5A45] to-[#245B49] py-20 lg:py-24">

        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-[140px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-green-100 backdrop-blur-md">

              <BadgeCheck size={18} />

              Trusted Worldwide

            </span>

            <h1 className="mt-8 text-4xl font-black leading-tight text-white lg:text-6xl">

              About

              <span className="block text-green-300">
                StayNest
              </span>

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-green-100">

              StayNest is a premium accommodation platform helping
              travelers discover luxury villas, apartments,
              beachfront homes and unforgettable experiences around
              the globe.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/explore"
                className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-[#16352E] transition hover:scale-105"
              >
                Explore Stays

                <ArrowRight size={18} />

              </Link>

              <Link
                href="/contact"
                className="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#16352E]"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="relative pt-10">

            <Image
              src="/img3.jpg"
              alt="About StayNest"
              width={700}
              height={700}
              className="rounded-[35px] object-cover shadow-[0_35px_90px_rgba(0,0,0,.25)]"
            />

            {/* Floating Card */}

            <div className="absolute -bottom-8 left-8 rounded-3xl bg-white p-6 shadow-2xl">

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-green-100 p-3">

                  <Star
                    className="text-yellow-500"
                    fill="currentColor"
                  />

                </div>

                <div>

                  <h3 className="text-3xl font-black text-[#16352E]">
                    4.9
                  </h3>

                  <p className="text-gray-500">
                    Guest Rating
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/*  Story  */}

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <Image
            src="/img6.jpg"
            alt="Our Story"
            width={650}
            height={650}
            className="rounded-[30px] shadow-xl"
          />

          <div>

            <h2 className="text-3xl lg:text-4xl font-black text-[#16352E]">
              Our Story
            </h2>

            <p className="mt-6 leading-8 text-gray-600">

              Founded with a vision to simplify travel, StayNest
              connects guests with trusted hosts around the world.
              Whether you're planning a family vacation, business
              trip or weekend escape, our mission is to make every
              stay comfortable, secure and memorable.

            </p>

            <p className="mt-5 leading-8 text-gray-600">

              Today, thousands of travelers rely on StayNest to
              discover premium accommodations, enjoy transparent
              pricing and book with confidence.

            </p>

          </div>

        </div>

      </section>

{/*  Mission  */}

<section className="bg-white py-16 lg:py-20">
  <div className="mx-auto max-w-6xl px-6">

    <div className="text-center">
      <h2 className="text-4xl font-black text-[#16352E]">
        Why Choose StayNest
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-gray-500">
        We focus on providing premium stays, secure bookings and
        exceptional travel experiences.
      </p>
    </div>

    {/* Cards */}
    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

      {/* Card 1 */}
      <div className="rounded-[30px] bg-[#F8FBF9] p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

        <div className="mb-6 inline-flex rounded-2xl bg-green-100 p-4">
          <ShieldCheck
            className="text-green-700"
            size={30}
          />
        </div>

        <h3 className="text-2xl font-bold text-[#16352E]">
          Secure Booking
        </h3>

        <p className="mt-4 leading-8 text-gray-600">
          Every booking is protected with trusted payment methods and
          verified hosts to ensure complete peace of mind.
        </p>

      </div>

      {/* Card 2 */}
      <div className="rounded-[30px] bg-[#F8FBF9] p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

        <div className="mb-6 inline-flex rounded-2xl bg-blue-100 p-4">
          <Globe
            className="text-blue-700"
            size={30}
          />
        </div>

        <h3 className="text-2xl font-bold text-[#16352E]">
          Global Destinations
        </h3>

        <p className="mt-4 leading-8 text-gray-600">
          Explore thousands of premium stays across more than
          80 countries with one trusted platform.
        </p>

      </div>

      {/* Card 3 */}
      <div className="rounded-[30px] bg-[#F8FBF9] p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

        <div className="mb-6 inline-flex rounded-2xl bg-pink-100 p-4">
          <HeartHandshake
            className="text-pink-600"
            size={30}
          />
        </div>

        <h3 className="text-2xl font-bold text-[#16352E]">
          Exceptional Support
        </h3>

        <p className="mt-4 leading-8 text-gray-600">
          Our dedicated support team is available 24/7 to help
          before, during and after every trip.
        </p>

      </div>

    </div>

  </div>
</section>

{/*  Statistics  */}

<section className="py-16 lg:py-20">

  <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center lg:grid-cols-4">

    {[
      {
        number: "10K+",
        title: "Happy Guests",
      },
      {
        number: "1200+",
        title: "Luxury Properties",
      },
      {
        number: "80+",
        title: "Countries",
      },
      {
        number: "4.9★",
        title: "Average Rating",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="rounded-[28px] bg-white p-6 shadow-xl"
      >
        <h2 className="text-3xl lg:text-4xl font-black text-[#16352E]">
          {item.number}
        </h2>

        <p className="mt-3 text-gray-500">
          {item.title}
        </p>
      </div>
    ))}

  </div>

</section>

</main>
  )
}