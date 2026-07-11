"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Interface for strictly typing form inputs
interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 4000,
    });

    setFormData({ fullName: "", email: "", subject: "", message: "" });
  } catch (error) {
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 4000,
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="bg-white">

      <ToastContainer />

      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center pt-10">
          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            We&apos;d Love to Hear From You
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Have a question, feedback, or partnership inquiry? Send us a
            message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>

          <p className="mt-2 text-gray-500">
            Fill out the form below and our team will contact you.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Your Name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="your.email@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-semibold">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-500 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:bg-amber-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Contact Information
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-gray-500">support@travelguide.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p className="text-gray-500">+880 1712-345678</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-bold">Office</h4>
                  <p className="text-gray-500">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-bold">Working Hours</h4>
                  <p className="text-gray-500">Monday – Friday</p>
                  <p className="text-gray-500">9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-amber-500 p-8 text-white">
            <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-2xl font-bold">Need Immediate Help?</h3>
            <p className="mt-3 text-amber-100">
              Our support team is ready to answer your questions and provide
              assistance whenever you need it.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "How quickly do you respond?",
                a: "Usually within 24 hours during business days.",
              },
              {
                q: "Can I suggest a new travel destination?",
                a: "Yes! We welcome recommendations from our community.",
              },
              {
                q: "Do you provide travel support?",
                a: "We provide travel information and destination guides.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs group"
              >
                <summary className="cursor-pointer font-semibold text-gray-900 list-none flex justify-between items-center group-open:text-amber-600 transition">
                  {item.q}
                  <span className="transition group-open:rotate-180">👇</span>
                </summary>
                <p className="mt-3 text-gray-500 border-t pt-3 border-gray-100">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}