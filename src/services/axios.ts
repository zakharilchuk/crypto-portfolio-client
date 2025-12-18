import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const API_URL = import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL: API_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const authInstance = axios.create({
  baseURL: API_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { setAccessToken } = useAuthStore.getState();
    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        if (!originalRequest.url.includes("/auth/refresh")) {
          const res = await authInstance.post("/auth/refresh", {
            withCredentials: true,
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          setAccessToken(res.data.accessToken);
        }
        return authInstance.request(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);
