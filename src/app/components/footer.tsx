"use client";

import Link from "next/link";
import {

  MapPin,
  Mail,
  Phone,
  Send,
  Home,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {  FaLinkedin } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/components/explore" },
    { name: "Categories", href: "/category" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

const supportLinks = [
  { name: "Help Center", href: "/help-center" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Cancellation Policy", href: "/cancellation-policy" },
  { name: "FAQs", href: "/FAQs" },
];

const socials = [
  {
    icon: <FaFacebookF size={18} />,
    href: "https://facebook.com",
  },
  {
    icon: <FaInstagram size={18} />,
    href: "https://instagram.com",
  },
  {
    icon: <FaTwitter size={18} />,
    href: "https://twitter.com",
  },
  {
    icon: <FaLinkedin size={18} />,
    href: "https://linkedin.com",
  },
];


const [settings, setSettings] = useState({
  siteName: "StayNest",
  email: "support@staynest.com",
  phone: "+880 1700-000000",
  address: "Dhaka, Bangladesh",
});

useEffect(() => {
  const loadSettings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSettings({
          siteName: data.siteName || "StayNest",
          email: data.email || "support@staynest.com",
          phone: data.phone || "+880 1700-000000",
          address: data.address || "Dhaka, Bangladesh",
        });
      }
    } catch (err) {
      console.error(err);
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


  return (
    <footer className="relative overflow-hidden bg-[#16352E] text-white">

      {/* Background Blur */}

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-green-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-300/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">

        {/* Top */}

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <Link
              href="/"
              className="flex items-center gap-2 text-3xl font-black"
            >
              <Home size={30} />
              {settings.siteName}
            </Link>

            <p className="mt-6 leading-8 text-gray-300">
              Discover luxury villas, beach houses,
              mountain cabins and unforgettable stays
              around the world with trusted hosts.
            </p>

            <div className="mt-8 flex gap-4">

              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 bg-white/10 p-3 transition hover:bg-green-600"
                >
                  {social.icon}
                </a>
              ))}

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-bold">
              Quick Links
            </h3>

            <div className="space-y-4">

              {quickLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 transition hover:text-green-400"
                >
                  {item.name}
                </Link>
              ))}

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-6 text-xl font-bold">
              Support
            </h3>

            <div className="space-y-4">

              {supportLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 transition hover:text-green-400"
                >
                  {item.name}
                </Link>
              ))}

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-bold">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin
                  className="mt-1 text-green-400"
                  size={18}
                />

                <p className="text-gray-300">
                  {settings.address}
                </p>

              </div>

              <div className="flex gap-3">

                <Phone
                  className="text-green-400"
                  size={18}
                />

                <p className="text-gray-300">
                  {settings.phone}
                </p>

              </div>

              <div className="flex gap-3">

                <Mail
                  className="text-green-400"
                  size={18}
                />

                <p className="text-gray-300">
                  {settings.email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Newsletter */}

        <div className="mt-10 rounded-[30px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

          <div className="grid items-center gap-8 lg:grid-cols-2">

            <div>

              <h2 className="text-3xl font-black">
                Subscribe Our Newsletter
              </h2>

              <p className="mt-3 text-gray-300">
                Get travel tips, exclusive offers and
                the latest luxury stays directly to your inbox.
              </p>

            </div>

            <form className="flex flex-col gap-4 sm:flex-row">

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-gray-300 outline-none"
              />

              <button
                className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold transition hover:bg-green-700"
              >
                <Send size={18} />
                Subscribe
              </button>

            </form>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-center text-sm text-gray-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} StayNest.
            All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="#"
              className="hover:text-green-400"
            >
              Privacy
            </Link>

            <Link
              href="#"
              className="hover:text-green-400"
            >
              Terms
            </Link>

            <Link
              href="#"
              className="hover:text-green-400"
            >
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;