import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "@/routes/route-handler";
import { setupAxiosWithStore } from "./lib/setupAxiosWithStore";
import { store } from "./store";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
setupAxiosWithStore(store);

const HydrateFallback = () => <div>Loading...</div>;

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<HydrateFallback />}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </Provider>
  );
};

export default App;
