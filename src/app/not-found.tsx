"use client";

import Link from "next/link";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 mt-20 bg-slate-50">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm border border-slate-100">
        
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-6">
          <AlertTriangle size={32} />
        </div>

        {/* Content */}
        <h1 className="text-6xl font-black text-green-950">404</h1>
        <h2 className="mt-2 text-xl font-bold text-slate-800">Page not found</h2>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900 active:scale-95"
          >
            <Home size={16} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
          © {new Date().getFullYear()} StayNest
        </p>
      </div>
    </main>
  );
}