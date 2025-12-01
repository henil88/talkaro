import type { AxiosError, AxiosInstance } from "axios";
import { router } from "../../routes/route-handler";
import { setToken } from "../../features/auth/slice";
import { store } from "../../store";

interface AccessTokenResponse {
  token?: string;
  isAuthorized: boolean;
}

export async function getAccessToken(api: AxiosInstance) {
  try {
    const response = await api.get<AccessTokenResponse>("/api/refresh");
    console.log("GET_ACCESS_TOKEN", response.data);
    store.dispatch(
      setToken({
        token: response.data.token,
        isAuthorized: response.data.isAuthorized,
      })
    );
    return response.data;
  } catch (err) {
    console.log("ERROR_GETTING_ACCESS_TOKEN", (err as AxiosError).stack);
    router.navigate("/auth");
    return Promise.reject(null);
  }
}
