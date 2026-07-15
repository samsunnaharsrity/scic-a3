"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "Booking through StayNest was effortless. The hotel matched the photos perfectly, and the service exceeded my expectations.",
  },
  {
    id: 2,
    name: "Michael Brown",
    location: "London, UK",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "I found the perfect beach resort at an amazing price. The booking process was smooth and customer support was very responsive.",
  },
  {
    id: 3,
    name: "Emily Davis",
    location: "Sydney, Australia",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    review:
      "One of the best travel booking experiences I've had. Highly recommended for anyone looking for quality stays.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
            What Our Guests Say
          </h2>

          <p className="mt-4 text-gray-600 dark:text-neutral-400">
            Thousands of travelers trust StayNest to discover amazing places,
            book confidently, and enjoy unforgettable experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.location}
                  </p>
                </div>
              </div>

              <div className="mb-5 flex gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-7 text-gray-600 dark:text-neutral-300">
                "{item.review}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl bg-green-900 p-10 text-center text-white md:grid-cols-4">
  <div>
    <h3 className="text-4xl font-bold">15K+</h3>
    <p className="mt-2 text-green-100">Happy Guests</p>
  </div>

  <div>
    <h3 className="text-4xl font-bold">350+</h3>
    <p className="mt-2 text-green-100">Luxury Stays</p>
  </div>

  <div>
    <h3 className="text-4xl font-bold">120+</h3>
    <p className="mt-2 text-green-100">Destinations</p>
  </div>

  <div>
    <h3 className="text-4xl font-bold">4.9★</h3>
    <p className="mt-2 text-green-100">Average Rating</p>
  </div>
</div>
      </div>
    </section>
  );
}