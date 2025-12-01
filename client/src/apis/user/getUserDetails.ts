import type { AxiosInstance } from "axios";
import { setUser } from "../../features/user/slice";
import { router } from "../../routes/route-handler";
import { store } from "../../store";

export async function getUserDetails(api: AxiosInstance) {
  try {
    const response = await api.get("/api/me");
    console.log("GET_USER", response.data);
    const { user, isActivated } = response.data;
    if (!user) console.error("User object missing from server");
    store.dispatch(setUser({ user, isActivated }));
    return response.data;
  } catch (err) {
    console.error("ERROR_GETTING_USER", err);
    router.navigate("/signup");
    throw err;
  }
}
