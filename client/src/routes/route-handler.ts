import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import SignupDetails from "../pages/SignupDetails";
import AuthFlow from "../pages/AuthFlow";
import { protectedLoader } from "../loaders/protectedLoader";
import { signupProtectedLoader } from "@/loaders/semiProtectedLoader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/auth",
        Component: AuthFlow,
      },
      {
        path: "/signup",
        loader: signupProtectedLoader(),
        Component: SignupDetails,
      },
      {
        path: "/app",
        loader: protectedLoader(),
        element: "Main Dashboard",
      },
    ],
  },
]);

export { router };
