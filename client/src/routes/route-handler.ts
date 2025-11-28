import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import SignupDetails from "../pages/SignupDetails";
import AuthFlow from "../pages/AuthFlow";

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
        Component: SignupDetails,
      },
    ],
  },
]);

export { router };
