import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "../store";
import { getAccessToken } from "../apis/auth/getAccessToken";
import { logout } from "../features/auth/slice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token) config.headers!["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { token } = await getAccessToken(axiosInstance);
        originalRequest.headers!["Authorization"] = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("TOKEN_REQUEST_FAILED", error);
        store.dispatch(logout());
      }
    }
  }
);

export default axiosInstance;
