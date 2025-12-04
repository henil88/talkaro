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
  headers: { "Content-Type": "application/json" },
});

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

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const { token: newToken } = await getAccessToken(axiosInstance);
        setAuthToken(newToken ?? null);

        originalReq.headers = originalReq.headers ?? {};
        originalReq.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalReq);
      } catch {
        logoutHandler?.();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
