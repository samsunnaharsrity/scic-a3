import CommentSection from "@/app/components/commentSec";
import PlaceActions from "@/app/components/PlaceActions";

export default function PlaceDetailPage({ params }: { params: { id: string } }) {

  const placeData = {
    _id: params.id,
    placeName: "Cox's Bazar Beach",
    imageUrl: "https://example.com/cox.jpg",
    category: "Beach"
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <PlaceActions 
        placeId={placeData._id} 
        placeName={placeData.placeName} 
        imageUrl={placeData.imageUrl} 
        category={placeData.category}
      />

      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews & Comments</h3>
        <CommentSection placeId={placeData._id} />
      </div>
    </div>
  );
}