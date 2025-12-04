import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./routes/route-handler";
import { setupAxiosWithStore } from "./lib/setupAxiosWithStore";
import { store } from "./store";
import { Toaster } from "@/components/ui/sonner";

setupAxiosWithStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
};

export default App;
