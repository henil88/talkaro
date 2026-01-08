import { createBrowserRouter } from "react-router";
import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import SignupDetails from "@/pages/SignupDetails";
import AuthFlow from "@/pages/AuthFlow";
import { protectedLoader } from "@/loaders/protectedLoader";
import { signupProtectedLoader } from "@/loaders/semiProtectedLoader";
import CenteredCardSkeleton from "@/components/skeletons/CenteredCardSkeleton";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, HydrateFallback: CenteredCardSkeleton, Component: Home },
      {
        path: "/auth",
        HydrateFallback: CenteredCardSkeleton,
        Component: AuthFlow,
      },
      {
        path: "/signup",
        HydrateFallback: CenteredCardSkeleton,
        loader: signupProtectedLoader(),
        Component: SignupDetails,
      },
      {
        path: "/app",
        loader: protectedLoader(),
        HydrateFallback: () => <div>Loading...</div>,
        element: "Main Dashboard",
      },
    ],
  },
]);

export { router };
