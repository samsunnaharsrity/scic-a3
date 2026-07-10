"use client";


import {
Star,
User
} from "lucide-react";
import { useEffect, useState } from "react";



interface Props{

placeId:string;

}



export default function ReviewSection({
    placeId
}:Props){
    
    
    interface Review {
        _id: string;
        userName: string;
        rating: number;
        comment: string;
    }


const [reviews, setReviews] = useState<Review[]>([]);


useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${placeId}`
      );

      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  fetchReviews();
}, [placeId]);



return (

<div className="space-y-5">


{/* Rating Summary */}

<div className="border rounded-xl p-6">


<h3 className="text-xl font-bold">
Overall Rating
</h3>


<div className="flex items-center gap-2 mt-3">


<Star
fill="orange"
className="text-orange-500"
/>


<span className="text-2xl font-bold">
4.8
</span>


<span className="text-gray-500">
/ 5
</span>


</div>


</div>







{/* Reviews */}


{

reviews.map((review,index)=>(


<div
key={index}
className="
border rounded-xl p-5
"
>


<div className="flex items-center gap-3">


<div className="bg-gray-200 p-2 rounded-full">

<User size={18}/>

</div>


<div>

<h4 className="font-semibold">
{review.userName}
</h4>


<div className="flex">

{
Array.from({
length:5
}).map((_,i)=>(


<Star

key={i}

size={16}

fill={
i < review.rating
?
"orange"
:
"none"
}

className={
i < review.rating
?
"text-orange-500"
:
"text-gray-300"
}

/>


))
}


</div>


</div>


</div>





<p className="mt-4 text-gray-600">

{review.comment}

</p>



</div>


))


}



</div>

);

}