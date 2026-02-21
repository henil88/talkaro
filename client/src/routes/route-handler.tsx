import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import { protectedLoader } from "@/loaders/protectedLoader";
import { signupProtectedLoader } from "@/loaders/semiProtectedLoader";
import CenteredCardSkeleton from "@/components/skeletons/CenteredCardSkeleton";
import HydrateFallbackDashboard from "@/components/Dashboard/HydrateFallback";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AuthFlow = lazy(() => import("@/pages/AuthFlow"));
const SignupDetails = lazy(() => import("@/pages/SignupDetails"));
const Profile = lazy(() => import("@/components/Profile"));
const Room = lazy(() => import("@/pages/Room"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    HydrateFallback: () => <div />,
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
        HydrateFallback: HydrateFallbackDashboard,
        Component: Dashboard,
      },
      {
        path: "/profile",
        loader: protectedLoader(),
        Component: Profile,
      },
      {
        path: "/room/:roomId",
        // also we need to check if the room even exist or not
        loader: protectedLoader(),
        Component: Room,
      },
    ],
  },
]);

export { router };
