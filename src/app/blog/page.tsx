// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, User } from "lucide-react";

interface BlogItem {
  image: string;
  category: string;
  title: string;
  desc: string;
  date: string;
  slug: string;
}

const BLOGS: BlogItem[] = [
  {
    image: "/des.jfif",
    category: "Destination",
    title: "Best Places To Travel In 2026",
    desc: "Explore trending destinations, hidden gems and unforgettable travel experiences.",
    date: "June 25, 2026",
    slug: "best-places-to-travel-2026",
  },
  {
    image: "/guide.jfif",
    category: "Hotel Guide",
    title: "How To Choose The Perfect Hotel",
    desc: "Learn smart booking tips to find comfortable and luxury stays.",
    date: "June 18, 2026",
    slug: "how-to-choose-perfect-hotel",
  },
  {
    image: "/blog1.jfif",
    category: "Luxury Travel",
    title: "Luxury Travel On A Budget",
    desc: "Enjoy premium experiences without spending more than necessary.",
    date: "June 10, 2026",
    slug: "luxury-travel-on-a-budget",
  },
  {
    image: "/adventure.jfif",
    category: "Adventure",
    title: "Top Mountain Retreats",
    desc: "Discover peaceful mountain locations perfect for your next vacation.",
    date: "May 28, 2026",
    slug: "top-mountain-retreats",
  },
  {
    image: "/family.jfif",
    category: "Family",
    title: "Family Friendly Destinations",
    desc: "Plan amazing family trips with comfortable accommodations.",
    date: "May 15, 2026",
    slug: "family-friendly-destinations",
  },
  {
    image: "/plan.jfif",
    category: "Travel Tips",
    title: "Travel Safety Guide",
    desc: "Essential safety tips every traveler should know before exploring.",
    date: "May 05, 2026",
    slug: "travel-safety-guide",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-[#F8FBF9]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#16352E] via-[#1E5A45] to-[#245B49] py-24">
        {/* Background Ambient Blur */}
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-green-400/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-[140px]" />
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-green-200 backdrop-blur-md">
            <BadgeCheck size={16} className="text-green-300" />
            Travel Blog
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight leading-tight text-white sm:text-5xl lg:text-6xl">
            Travel Tips &{" "}
            <span className="bg-gradient-to-r from-green-300 to-emerald-100 bg-clip-text text-transparent">
              Stay Inspiration
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-green-100/80">
            Discover expert travel guides, destination inspiration, booking tips and the latest hospitality trends from StayNest.
          </p>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-md aspect-[4/3] sm:aspect-[16/10]">
            <Image
              src="/10des.jpg"
              alt="Featured Blog"
              fill
              priority
              className="object-cover transition duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* Content Details */}
          <div className="flex flex-col justify-center">
            <h2 className="mt-5 text-3xl font-black tracking-tight leading-tight text-[#16352E] sm:text-4xl">
              10 Luxury Destinations You Must Visit This Year
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              From tropical beaches to peaceful mountain retreats, discover breathtaking destinations that offer unforgettable experiences, luxury accommodations and world-class hospitality.
            </p>
            
            {/* Meta Info */}
            <div className="mt-6 flex flex-wrap gap-5 text-xs font-medium text-gray-500 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#16352E]" />
                StayNest Team
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#16352E]" />
                July 10, 2026
              </div>
            </div>

            {/* Featured Blog Connected To Dynamic URL */}
            <Link
              href="/blog/luxury-destinations-this-year"
              className="mt-6 inline-flex self-start items-center gap-2 rounded-xl bg-[#16352E] px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#0E2721] active:scale-98 shadow-sm"
            >
              Read Full Article
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs Feed */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-14 text-center">
          <h2 className="mt-4 text-3xl font-black text-[#16352E] tracking-tight">
            Explore Our Recent Blogs
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs text-gray-500">
            Stay updated with travel guides, booking tips, destination ideas and hospitality insights.
          </p>
        </div>

        {/* Blog Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOGS.map((blog, index) => (
            <article
              key={index}
              className="group overflow-hidden rounded-3xl bg-white border border-gray-100/80 shadow-[0_15px_40px_rgba(22,53,46,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(22,53,46,0.1)] flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[16/11]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-xl bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#16352E] shadow-sm backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                  <CalendarDays size={14} />
                  {blog.date}
                </div>
                <h3 className="mt-3 text-lg font-black leading-snug text-[#16352E] transition duration-200 group-hover:text-[#1E5A45]">
                  {blog.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-gray-500 flex-1 line-clamp-2">
                  {blog.desc}
                </p>
                
                {/* Dynamically Routed Link */}
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

        {/* Newsletter Call-To-Action */}
        <div className="relative mt-28 overflow-hidden rounded-[32px] bg-[#16352E] px-6 py-16 text-center shadow-xl">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-green-400/10 blur-[100px]" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-emerald-300/10 blur-[100px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl tracking-tight">
              Get Exclusive Travel Inspiration
            </h2>
            <p className="mx-auto mt-3 max-w-md text-xs text-green-100/70 leading-relaxed">
              Receive luxury destinations, hotel recommendations and travel stories directly in your inbox.
            </p>

            <div className="mx-auto mt-8 flex flex-col sm:flex-row max-w-md gap-2 rounded-2xl bg-white/5 sm:bg-white p-2 border border-white/10 sm:border-none backdrop-blur-md sm:backdrop-blur-none">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-white sm:bg-transparent px-4 py-3.5 text-sm text-gray-900 sm:text-gray-800 placeholder-gray-400 outline-none"
              />
              <button className="w-full sm:w-auto rounded-xl bg-[#16352E] px-6 py-3.5 text-sm font-bold text-white shadow-md transition duration-200 hover:bg-[#245B49] active:scale-98 shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}