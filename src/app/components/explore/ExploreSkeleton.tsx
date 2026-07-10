export default function ExploreSkeleton(){


return (

<div className="grid gap-6 md:grid-cols-3">


{
Array.from({length:6}).map((_,i)=>(

<div
key={i}
className="animate-pulse rounded-xl bg-gray-200 p-5"
>


<div className="h-52 rounded-lg bg-gray-300"/>


<div className="mt-5 h-5 w-3/4 rounded bg-gray-300"/>


<div className="mt-3 h-4 w-1/2 rounded bg-gray-300"/>


</div>


))

}


</div>

)


}