"use client";

import { Search, Eye, Pencil, Trash2, Loader2, Plus, X, Hotel, MapPin } from "lucide-react";
import { useState, useEffect, useTransition } from "react";

interface Stay {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  description: string;
  image?: string;
  badge?: string;
  date?: string;
  status: "Available" | "Booked" | string;
}

export default function ManageStaysPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);


  // IMAGE UPLOAD
  const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.data.url;
};

  // Modal & Edit State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStayId, setSelectedStayId] = useState<string | null>(null);
  const [viewStay, setViewStay] = useState<Stay | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "Hotel",
    image: "",
    description: "",
    badge: "Nature",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch Stays
  useEffect(() => {
    async function fetchStays() {
      try {
        setLoading(true);
        setApiError(null);
        
        const response = await fetch(`${baseUrl}/api/explore`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          const formattedData = result.data.map((s: any) => ({
            id: s._id || s.id,
            title: s.title,
            location: s.location,
            description: s.description || "",
            price: Number(s.price) || 0,
            type: s.type || "Hotel",
            badge: s.badge,
            date: s.date,
            status: s.available !== false ? "Available" : "Booked",
            image: s.image || "",
          }));
          
          setStays(formattedData);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (error: any) {
        console.error("Failed to fetch stays:", error);
        setApiError(error.message || "Failed to load stays.");
      } finally {
        setLoading(false);
      }
    }
    fetchStays();
  }, [baseUrl]);

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedStayId(null);
    setFormData({ title: "", location: "", price: "", type: "Hotel", image: "" ,description: "",  badge: "Popular",
  date: "",
});
    setIsOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (stay: Stay) => {
    setIsEditMode(true);
    setSelectedStayId(stay.id);
    setFormData({
      title: stay.title,
      location: stay.location,
      price: stay.price.toString(),
      type: stay.type,
      image: stay.image || "",
      description: stay.description,
      badge: "Popular",
      date: "",
    });
    setIsOpen(true);
  };

  // Form Submit (Add or Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

  let imageUrl = "";

  if (imageFile) {
    imageUrl = await uploadImage(imageFile);
  }

   const url = isEditMode
  ? `${baseUrl}/api/stays/${selectedStayId}`
  : `${baseUrl}/api/stays`;
    
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          description: formData.description,
          price: Number(formData.price),
          type: formData.type,
          image: imageUrl ||
          formData.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          badge: formData.badge,
          date: formData.date,
          available: true,
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        const updatedStayObj = {
          id: resData._id || resData.id,
          title: resData.title,
          location: resData.location,
          description: resData.description || formData.description,
          price: resData.price,
          type: resData.type,
          status: resData.available !== false ? "Available" : "Booked",
          image: resData.image,
        };

        if (isEditMode) {
          setStays((prev) => prev.map((s) => (s.id === selectedStayId ? updatedStayObj : s)));
          alert("Stay updated successfully!");
        } else {
          setStays((prev) => [...prev, updatedStayObj]);
          alert("Stay added successfully!");
        }

        setIsOpen(false);
      } else {
        alert(isEditMode ? "Failed to update stay" : "Failed to add stay");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Stay
  const handleDeleteStay = async (stayId: string) => {
    if (!confirm("Are you sure you want to delete this stay?")) return;

    startTransition(async () => {
      try {
        const response = await fetch(`${baseUrl}/api/stays/${stayId}`, {
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
          <p className="mt-1 text-gray-500 dark:text-gray-400">View, add, and manage all hotel rooms and stay listings.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
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

          <button
            onClick={handleOpenAddModal}
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
                  <td colSpan={6} className="py-12 text-center text-red-500 font-medium">{apiError}</td>
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
                      <span className="rounded-full bg-slate-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium">{stay.type}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${stay.price}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        stay.status?.toLowerCase() === "available" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>{stay.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => setViewStay(stay)} className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => handleOpenEditModal(stay)} className="rounded-lg bg-amber-50 p-2 text-amber-600 hover:bg-amber-100">
                          <Pencil size={16} />
                        </button>
                        <button disabled={isPending} onClick={() => handleDeleteStay(stay.id)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 disabled:opacity-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT STAY MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b pb-4 sticky top-0 bg-white dark:bg-neutral-900 z-10">
            <h2 className="text-xl font-bold">{isEditMode ? "Edit Stay details" : "Add New Stay"}</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
          </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Title / Name</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="mt-1 w-full rounded-xl border p-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="mt-1 w-full rounded-xl border p-3 text-sm" />
              </div>

              <div>
  <label className="block text-sm font-medium">Description</label>
  <textarea 
    required 
    value={formData.description} 
    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
    className="mt-1 w-full rounded-xl border p-3 text-sm h-24"
    placeholder="Enter property description..."
  />
</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Price per Night ($)</label>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="mt-1 w-full rounded-xl border p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="mt-1 w-full rounded-xl border p-3 text-sm">
                    <option value="Hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Resort">Resort</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
              </div>

<div>
  <label className="block text-sm font-medium">Badge</label>

<select
  value={formData.badge}
  onChange={(e) =>
    setFormData({ ...formData, badge: e.target.value })
  }
>
  <option value="Beaches">Beaches</option>
  <option value="Mountains">Mountains</option>
  <option value="Historical">Historical</option>
  <option value="Cities">Cities</option>
  <option value="Nature">Nature</option>
  <option value="Camping">Camping</option>
  <option value="Photography">Photography</option>
  <option value="Island">Island</option>
</select>
</div>

<div>
  <label className="block text-sm font-medium">
    Available Date
  </label>

  <input
    type="date"
    value={formData.date}
    onChange={(e) =>
      setFormData({ ...formData, date: e.target.value })
    }
    className="mt-1 w-full rounded-xl border p-3 text-sm"
  />
</div>



<div>
  <label className="block text-sm font-medium">Image URL</label>

  <input
    type="url"
    placeholder="https://i.ibb.co/xxxx/image.jpg"
    value={formData.image}
    onChange={(e) =>
      setFormData({ ...formData, image: e.target.value })
    }
    className="mt-1 w-full rounded-xl border p-3 text-sm"
  />
</div>

              <div className="flex justify-end gap-3 border-t pt-4 mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border px-4 py-2.5 text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Save Stay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewStay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold">Stay Information</h2>
              <button onClick={() => setViewStay(null)} className="text-gray-500"><X size={20} /></button>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Title:</span>
                <span className="font-medium">{viewStay.title}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Location:</span>
                <span className="font-medium">{viewStay.location}</span>
              </div>

<div className="py-2 border-b">
  <span className="text-gray-500 block text-sm">Description:</span>
  <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{viewStay.description}</p>
</div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium">{viewStay.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Price / Night:</span>
                <span className="font-medium">${viewStay.price}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Status:</span>
                <span className={`font-semibold ${viewStay.status === "Available" ? "text-green-600" : "text-amber-600"}`}>{viewStay.status}</span>
              </div>
            </div>
            <div className="flex justify-end border-t pt-4 mt-6">
              <button onClick={() => setViewStay(null)} className="rounded-xl bg-gray-100 px-5 py-2 text-sm font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}