"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";

const HOME_BLOGS = [
  {
    slug: "best-places-to-travel-2026",
    image: "/des.jfif",
    category: "Destination",
    title: "Best Places To Travel In 2026",
    desc: "Explore trending destinations, hidden gems and unforgettable travel experiences.",
    date: "June 25, 2026",
  },
  {
    slug: "how-to-choose-perfect-hotel",
    image: "/guide.jfif",
    category: "Hotel Guide",
    title: "How To Choose The Perfect Hotel",
    desc: "Learn smart booking tips to find comfortable and luxury stays.",
    date: "June 18, 2026",
  },
  {
    slug: "luxury-travel-on-a-budget",
    image: "/blog1.jfif",
    category: "Luxury Travel",
    title: "Luxury Travel On A Budget",
    desc: "Enjoy premium experiences without spending more than necessary.",
    date: "June 10, 2026",
  },
];

export default function TravelBlogs() {
  return (
    <section className="bg-[#F8FBF9] py-16 px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="mt-1 text-2xl font-black text-[#16352E] sm:text-3xl tracking-tight">
              Latest Insights & Stories
            </h2>

            <p className="mt-1.5 text-xs text-gray-500 max-w-sm">
            Explore trending destinations, smart booking tips, and expert travel guides.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#16352E] hover:text-emerald-700 transition group"
          >
            View All
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3-Card Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HOME_BLOGS.map((blog, index) => (
            <article
              key={index}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(22,53,46,0.05)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-103"
                />
                <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#16352E] backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 mt-4">
                <div className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
                  <Calendar size={12} />
                  {blog.date}
                </div>
                <h3 className="mt-2 text-base font-bold leading-snug text-[#16352E] group-hover:text-emerald-700 transition line-clamp-2">
                  {blog.title}
                </h3>
                <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 flex-1">
                  {blog.desc}
                </p>
                
                {/* Minimal Read Link */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-50 group-hover:bg-[#16352E] px-4 py-3 text-xs font-bold text-[#16352E] group-hover:text-white transition-all duration-300"
                >
                  Read Article
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}