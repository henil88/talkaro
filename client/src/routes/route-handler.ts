import { createBrowserRouter } from "react-router";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/register",
  },
]);

export { router };
