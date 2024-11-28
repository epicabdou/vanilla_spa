// src/services/axios.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { authStore } from "../stores/authStore";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.ecosphere.green/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      authStore.set({
        isAuthenticated: false,
        user: null,
        userDetails: null,
      });
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userDetails");
      localStorage.setItem("isAuthenticated", "false");
      // Redirect to login page or show login modal
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
