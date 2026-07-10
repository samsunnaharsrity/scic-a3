"use client";


import Image from "next/image";
import Link from "next/link";



interface Props{

category:string;

}



const relatedPlaces=[

{
id:"1",
title:"Cox's Bazar",
image:
"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
location:"Bangladesh",
rating:4.7
},


{
id:"2",
title:"Sundarbans",
image:
"https://images.unsplash.com/photo-1516690561799-46d8f74f9abf",
location:"Khulna",
rating:4.8
},


{
id:"3",
title:"Bandarban",
image:
"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
location:"Chittagong",
rating:4.6
}


];




export default function RelatedPlaces({
category
}:Props){



return (

<div className="grid md:grid-cols-3 gap-6">


{

relatedPlaces.map(place=>(


<Link

key={place.id}

href={`/explore/${place.id}`}

className="
border
rounded-2xl
overflow-hidden
hover:shadow-xl
transition
"


>


<div className="relative h-52">


<Image

src={place.image}

alt={place.title}

fill

className="object-cover"

/>


</div>





<div className="p-5">


<h3 className="font-bold text-xl">

{place.title}

</h3>



<p className="text-gray-500 mt-2">

{place.location}

</p>




<div className="flex items-center gap-2 mt-3">


<span>
⭐
</span>


<span>
{place.rating}
</span>


</div>




<p className="text-sm text-gray-400 mt-2">

{category}

</p>



</div>



</Link>


))

}



</div>

);

}