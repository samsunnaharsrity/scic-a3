import CommentSection from "@/app/components/commentSec";
import PlaceActions from "@/app/components/PlaceActions";

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  // এখানে আপনার প্লেসের ডাটা ডাটাবেজ থেকে ফেচ করবেন...
  const placeData = {
    _id: params.id,
    placeName: "Cox's Bazar Beach",
    imageUrl: "https://example.com/cox.jpg",
    category: "Beach"
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ১. সেভ এবং রিলেটেড আইটেম সেকশন */}
      <PlaceActions 
        placeId={placeData._id} 
        placeName={placeData.placeName} 
        imageUrl={placeData.imageUrl} 
        category={placeData.category}
      />

      {/* ২. কমেন্ট সেকশন (আপনার আগের কোড) */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews & Comments</h3>
        <CommentSection placeId={placeData._id} />
      </div>
    </div>
  );
}