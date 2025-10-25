import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";

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
        path: "/register",
      },
    ],
  },
]);

export { router };
