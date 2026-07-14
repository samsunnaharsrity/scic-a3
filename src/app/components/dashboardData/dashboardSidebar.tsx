"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Hotel,
  CalendarDays,
  CreditCard,
  MessageSquare,
  Settings,
  BarChart3,
  User,
  Heart,
  LogOut,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import app from "../../../../server/src/app";
import { signOut } from "@/lib/auth-client";

interface UserProps {
  role?: "admin" | "user" | string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface DashboardSidebarProps {
  user?: UserProps | { user: UserProps } | any; 
  session?: any;
  onLogout?: () => Promise<void> | void; 
}

interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const adminMenu: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Manage Stays", href: "/dashboard/admin/stays", icon: Hotel },
  { label: "Bookings", href: "/dashboard/admin/bookings", icon: CalendarDays },
  { label: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
  { label: "Reviews", href: "/dashboard/admin/reviews", icon: MessageSquare },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const userMenu: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/user/profile", icon: User },
  { label: "My Bookings", href: "/dashboard/user/bookings", icon: CalendarDays },
  { label: "Wishlist", href: "/dashboard/user/wishlist", icon: Heart },
  { label: "Reviews", href: "/dashboard/user/reviews", icon: MessageSquare },
  { label: "Transactions", href: "/dashboard/user/transactions", icon: CreditCard },
];

export default function DashboardSidebar({ user, session, onLogout }: DashboardSidebarProps) {
const [appName, setAppName] = useState("StayNest");

  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoggingOut, startLogoutTransition] = useTransition();

 
  const baseData = session || user;
  const userData = baseData?.user ? baseData.user : baseData;
  

  const rawRole = userData?.role || "user";
  const role = String(rawRole).toLowerCase().trim(); 
  
  const name = userData?.name || "Guest User";
  const email = userData?.email || "No email connected";
  const image = userData?.image;

  //   console.log("session:", session);
  // console.log("user:", session.user);
  // console.log("userData:", userData);
  // console.log("role:", role);

  const menus = role === "admin" ? adminMenu : userMenu;

const handleLogout = async () => {
    startLogoutTransition(async () => {
      try {
        if (onLogout) {

          await onLogout();
        } else {
          await signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login");
                router.refresh();
              },
            },
          });
        }
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setOpen(false);
      }
    });
  };


  useEffect(() => {
  const fetchSettings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings`
      );

      const data = await res.json();

      if (data.success) {
        setAppName(data.data.siteName || "StayNest");
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchSettings();
}, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle Sidebar"
        className="fixed bottom-6 right-6 z-50 rounded-xl bg-green-950 p-3 text-white shadow-xl transition-transform hover:scale-105 active:scale-95 lg:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop Overlay for Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Layout CONTAINER */}
      <aside
        className={`fixed left-0 top-0 lg:top-20 z-40 flex h-full lg:h-[calc(100vh-6rem)] w-72 flex-col border-r bg-white dark:bg-neutral-950 border-slate-100 dark:border-neutral-900 shadow-2xl lg:shadow-none transition-transform duration-300 lg:sticky lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3 border-slate-100 dark:border-neutral-900 shrink-0">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-green-950 dark:text-green-400">
              {appName}
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              {role} workspace
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close Sidebar"
            className="rounded-xl p-2 bg-slate-50 dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-500 dark:text-neutral-400 lg:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Card Profile */}
        <div className="border-b p-3 border-slate-100 dark:border-neutral-900 bg-slate-50/50 dark:bg-neutral-900/20 shrink-0">
          <div className="flex items-center gap-3.5">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-green-900/10 dark:ring-green-400/20"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-800 to-green-950 text-base font-bold text-white shadow-md">
                {name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="overflow-hidden">
              <h3 className="truncate font-semibold text-slate-900 dark:text-white text-sm">
                {name}
              </h3>
              <p className="truncate text-xs text-slate-400 dark:text-neutral-500 mb-1">
                {email}
              </p>
              <span className="inline-flex rounded-md bg-green-900/10 dark:bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-900 dark:text-green-400">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar min-h-0">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
            Navigation
          </p>

          <nav className="space-y-1 pb-6">
            {menus.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-green-950 dark:bg-green-700 text-white shadow-md font-semibold"
                      : "text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-900/50 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-slate-400 dark:text-neutral-500 group-hover:text-slate-700 dark:group-hover:text-neutral-300"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="border-t px-4 border-slate-100 dark:border-neutral-900 shrink-0 bg-white dark:bg-neutral-950">
<button
  type="button"
  disabled={isLoggingOut}
  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
  onClick={handleLogout}
>
  <LogOut size={18} className={isLoggingOut ? "animate-spin" : ""} />
  <span>{isLoggingOut ? "Signing Out..." : "Logout"}</span>
</button>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-2 text-center border-slate-100 dark:border-neutral-900 bg-slate-50/30 dark:bg-neutral-900/10 shrink-0">
          <p className="text-[11px] font-medium text-slate-400 dark:text-neutral-500">
            © {new Date().getFullYear()} StayNest LLC.
          </p>
          <p className="text-[9px] font-bold text-slate-300 dark:text-neutral-700 tracking-wider uppercase mt-0.5">
            Hotel Management Console
          </p>
        </div>
      </aside>
    </>
  );
}