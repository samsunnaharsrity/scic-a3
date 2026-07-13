"use client";

import { Search, Eye, Pencil, Trash2, Loader2, Plus, X, Hotel, MapPin, DollarSign } from "lucide-react";
import { useState, useEffect, useTransition } from "react";

interface Stay {
  id: string | number;
  title: string;
  location: string;
  price: number;
  type: string;
  status: "Available" | "Booked" | string;
  image?: string;
}

export default function ManageStaysPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "Hotel",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API Base URL Fallback
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch Stays
// Fetch Stays
useEffect(() => {
  async function fetchStays() {
    try {
      setLoading(true);
      setApiError(null);
      
      const response = await fetch(`${baseUrl}/api/stays`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      

      if (result.success && Array.isArray(result.data)) {
        const formattedData = result.data.map((s: any) => ({
          id: s._id?.$oid || s.id || s._id,
          title: s.title || "Untitled Stay",
          location: s.location || "Unknown Location",
          price: Number(s.price) || 0,
          type: s.type || "Hotel",
          status: s.available !== false ? "Available" : "Booked",
          image: s.image || "",
        }));
        
        setStays(formattedData);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (error: any) {
      console.error("Failed to fetch stays:", error);
      setApiError(error.message || "Failed to load stays. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  }
  fetchStays();
}, [baseUrl]);

  // Handle Add Stay Submit
  const handleAddStay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/api/admin/stays`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          price: Number(formData.price),
          type: formData.type,
          image: formData.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945", // default fallback image
          available: true,
        }),
      });

      if (response.ok) {
        const newStay = await response.json();
        
        setStays((prev) => [
          ...prev,
          {
            id: newStay._id?.$oid || newStay.id || newStay._id,
            title: newStay.title,
            location: newStay.location,
            price: newStay.price,
            type: newStay.type,
            status: "Available",
            image: newStay.image,
          },
        ]);

        setFormData({ title: "", location: "", price: "", type: "Hotel", image: "" });
        setIsOpen(false);
        alert("Stay added successfully!");
      } else {
        alert("Failed to add stay");
      }
    } catch (error) {
      console.error("Error adding stay:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Stay
  const handleDeleteStay = async (stayId: string | number) => {
    if (!confirm("Are you sure you want to delete this stay?")) return;

    startTransition(async () => {
      try {
        const response = await fetch(`${baseUrl}/api/admin/stays/${stayId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setStays((prevStays) => prevStays.filter((s) => s.id !== stayId));
        } else {
          alert("Failed to delete stay");
        }
      } catch (error) {
        console.error("Error deleting stay:", error);
      }
    });
  };

  const filteredStays = stays.filter(
    (stay) =>
      stay.title?.toLowerCase().includes(search.toLowerCase()) ||
      stay.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 mt-20 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Stays</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            View, add, and manage all hotel rooms and stay listings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stays or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </div>

          {/* Add Stay Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-5 rounded-xl transition-colors shadow-sm"
          >
            <Plus size={18} />
            Add Stay
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-gray-700 dark:text-neutral-300">
            <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white text-sm">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Stay Info</th>
                <th className="px-6 py-4 text-left font-semibold">Location</th>
                <th className="px-6 py-4 text-left font-semibold">Type</th>
                <th className="px-6 py-4 text-left font-semibold">Price / Night</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-green-600" />
                    <p className="mt-2 text-sm text-gray-500">Loading stays...</p>
                  </td>
                </tr>
              ) : apiError ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-red-500 font-medium">
                    {apiError}
                  </td>
                </tr>
              ) : (
                filteredStays.map((stay) => (
                  <tr key={stay.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-gray-100">
                          {stay.image ? (
                            <img src={stay.image} alt={stay.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400"><Hotel size={18} /></div>
                          )}
                        </div>
                        <span className="truncate max-w-[180px]">{stay.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{stay.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium">
                        {stay.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${stay.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        stay.status?.toLowerCase() === "available"
                          ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}>
                        {stay.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 dark:bg-neutral-800 dark:text-blue-400 dark:hover:bg-neutral-700 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="rounded-lg bg-amber-50 p-2 text-amber-600 hover:bg-amber-100 dark:bg-neutral-800 dark:text-amber-400 dark:hover:bg-neutral-700 transition-colors">
                          <Pencil size={16} />
                        </button>
                        <button
                          disabled={isPending}
                          onClick={() => handleDeleteStay(stay.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 dark:bg-neutral-800 dark:text-red-400 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {!loading && !apiError && filteredStays.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-neutral-400">
                    No stays found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/*  ADD STAY MODAL  */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-4 dark:border-neutral-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Stay</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStay} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Title / Name</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                  placeholder="e.g. Luxury Ocean View Suite"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                  placeholder="e.g. Cox's Bazar, Bangladesh"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Price per Night ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                    placeholder="99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Resort">Resort</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4 mt-6 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Save Stay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}