import axios from "axios";
import store from "../store.js";
import { logoutUser } from "../slices/authSlice.js";

let accessToken = null;
let isRefreshing = false;
let subscribers = [];

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

//Handle adding a new access token
const subscribeTokenRefresh = (callback) => {
  subscribers.push(callback);
};

//Execute request after refresh
const onRefreshed = (newToken) => {
  subscribers.forEach((callback) => callback(newToken));
  subscribers = [];
};

//Handle api request
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

//Handle expired token and refresh logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register") ||
      originalRequest.url.includes("/auth/logout") ||
      originalRequest.url.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    //Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve) =>
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          }),
        );
      }

      isRefreshing = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );
        accessToken = data.accessToken;
        isRefreshing = false;
        onRefreshed(accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        console.log("Error axios interctor refresh token");
        isRefreshing = false;
        if (error.response?.status === 401) {
          store.dispatch(logoutUser());
          window.location.replace("/");
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export const setAccessToken = (token) => {
  accessToken = token;
};

export default apiClient;
