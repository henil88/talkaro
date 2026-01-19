import type { AxiosInstance } from "axios";
import { router } from "@/routes/route-handler";
import { setToken } from "@/features/auth/slice";
import { store } from "@/store";
import { toast } from "sonner";

interface AccessTokenResponse {
  token: string | null;
  isAuthorized: boolean;
}

export async function getAccessToken(
  api: AxiosInstance,
  options: { toast: boolean } = { toast: false }
) {
  try {
    const { data } = await api.get<AccessTokenResponse>("/api/refresh");
    const { token, isAuthorized } = data;

    if (!token) {
      if (options.toast) {
        toast.error(
          "Access token is missing. Please try again or contact support."
        );
      }
      throw new Error("Access Token missing from server");
    }

    store.dispatch(setToken({ token, isAuthorized }));
    return data;
  } catch (err) {
    router.navigate("/auth");
    throw err;
  }
}
