import { lazy, Suspense, useState } from "react";
import RegisterOutlet from "@/layouts/RegisterOutlet";
import CenteredCardSkeleton from "@/components/skeletons/CenteredCardSkeleton";

const OTPVerify = lazy(() => import("@/components/OTPVerify"));
const AuthInput = lazy(() => import("@/components/AuthInput"));

const AuthFlow = () => {
  const [next, setNext] = useState(false);

  return (
    <RegisterOutlet>
      <Suspense fallback={<CenteredCardSkeleton />}>
        {next ? (
          <OTPVerify back={() => setNext(false)} />
        ) : (
          <AuthInput forward={() => setNext(true)} />
        )}
      </Suspense>
    </RegisterOutlet>
  );
};

export default AuthFlow;
