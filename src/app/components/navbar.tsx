"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  User,
  Home,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // পরে Auth Context থেকে নিবে
  const isLoggedIn = false;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-green-700"
          >
            <Home size={28} />
            <span>StayNest</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">

            <button className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition">
              <Search size={18} />
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Dashboard
                </Link>

                <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <User size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-5">

            <nav className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full border rounded-lg py-2 text-center"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="w-full rounded-lg py-2 text-center bg-green-600 text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;