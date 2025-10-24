import { RouterProvider } from "react-router";
import { router } from "./routes/route-handler";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
