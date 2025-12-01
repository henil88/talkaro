import type { AxiosInstance } from "axios";
import { router } from "../../routes/route-handler";
import { setToken } from "../../features/auth/slice";
import { store } from "../../store";

interface AccessTokenResponse {
  token: string | null;
  isAuthorized: boolean;
}

export async function getAccessToken(api: AxiosInstance) {
  try {
    const response = await api.get<AccessTokenResponse>("/api/refresh");
    console.log("GET_ACCESS_TOKEN", response.data);
    const { token, isAuthorized } = response.data;
    if (!token) throw new Error("Access Token missing from server");
    store.dispatch(setToken({ token, isAuthorized }));
    return response.data;
  } catch (err) {
    console.log("ERROR_GETTING_ACCESS_TOKEN", err);
    router.navigate("/auth");
    throw err;
  }
}
