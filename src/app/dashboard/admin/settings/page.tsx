"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Save,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [settings, setSettings] = useState({
    siteName: "",
    email: "",
    phone: "",
    address: "",
    currency: "USD",
    bookingFee: "10",
    emailNotification: true,
    maintenanceMode: false,
  });

  // Load settings from DB
  const loadSettings = async () => {
    try {
      setFetching(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSettings({
          siteName: data.siteName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          currency: data.currency || "USD",
          bookingFee: data.bookingFee || "10",
          emailNotification: data.emailNotification ?? true,
          maintenanceMode: data.maintenanceMode ?? false,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

if (!res.ok) {
  throw new Error("Save failed");
}

await loadSettings();

// Navbar notify 
window.dispatchEvent(new Event("settingsUpdated"));

alert("Settings Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({
    label,
    icon: Icon,
    ...props
  }: any) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-4 top-3.5 text-gray-400"
            size={18}
          />
        )}

        <input
          {...props}
          className={`w-full rounded-xl border p-3 ${
            Icon ? "pl-11" : "px-4"
          }`}
        />
      </div>
    </div>
  );

  if (fetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin" size={35} />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl p-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-blue-600 p-4 text-white">
          <Settings size={30} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            System Configuration
          </h1>

          <p className="text-gray-500">
            Manage your platform settings.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">
            General Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <InputField
              label="Website Name"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">
                Currency
              </label>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              >
                <option>USD</option>
                <option>BDT</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">
            Contact Information
          </h2>

          <div className="space-y-6">
            <InputField
              label="Support Email"
              icon={Mail}
              name="email"
              value={settings.email}
              onChange={handleChange}
            />

            <InputField
              label="Phone"
              icon={Phone}
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />

            <InputField
              label="Address"
              icon={MapPin}
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <button
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}

            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}