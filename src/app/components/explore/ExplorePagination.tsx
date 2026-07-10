"use client";

interface Props {
  currentPage:number;
  totalPages:number;
  setCurrentPage:(page:number)=>void;
}


export default function ExplorePagination({
 currentPage,
 totalPages,
 setCurrentPage

}:Props){


 return (

 <div className="mt-10 flex justify-center gap-2">


 {
 Array.from(
 {length:totalPages},
 (_,i)=>i+1
 )
 .map(page=>(


 <button

 key={page}

 onClick={()=>setCurrentPage(page)}

 className={`rounded-lg px-4 py-2 ${
 currentPage===page
 ?"bg-black text-white"
 :"bg-gray-200"
 }`}
 >

 {page}

 </button>


 ))

 }


 </div>

 );


}