import HydrateFallbackDashboard from "@/components/Dashboard/HydrateFallback";
import CenteredCardSkeleton from "@/components/skeletons/CenteredCardSkeleton";
import Layout from "@/layouts/Layout";
import { RoomLayout } from "@/layouts/RoomLayout";
import { protectedLoader } from "@/loaders/protectedLoader";
import { signupProtectedLoader } from "@/loaders/semiProtectedLoader";
import { verifyRoomLoader } from "@/loaders/verifyRoomLoader";
import Home from "@/pages/Home";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

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
        loader: protectedLoader(verifyRoomLoader),
        Component: RoomLayout,
        children: [
          {
            index: true,
            Component: Room,
          },
        ],
      },
    ],
  },
]);

export { router };
