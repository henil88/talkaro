import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/apis/auth/getAccessToken";

let token: string | null = null;
let logoutHandler: (() => void) | null = null;

export const setAuthToken = (value: string | null) => {
  token = value;
};

export const registerLogoutHandler = (fn: () => void) => {
  logoutHandler = fn;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

/**
 * Separate client for refresh
 * NO interceptors
 */
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalReq = error.config as CustomAxiosRequestConfig;

    if (!originalReq) {
      return Promise.reject(error);
    }

    /**
     * Prevent refresh loop
     */
    if (originalReq.url?.includes("/api/refresh")) {
      logoutHandler?.();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        /**
         * Prevent multiple refresh calls
         */
        if (!refreshPromise) {
          refreshPromise = getAccessToken(refreshClient).then((res) => {
            const newToken = res.token ?? null;
            setAuthToken(newToken);
            refreshPromise = null;
            return newToken;
          }).catch((err) => {
            refreshPromise = null;
            throw err;
          });
        }

        const newToken = await refreshPromise;

        if (!newToken) {
          logoutHandler?.();
          return Promise.reject(error);
        }

        originalReq.headers = originalReq.headers ?? {};
        originalReq.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalReq);
      } catch (err) {
        logoutHandler?.();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;