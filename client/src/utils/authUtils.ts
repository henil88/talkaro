import type { AxiosInstance } from "axios";
import { getAccessToken } from "../apis/auth/getAccessToken";
import { getUserDetails } from "../apis/user/getUserDetails";

export const checkAuthorization = async (api: AxiosInstance) => {
  try {
    const authResponse = await getAccessToken(api);
    if (!authResponse?.isAuthorized) return { isAuthorized: false };
    const user = await getUserDetails(api);
    if (!user?.isActivated) return { isAuthorized: true, isActivated: false };
    return { isAuthorized: true, isActivated: true };
  } catch (err) {
    console.error("ERROR_AUTHZ", err);
    return { isAuthorized: false, isActivated: false };
  }
};
