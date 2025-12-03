import type { AxiosInstance } from "axios";
import { setUser } from "../../features/user/slice";
import { router } from "../../routes/route-handler";
import { store } from "../../store";

interface ResponseType {
  user: unknown;
  isActivated: boolean;
}

export async function getUserDetails(api: AxiosInstance) {
  try {
    const response = await api.get<ResponseType>("/api/me");
    const { user, isActivated } = response.data;
    if (!user) console.error("User object missing from server");
    store.dispatch(setUser({ user, isActivated }));
    return response.data;
  } catch (err) {
    router.navigate("/signup");
    throw err;
  }
}
