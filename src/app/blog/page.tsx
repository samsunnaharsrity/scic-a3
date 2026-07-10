"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  User,
} from "lucide-react";


const blogs = [
  {
    image: "/blog2.jpg",
    category: "Destination",
    title: "Best Places To Travel In 2026",
    desc: "Explore trending destinations, hidden gems and unforgettable travel experiences.",
    date: "June 25, 2026",
  },
  {
    image: "/blog3.jpg",
    category: "Hotel Guide",
    title: "How To Choose The Perfect Hotel",
    desc: "Learn smart booking tips to find comfortable and luxury stays.",
    date: "June 18, 2026",
  },
  {
    image: "/blog4.jpg",
    category: "Luxury Travel",
    title: "Luxury Travel On A Budget",
    desc: "Enjoy premium experiences without spending more than necessary.",
    date: "June 10, 2026",
  },
  {
    image: "/blog5.jpg",
    category: "Adventure",
    title: "Top Mountain Retreats",
    desc: "Discover peaceful mountain locations perfect for your next vacation.",
    date: "May 28, 2026",
  },
  {
    image: "/blog6.jpg",
    category: "Family",
    title: "Family Friendly Destinations",
    desc: "Plan amazing family trips with comfortable accommodations.",
    date: "May 15, 2026",
  },
  {
    image: "/blog7.jpg",
    category: "Travel Tips",
    title: "Travel Safety Guide",
    desc: "Essential safety tips every traveler should know before exploring.",
    date: "May 05, 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-[#F8FBF9]">

      {/*  Hero  */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#16352E] via-[#1E5A45] to-[#245B49] py-24">

        {/* Background Blur */}

        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-green-400/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-green-100 backdrop-blur-lg">

            <BadgeCheck size={18} />

            Travel Blog

          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-white lg:text-7xl">

            Travel Tips &
            <span className="block text-green-300">
              Stay Inspiration
            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-green-100">

            Discover expert travel guides, destination inspiration,
            booking tips and the latest hospitality trends from StayNest.

          </p>

        </div>

      </section>

      {/*  Featured Blog  */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Image */}

          <div className="relative overflow-hidden rounded-[32px]">

            <Image
              src="/blog1.jpg"
              alt="Featured Blog"
              width={700}
              height={600}
              className="h-[420px] w-full object-cover transition duration-700 hover:scale-105"
            />

          </div>

          {/* Content */}

          <div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-[#16352E]">

              Featured Article

            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight text-[#16352E]">

              10 Luxury Destinations You Must Visit This Year

            </h2>

            <p className="mt-6 leading-8 text-gray-600">

              From tropical beaches to peaceful mountain retreats,
              discover breathtaking destinations that offer unforgettable
              experiences, luxury accommodations and world-class hospitality.

            </p>

            {/* Meta */}

            <div className="mt-8 flex flex-wrap gap-6 text-gray-500">

              <div className="flex items-center gap-2">

                <User size={18} />

                StayNest Team

              </div>

              <div className="flex items-center gap-2">

                <CalendarDays size={18} />

                July 10, 2026

              </div>

            </div>

            <Link
              href="#"
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-[#16352E] px-7 py-4 font-semibold text-white transition hover:bg-[#0E2721]"
            >

              Read Full Article

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>

      {/*  Latest Blogs  */}

      <section className="mx-auto max-w-6xl px-6 pb-20">

        <div className="mb-14 text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-[#16352E]">

            Latest Articles

          </span>

          <h2 className="mt-5 text-4xl font-black text-[#16352E]">

            Explore Our Recent Blogs

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">

            Stay updated with travel guides, booking tips,
            destination ideas and hospitality insights.

          </p>

        </div>

        {/*  Blog Cards  */}

<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

{blogs.map((blog,index)=>(

<article
key={index}
className="
group overflow-hidden rounded-[35px]
bg-white
border border-gray-100
shadow-[0_20px_50px_rgba(22,53,46,0.08)]
transition-all duration-500
hover:-translate-y-3
hover:shadow-[0_30px_70px_rgba(22,53,46,0.18)]
"
>


<div className="relative overflow-hidden">

<Image
src={blog.image}
alt={blog.title}
width={600}
height={400}
className="
h-[280px]
w-full
object-cover
transition duration-700
group-hover:scale-110
"
/>


{/* Overlay */}

<div className="
absolute inset-0
bg-gradient-to-t
from-[#16352E]/60
via-transparent
to-transparent
opacity-0
transition
group-hover:opacity-100
"/>


<span
className="
absolute
left-6
top-6
rounded-full
bg-white/90
px-4
py-2
text-xs
font-bold
text-[#16352E]
backdrop-blur
"
>

{blog.category}

</span>


</div>



<div className="p-8">


<div className="
flex items-center gap-2
text-sm
text-gray-400
">

<CalendarDays size={16}/>

{blog.date}

</div>



<h3
className="
mt-5
text-2xl
font-black
leading-tight
text-[#16352E]
transition
group-hover:text-[#1E5A45]
"
>

{blog.title}

</h3>



<p className="
mt-4
leading-7
text-gray-600
">

{blog.desc}

</p>



<Link
href="#"
className="
mt-7
inline-flex
items-center
gap-3
rounded-xl
bg-[#16352E]
px-6
py-3
text-sm
font-bold
text-white
transition
hover:bg-[#245B49]
"
>

Read Article

<ArrowRight size={16}/>

</Link>


</div>


</article>


))}

</div>


        {/*  Newsletter CTA  */}

<section
className="
relative
mt-28
overflow-hidden
rounded-[45px]
bg-[#16352E]
px-8
py-20
text-center
"
>


<div className="
absolute
left-0
top-0
h-64
w-64
rounded-full
bg-green-400/20
blur-[100px]
"/>


<div className="
absolute
right-0
bottom-0
h-64
w-64
rounded-full
bg-emerald-300/20
blur-[100px]
"/>



<div className="relative">

<span
className="
rounded-full
border
border-white/20
bg-white/10
px-5
py-2
text-sm
font-semibold
text-green-200
"
>

Stay Updated

</span>



<h2
className="
mt-8
text-4xl
font-black
text-white
lg:text-5xl
"
>

Get Exclusive Travel Inspiration

</h2>



<p
className="
mx-auto
mt-5
max-w-xl
text-green-100
"
>

Receive luxury destinations,
hotel recommendations and travel stories directly in your inbox.

</p>



<div
className="
mx-auto
mt-10
flex
max-w-lg
rounded-2xl
bg-white
p-2
"
>


<input
placeholder="Enter your email"
className="
flex-1
rounded-xl
px-5
outline-none
"
/>


<button
className="
rounded-xl
bg-[#16352E]
px-7
font-bold
text-white
hover:bg-[#245B49]
"
>

Subscribe

</button>


</div>


</div>


</section>

      </section>

    </main>
  );
}