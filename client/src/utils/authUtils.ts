import type { AxiosInstance } from "axios";
import { getAccessToken } from "@/apis/auth/getAccessToken";
import { getUserDetails } from "@/apis/user/getUserDetails";

export const checkAuthorization = async (
  api: AxiosInstance,
  options?: { toast: boolean }
) => {
  try {
    const auth = await getAccessToken(api, options);
    if (!auth?.isAuthorized) return { isAuthorized: false, isActivated: false };

    const user = await getUserDetails(api, options);
    return {
      isAuthorized: true,
      isActivated: Boolean(user?.isActivated),
    };
  } catch {
    return { isAuthorized: false, isActivated: false };
  }
};
