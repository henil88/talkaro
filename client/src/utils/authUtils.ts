import type { AxiosInstance } from "axios";
import { getAccessToken } from "@/apis/auth/getAccessToken";
import { getUserDetails } from "@/apis/user/getUserDetails";

export interface AuthorizationStatus {
  isAuthorized: boolean;
  isActivated: boolean;
}

export interface AuthorizationOptions {
  toast: boolean;
}

const DEFAULT_UNAUTHORIZED_STATUS: AuthorizationStatus = {
  isAuthorized: false,
  isActivated: false,
};

const resolveAuthorizationStatus = async (
  api: AxiosInstance,
  options?: AuthorizationOptions
): Promise<AuthorizationStatus> => {
  const authResponse = await getAccessToken(api, options);

  if (!authResponse?.isAuthorized) {
    return DEFAULT_UNAUTHORIZED_STATUS;
  }

  const userResponse = await getUserDetails(api, options);

  return {
    isAuthorized: true,
    isActivated: Boolean(userResponse?.isActivated),
  };
};

export const checkAuthorization = async (
  api: AxiosInstance,
  options?: AuthorizationOptions
): Promise<AuthorizationStatus> => {
  try {
    return await resolveAuthorizationStatus(api, options);
  } catch {
    return DEFAULT_UNAUTHORIZED_STATUS;
  }
};
