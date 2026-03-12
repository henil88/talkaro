import HydrateFallbackDashboard from "@/components/Dashboard/HydrateFallback";
import CenteredCardSkeleton from "@/components/skeletons/CenteredCardSkeleton";
import Layout from "@/layouts/Layout";
import { RoomLayout } from "@/layouts/RoomLayout";
import { protectedLoader } from "@/loaders/protectedLoader";
import { signupProtectedLoader } from "@/loaders/semiProtectedLoader";
import { verifyRoomLoader } from "@/loaders/verifyRoomLoader";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    HydrateFallback: () => <div />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/auth",
        HydrateFallback: CenteredCardSkeleton,
        lazy: () => import("@/pages/AuthFlow"),
      },
      {
        path: "/signup",
        loader: signupProtectedLoader(),
        HydrateFallback: CenteredCardSkeleton,
        lazy: () => import("@/pages/SignupDetails"),
      },
      {
        path: "/app",
        loader: protectedLoader(),
        HydrateFallback: HydrateFallbackDashboard,
        lazy: () => import("@/pages/Dashboard"),
      },
      {
        path: "/profile",
        loader: protectedLoader(),
        lazy: () => import("@/components/Profile"),
      },
      {
        path: "/room/:roomId",
        loader: protectedLoader(verifyRoomLoader),
        Component: RoomLayout,
        children: [
          {
            index: true,
            lazy: () => import("@/pages/Room"),
          },
        ],
      },
    ],
  },
]);

export { router };