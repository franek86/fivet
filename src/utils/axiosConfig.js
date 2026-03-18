import axios from "axios";
import { refreshTokenApi } from "../services/apiAuth.js";

let accessToken = null;
let isRefreshing = false;
let subscribers = [];

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

// Attach access token to requests
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Subscribe requests while refreshing
const subscribeTokenRefresh = (callback) => subscribers.push(callback);
const onRefreshed = (newToken) => {
  subscribers.forEach((callback) => callback(newToken));
  subscribers = [];
};

// Response interceptor: handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue request until token refreshed
        return new Promise((resolve, reject) =>
          subscribeTokenRefresh((newToken) => {
            if (error || !newToken) {
              reject(error);
              return;
            }
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          }),
        );
      }

      isRefreshing = true;
      try {
        const data = await refreshTokenApi(); // call refresh endpoint
        const newToken = data.accessToken;
        setAccessToken(newToken);
        isRefreshing = false;
        onRefreshed(newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        isRefreshing = false;
        setAccessToken(null);
        onRefreshed(err);

        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
