"use client";

import { Search, Eye, Pencil, Trash2, Loader2, Plus, X } from "lucide-react";
import { useState, useEffect, useTransition } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Blocked" | string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Modal & Form State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`);
        const data = await res.json();

        setUsers(
          (data.users || []).map((u: any) => ({
            id: u._id,
            name: u.name,
            email: u.email,
            role: u.role || "user",
            status: u.banned ? "Blocked" : "Active",
          }))
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Open Modal for Creating User
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setFormData({ name: "", email: "", role: "user" });
    setIsOpen(true);
  };

  // Open Modal for Editing User
  const handleOpenEditModal = (user: User) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsOpen(true);
  };

  // Close Main Modal
  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEditMode(false);
    setSelectedUser(null);
    setFormData({ name: "", email: "", role: "user" });
  };

  // Handle Form Submit (Add or Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${selectedUser?.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          ...(isEditMode ? {} : { banned: false }),
        }),
      });

      if (response.ok) {
        const resData = await response.json();

        if (isEditMode) {
          // Local State
          setUsers((prev) =>
            prev.map((u) =>
              u.id === selectedUser?.id
                ? { ...u, name: formData.name, email: formData.email, role: formData.role }
                : u
            )
          );
          alert("User updated successfully!");
        } else {
          // Local State 
          setUsers((prev) => [
            ...prev,
            {
              id: resData._id || resData.id,
              name: resData.name,
              email: resData.email,
              role: resData.role,
              status: "Active",
            },
          ]);
          alert("User added successfully!");
        }
        handleCloseModal();
      } else {
        alert(isEditMode ? "Failed to update user" : "Failed to add user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete User
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    startTransition(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 mt-20 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            View and manage all registered users in real-time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
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
            Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-gray-700 dark:text-neutral-300">
            <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white text-sm">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-green-600" />
                    <p className="mt-2 text-sm text-gray-500">Loading users...</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role?.toLowerCase() === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status?.toLowerCase() === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setViewUser(user)}
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 dark:bg-neutral-800 dark:text-blue-400 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleOpenEditModal(user)}
                          className="rounded-lg bg-amber-50 p-2 text-amber-600 hover:bg-amber-100 dark:bg-neutral-800 dark:text-amber-400 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          disabled={isPending}
                          onClick={() => handleDeleteUser(user.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 dark:bg-neutral-800 dark:text-red-400 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {!loading && filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 dark:text-neutral-400">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT USER MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-4 dark:border-neutral-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditMode ? "Edit User Details" : "Add New User"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4 mt-6 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (isEditMode ? "Update User" : "Save User")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW USER DETAILS MODAL */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-4 dark:border-neutral-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Information</h2>
              <button onClick={() => setViewUser(null)} className="text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b dark:border-neutral-800">
                <span className="font-medium text-gray-500">ID:</span>
                <span className="text-gray-900 dark:text-white">{viewUser.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b dark:border-neutral-800">
                <span className="font-medium text-gray-500">Name:</span>
                <span className="text-gray-900 dark:text-white">{viewUser.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b dark:border-neutral-800">
                <span className="font-medium text-gray-500">Email:</span>
                <span className="text-gray-900 dark:text-white">{viewUser.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b dark:border-neutral-800">
                <span className="font-medium text-gray-500">Role:</span>
                <span className="capitalize text-gray-900 dark:text-white">{viewUser.role}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-500">Status:</span>
                <span className={`font-semibold ${viewUser.status === "Active" ? "text-green-600" : "text-red-600"}`}>{viewUser.status}</span>
              </div>
            </div>

            <div className="flex justify-end border-t pt-4 mt-6 dark:border-neutral-800">
              <button
                onClick={() => setViewUser(null)}
                className="rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-5 py-2 text-sm font-medium text-gray-700 dark:text-neutral-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}