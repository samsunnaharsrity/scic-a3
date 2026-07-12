"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Search,
  Shapes,
  Images,
  ImagePlus,
  ShoppingBag,
  SlidersHorizontal,
  User,
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Shield,
  Settings,
  MessageSquare,
  FilePenLine,
  Receipt,
  ArrowUpDown,
  X,
  LucideIcon
} from "lucide-react";

import {
  Button,
  TextField,
  InputGroup,
  Slider,
  Select,
  Label,
  ListBox,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";

// Types Definitions
interface UserProps {
  role: "user" | "admin";
  name?: string;
  email?: string;
  image?: string;
}

interface DashboardSidebarProps {
  user: UserProps;
}

interface CategoryItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SortOption {
  id: string;
  label: string;
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 5000];
const DEFAULT_SORT = "newest";

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("q") || "");
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice")) || DEFAULT_PRICE_RANGE[0],
    Number(searchParams.get("maxPrice")) || DEFAULT_PRICE_RANGE[1],
  ]);
  const [sortValue, setSortValue] = useState<string>(
    searchParams.get("sort") || DEFAULT_SORT
  );

  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);


const adminCategories: CategoryItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Manage Stays",
    href: "/dashboard/admin/stays",
    icon: Images,
  },
  {
    label: "Bookings",
    href: "/dashboard/admin/bookings",
    icon: ShoppingBag,
  },
  {
    label: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: Receipt,
  },
  {
    label: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Reviews",
    href: "/dashboard/admin/reviews",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

const userCategories: CategoryItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/dashboard/user/profile",
    icon: User,
  },
  {
    label: "My Bookings",
    href: "/dashboard/user/bookings",
    icon: ShoppingBag,
  },
  {
    label: "Wishlist",
    href: "/dashboard/user/wishlist",
    icon: Shapes,
  },
  {
    label: "Reviews",
    href: "/dashboard/user/reviews",
    icon: FilePenLine,
  },
  {
    label: "Transactions",
    href: "/dashboard/user/transactions",
    icon: Receipt,
  },
];

  const categoriesMap: Record<"user" | "admin", CategoryItem[]> = {
    user: userCategories,
    admin: adminCategories,
  };

  const categories = categoriesMap[user?.role] || userCategories;

  const sortOptions: SortOption[] = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
  ];

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value) || 0, priceRange[1]);
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value) || 0, priceRange[0]);
    setPriceRange([priceRange[0], val]);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    params.set("minPrice", String(priceRange[0]));
    params.set("maxPrice", String(priceRange[1]));
    params.set("sort", sortValue);

    router.push(`${pathname}?${params.toString()}`);
    setShowMobileSidebar(false); // ক্লোজ মোবাইল ড্রয়ার অন অ্যাপ্লাই
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSortValue(DEFAULT_SORT);
    router.push(pathname);
    setShowMobileSidebar(false);
  };

  // সাব-কম্পোনেন্ট টাইপ সেফ ভিউ
  const SidebarContent = () => (
    <div className="space-y-7 dark:bg-black dark:text-white/70">
      {/* Heading */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-900/10">
          <SlidersHorizontal size={17} className="text-green-900" />
        </div>
        <div>
          <h2 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
            Filters
          </h2>
          <p className="text-xs text-slate-500">Find your perfect artwork</p>
        </div>
      </div>

      {/* Search */}
      <TextField>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Search
        </Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Search size={16} className="text-slate-400" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Search artwork..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="h-10 rounded-xl"
          />
        </InputGroup>
      </TextField>

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-green-900/10 text-green-900 dark:text-green-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-white/60 dark:hover:bg-neutral-900"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-green-900 dark:bg-green-400 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon
                  size={17}
                  className={isActive ? "text-green-900 dark:text-green-400" : "text-slate-400 group-hover:text-slate-600"}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Price Range
        </h3>

        <Slider
          aria-label="Artwork price range"
          value={priceRange}
          onChange={(value: number | number[]) => setPriceRange(value as number[])}
          minValue={0}
          maxValue={10000}
          step={50}
          className="max-w-full"
        >
          <Slider.Track className="h-1.5 rounded-full bg-slate-200">
            <Slider.Fill className="rounded-full bg-green-900" />
            {priceRange.map((_, i) => (
              <Slider.Thumb
                key={i}
                index={i}
                className="h-4 w-4 rounded-full border-2 border-white bg-green-900 shadow-sm ring-1 ring-green-900/30"
              />
            ))}
          </Slider.Track>
        </Slider>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-slate-400">Min</label>
            <div className="flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5">
              <span className="mr-1 text-xs text-slate-400">$</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={handleMinChange}
                className="w-full bg-transparent text-sm text-slate-700 dark:text-white outline-none"
              />
            </div>
          </div>
          <span className="mt-4 text-slate-300">—</span>
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-slate-400">Max</label>
            <div className="flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5">
              <span className="mr-1 text-xs text-slate-400">$</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={handleMaxChange}
                className="w-full bg-transparent text-sm text-slate-700 dark:text-white outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <Select value={sortValue} onChange={(value: unknown) => setSortValue(value as string)}>
          <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <ArrowUpDown size={13} />
            Sort By
          </Label>
          <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 px-3 text-sm text-slate-700 dark:text-white transition-colors hover:border-slate-300 focus:border-green-900">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-xl border border-slate-200 bg-white dark:bg-neutral-900 shadow-lg">
            <ListBox>
              {sortOptions.map((option) => (
                <ListBox.Item
                  key={option.id}
                  id={option.id}
                  textValue={option.label}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-white/80 data-[hovered]:bg-green-900/10 data-[hovered]:text-green-900 data-[selected]:font-medium data-[selected]:text-green-900"
                >
                  {option.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Apply Button */}
      <div className="space-y-2 pt-1">
        <Button
          slot="close"
          onClick={handleApplyFilters}
          className="h-11 w-full rounded-xl bg-green-900 font-semibold text-white shadow-sm transition-colors hover:bg-green-800"
        >
          Apply Filters
        </Button>
        <button
          type="button"
          onClick={handleResetFilters}
          className="w-full text-center text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          Reset all filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:sticky lg:top-21 lg:block lg:h-[calc(100vh-5.5rem)] lg:w-[260px] lg:shrink-0 xl:w-[300px]">
        <div className="h-full overflow-y-auto border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black p-5 shadow-sm pt-6">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <Button
        onPress={() => setShowMobileSidebar(true)}
        className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full bg-green-900 px-5 text-sm font-semibold text-white shadow-lg lg:hidden"
      >
        <Menu size={17} />
        Filters
      </Button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showMobileSidebar && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-50 h-screen w-[88vw] max-w-sm overflow-y-auto bg-white dark:bg-black shadow-2xl lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 p-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Artwork Filters
                  </h2>
                  <p className="text-xs text-slate-500">
                    Find your perfect artwork
                  </p>
                </div>

                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-neutral-900 text-slate-900 dark:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}