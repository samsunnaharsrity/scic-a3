"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Search,
  User,
  Home,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session } = useSession();

  const isLoggedIn = !!session;

const [siteName, setSiteName] = useState("StayNest");

useEffect(() => {
  const loadSettings = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`);
    const data = await res.json();

    if (res.ok) {
      setSiteName(data.siteName);
    }
  };

  loadSettings();

  const handleSettingsUpdate = () => {
    loadSettings();
  };

  window.addEventListener("settingsUpdated", handleSettingsUpdate);

  return () => {
    window.removeEventListener("settingsUpdated", handleSettingsUpdate);
  };
}, []);


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/components/explore" },
    { name: "Categories", href: "/category" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
      ...(isLoggedIn ? [{ name: "Dashboard", href: "/dashboard" }] : []),

  ];

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/";
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#16352E]"
        >
          <Home size={28} />
          <span>{siteName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-gray-700 transition hover:text-[#16352E]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

{/* Desktop Right */}
<div className="hidden lg:flex items-center gap-4">

  {/* Search */}
  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100">
    <Search size={18} />
  </button>

  {isLoggedIn ? (
    <>


      {/* Avatar */}
      <button className="flex items-center gap-3 rounded-full border border-gray-200 px-2 py-1 transition hover:bg-gray-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#059669] to-[#16352E] text-sm font-bold text-white">
          {session?.user?.name?.charAt(0).toUpperCase() || (
            <User size={18} />
          )}
        </div>

        <div className="hidden xl:block text-left">
          <p className="text-sm font-semibold text-gray-800">
            {session?.user?.name}
          </p>
          <p className="max-w-[150px] truncate text-xs text-gray-500">
            {session?.user?.email}
          </p>
        </div>
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
      >
        <LogOut size={17} />
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/signin"
        className="rounded-full border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100"
      >
        Sign In
      </Link>

      <Link
        href="/register"
        className="rounded-full bg-gradient-to-r from-[#059669] to-[#16352E] px-5 py-2.5 font-medium text-white shadow-md transition hover:shadow-xl"
      >
        Sign Up
      </Link>
    </>
  )}
</div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


            {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-5 py-5">

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100 hover:text-[#16352E]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="my-5 border-t border-gray-200" />

            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="space-y-3">

                <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16352E] text-lg font-semibold text-white">
                    {session?.user?.name?.charAt(0).toUpperCase() || (
                      <User size={20} />
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {session?.user?.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>


<button
  onClick={async () => {
    setMenuOpen(false);
    await handleLogout();
  }}
  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500 py-3 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
>
  <LogOut size={18} />
  Logout
</button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl border border-gray-300 py-3 text-center font-medium transition hover:bg-gray-100"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-[#059669] to-[#16352E] py-3 text-center font-medium text-white shadow-lg transition hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;