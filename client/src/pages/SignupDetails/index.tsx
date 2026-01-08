import CenteredCardSkeleton from "@/components/skeletons/CenteredCardSkeleton";
import RegisterOutlet from "@/layouts/RegisterOutlet";
import { lazy, Suspense } from "react";

const ProfileSetup = lazy(() => import("@/components/ProfileSetup"));

const SignupDetails = () => {
  return (
    <RegisterOutlet>
      <Suspense fallback={<CenteredCardSkeleton />}>
        <ProfileSetup />
      </Suspense>
    </RegisterOutlet>
  );
};

export default SignupDetails;
