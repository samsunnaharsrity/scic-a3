import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import HomeAbout from "./components/homeAbout";
import ExploreSection from "./components/explore/exploreSec";
import CategoryGrid from "./components/explore/categoryGrid";
import FeaturedStays from "./components/featuredStays";
import TravelBlogs from "./components/travelBlogs";
import { Suspense } from "react";
import Footer from "./components/footer";
import Testimonials from "./components/testimonials";



export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <HomeAbout></HomeAbout>
      <CategoryGrid limit={4}/>
      <Suspense fallback={<div>Loading...</div>}>
        <ExploreSection limit={4} />
      </Suspense>
      {/* <FeaturedStays /> */}
      <TravelBlogs />
      <Testimonials />
      {/* <Newsletter /> */}
      <Footer></Footer>
    </div>
  );
}
