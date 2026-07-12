import { Suspense } from "react";
import ExploreSection from "./exploreSec";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading components...</div>}>
      <ExploreSection />
    </Suspense>
  );
}