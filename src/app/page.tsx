import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import HomeAbout from "./components/homeAbout";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <HomeAbout></HomeAbout>
    </div>
  );
}
