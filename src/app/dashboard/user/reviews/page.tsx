"use client";

import { useDashboard } from "@/app/components/dashboardData/dashboardProvider";
import { useEffect, useState } from "react";
import { Star, MessageSquare } from "lucide-react";


interface Review {

_id:string;
userName:string;
rating:number;
comment:string;
createdAt:string;
}


export default function ReviewsPage(){

const session = useDashboard();

const user = session?.user;


const [reviews,setReviews]=useState<Review[]>([]);


useEffect(()=>{


if(!user?.email) return;


const fetchReviews = async()=>{

const res = await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/user/${user.email}`
);


const data = await res.json();


if(data.success){

setReviews(data.reviews);

}


};


fetchReviews();


},[user]);



return (

<div className="mt-20 space-y-6">


<h1 className="text-3xl font-bold">
My Reviews
</h1>



<div className="rounded-xl border bg-white p-6">


<div className="flex items-center gap-3">

<MessageSquare/>

<h2 className="text-xl font-bold">
Total Reviews: {reviews.length}
</h2>

</div>


</div>




{
reviews.map(review=>(


<div
key={review._id}
className="rounded-xl border bg-white p-6 shadow"
>


<div className="flex gap-1">

{
Array.from({length:5}).map((_,i)=>(

<Star
key={i}
size={18}
className={
i < review.rating
?
"fill-yellow-400 text-yellow-400"
:
"text-gray-300"
}
/>

))
}

</div>



<p className="mt-4 text-gray-700">
{review.comment}
</p>


<p className="mt-2 text-sm text-gray-400">
{review.userName}
</p>


</div>


))
}


</div>

);


}