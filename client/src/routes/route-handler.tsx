import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import { protectedLoader } from "@/loaders/protectedLoader";
import { signupProtectedLoader } from "@/loaders/semiProtectedLoader";
import CenteredCardSkeleton from "@/components/skeletons/CenteredCardSkeleton";

const AuthFlow = lazy(() => import("@/pages/AuthFlow"));
const SignupDetails = lazy(() => import("@/pages/SignupDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
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
