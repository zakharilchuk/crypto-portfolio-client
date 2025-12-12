import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const authInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
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
    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await authInstance.post("/auth/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        return authInstance.request(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);
