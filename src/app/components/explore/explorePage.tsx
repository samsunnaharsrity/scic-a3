"use client";

import {useEffect,useState} from "react";
import ExploreCard from "./ExploreCard";
import ExplorePagination from "./ExplorePagination";
import ExploreSkeleton from "./ExploreSkeleton";
import ExploreFilters from "./exploreFilters";


export default function ExplorePage(){


const [places,setPlaces]=useState<any[]>([]);
const [loading,setLoading]=useState(true);


const [search,setSearch]=useState("");
const [category,setCategory]=useState("");
const [location,setLocation]=useState("");
const [price,setPrice]=useState("");
const [rating,setRating]=useState("");
const [sort,setSort]=useState("");



const [currentPage,setCurrentPage]=useState(1);


const limit=6;



useEffect(()=>{


fetch(
process.env.NEXT_PUBLIC_API_URL+`/api/places?page=${currentPage}&limit=${limit}`
)

.then(res=>res.json())

.then(data=>{

setPlaces(data.items || []);

setLoading(false);

})


},[currentPage]);





const filteredPlaces=places.filter(place=>{


return (

place.name
.toLowerCase()
.includes(search.toLowerCase())

&&

(category ? place.category===category:true)

&&

(location ? place.location===location:true)

&&

(rating ? place.rating>=Number(rating):true)

)


});



if(loading)
return <ExploreSkeleton/>;



return (

<div>


<ExploreFilters


search={search}
setSearch={setSearch}

category={category}
setCategory={setCategory}

location={location}
setLocation={setLocation}

price={price}
setPrice={setPrice}

rating={rating}
setRating={setRating}

sort={sort}
setSort={setSort}

/>



<div className="mt-10 grid gap-6 md:grid-cols-3">


{
filteredPlaces.map(place=>(

<ExploreCard

key={place._id}

place={place}

/>

))
}


</div>



<ExplorePagination

currentPage={currentPage}

totalPages={5}

setCurrentPage={setCurrentPage}

/>


</div>

)


}