"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ImageGallery({ images }: Props) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="space-y-4">

      {/* Main Image */}
      <div className="relative h-[500px] overflow-hidden rounded-2xl">
        <Image
          src={selected}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Images */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 4).map((img, index) => (
          <button
            key={index}
            onClick={() => setSelected(img)}
            className={`relative h-28 overflow-hidden rounded-xl border-2 ${
              selected === img
                ? "border-blue-600"
                : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
}