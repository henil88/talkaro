import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../apis/auth/getAccessToken";

let _token: string | null = null;
let onLogout: (() => void) | null = null;

export const setAuthToken = (token: string | null) => {
  _token = token;
};

export const registerLogoutHandler = (fn: () => void) => {
  onLogout = fn;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach token
axiosInstance.interceptors.request.use((config) => {
  if (_token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${_token}`;
  }
  return config;
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Refresh token logic
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalReq = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const { token } = await getAccessToken(axiosInstance);
        setAuthToken(token ?? null);

        originalReq.headers["Authorization"] = `Bearer ${token}`;
        return axiosInstance(originalReq);
      } catch (e) {
        console.error("TOKEN_REQUEST_FAILED", e);
        onLogout?.();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
