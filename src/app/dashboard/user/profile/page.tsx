"use client";

import { useDashboard } from "@/app/components/dashboardData/dashboardProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function ProfilePage() {
  const { session, refreshSession } = useDashboard();

  const user = session?.user;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);


  const firstLetter =
    formData.name?.charAt(0)?.toUpperCase() || "U";


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handleUpdate = async () => {
  try {
    setLoading(true);

    const email = encodeURIComponent(user?.email || "");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success) {
      alert("Profile updated successfully");
      await refreshSession();
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="grid gap-8 lg:grid-cols-3 mt-20">

      {/* Profile Card */}
      <div className="rounded-xl border bg-white p-6 shadow">

        <div className="flex flex-col items-center">

          {user?.image ? (
            <Image
              src={user.image}
              alt={formData.name}
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-green-950 text-5xl font-bold text-white">
              {firstLetter}
            </div>
          )}


          <h2 className="mt-4 text-2xl font-bold">
            {formData.name}
          </h2>

          <p className="text-gray-500">
            {formData.email}
          </p>

        </div>

      </div>



      {/* Edit Form */}
      <div className="lg:col-span-2 rounded-xl border bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Edit Profile
        </h2>


        <label className="font-medium">
          Name
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border p-3"
        />


        <label className="mt-4 block font-medium">
          Email
        </label>

        <input
          name="email"
          value={formData.email}
          disabled
          className="mt-2 w-full rounded-lg border bg-gray-100 p-3"
        />


        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-6 flex items-center gap-2 rounded-lg bg-green-950 px-6 py-3 text-white"
        >
          <Save size={18}/>
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>
  );
}