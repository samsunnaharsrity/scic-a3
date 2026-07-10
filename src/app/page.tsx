import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import HomeAbout from "./components/homeAbout";
import ExploreSection from "./components/explore/exploreSec";


export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <HomeAbout></HomeAbout>
      <ExploreSection limit={4}></ExploreSection>
    </div>
  );
}
