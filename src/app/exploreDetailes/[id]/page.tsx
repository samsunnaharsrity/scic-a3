import CommentSection from "@/app/components/commentSec";
import ImageGallery from "@/app/components/ImageGallery";
import RelatedPlaces from "@/app/components/reletedPlace";
import ReviewSection from "@/app/components/reviewSection";
import SaveButton from "@/app/components/SaveButton";
import { MapPin, Star, Calendar, Clock, DollarSign } from "lucide-react";

interface Place {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  location: string;

  image?: string;
  images?: string[];

  duration?: string;
  date?: string;
  bestTime?: string;
  availability?: string;

  reviewCount?: number;

  specifications?: {
    label: string;
    value: string;
  }[];
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getPlace(id: string): Promise<Place | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    console.error("❌ NEXT_PUBLIC_API_URL is not defined in environment variables.");
    return null;
  }

  const url = `${baseUrl}/api/explore/${id}`;
  
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`❌ Fetch failed with status: ${res.status}`);
      return null;
    }

    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("❌ Error fetching place details:", error);
    return null;
  }
}

export default async function DetailsPage({ params }: Props) {
  const { id } = await params;
  const place = await getPlace(id);

  if (!place) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">Place Not Found</h2>
        <p className="text-gray-500">The destination you are looking for does not exist or has been removed.</p>
      </div>
    );
  }


  const galleryImages = place.images && place.images.length > 0 
    ? place.images 
    : place.image 
      ? [place.image] 
      : ["/fallback-image.jpg"];
  return (
    <div className="mx-auto mt-20 max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      
      {/* Gallery Section */}
      <ImageGallery images={galleryImages} />

      {/* Header Section */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {place.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <MapPin size={18} className="text-gray-400" />
              {place.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={18} fill="currentColor" className="text-amber-500" />
              <span className="font-semibold text-gray-900">{place.rating}</span> ({place.reviewCount} Reviews)
            </span>
            {place.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={18} className="text-gray-400" />
                {place.date}
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <SaveButton placeId={place._id} />
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        
        {/* Left Side: Descriptions & Details */}
        <div className="space-y-10 lg:col-span-2">
          
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Description</h2>
            <p className="mt-4 text-base leading-7 text-gray-600 whitespace-pre-line">
              {place.description}
            </p>
          </section>

          {/* Key Information / Specifications */}
          <section className="rounded-2xl border border-gray-200 p-6 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key Information / Specifications</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> 
                <span className="font-medium text-gray-900">Best Time:</span> {place.bestTime || "Year-round"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> 
                <span className="font-medium text-gray-900">Location:</span> {place.location}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> 
                <span className="font-medium text-gray-900">Category:</span> {place.category}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> 
                <span className="font-medium text-gray-900">Availability:</span> Instant Booking Available
              </li>
            </ul>
          </section>

        </div>

        {/* Right Side: Quick Overview Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-2xl border border-gray-200 p-6 shadow-sm bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Quick Overview</h2>
            <div className="space-y-4">
              
              <div className="flex items-center gap-4 rounded-xl p-3 bg-gray-50">
                <div className="rounded-lg bg-white p-2 shadow-sm text-blue-600"><Clock size={20} /></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase">Duration</p>
                  <p className="text-sm font-semibold text-gray-800">{place.duration || "Flexible"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl p-3 bg-gray-50">
                <div className="rounded-lg bg-white p-2 shadow-sm text-emerald-600"><DollarSign size={20} /></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase">Est. Price</p>
                  <p className="text-sm font-semibold text-gray-800">${place.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl p-3 bg-gray-50">
                <div className="rounded-lg bg-white p-2 shadow-sm text-purple-600"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase">Category</p>
                  <p className="text-sm font-semibold text-gray-800">{place.category}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Full-Width Sections */}
      <div className="mt-16 space-y-16 border-t border-gray-200 pt-12">
        {/* Reviews */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
          <ReviewSection placeId={place._id} />
        </section>

        {/* Comments */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
          <CommentSection placeId={place._id} />
        </section>

        {/* Related Items */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Items</h2>
          <RelatedPlaces category={place.category} />
        </section>
      </div>

    </div>
  );
}