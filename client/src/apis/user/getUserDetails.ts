import type { AxiosInstance } from "axios";
import { setUser } from "@/features/user/slice";
import { router } from "@/routes/route-handler";
import { store } from "@/store";
import { toast } from "sonner";

interface ResponseType {
  user: unknown;
  isActivated: boolean;
}

export async function getUserDetails(
  api: AxiosInstance,
  options: { toast: boolean } = { toast: false }
) {
  try {
    const { data } = await api.get<ResponseType>("/api/me");
    const { user, isActivated } = data;

    if (!user) {
      if (options.toast)
        toast.error("User data could not be retrieved from the server.");
      return { isActivated: false };
    }

    store.dispatch(setUser({ user, isActivated }));
    return data;
  } catch (err) {
    router.navigate("/signup");
    throw err;
  }
}
