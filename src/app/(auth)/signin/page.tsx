import { Suspense } from "react";
import SigninPage from "./signinPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninPage />
    </Suspense>
  );
}