import { Toaster } from "@/components/ui/sonner";
import { router } from "@/routes/route-handler";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { setupAxiosWithStore } from "./libs/setupAxiosWithStore";
import { store } from "./store";

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
