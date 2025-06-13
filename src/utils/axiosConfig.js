import axios from "axios";
import store from "../store.js";
import { logoutUser } from "../slices/authSlice.js";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

//Handle adding a new access token
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

//Execute request after refresh
const onRefreshSuccess = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

//Handle api request
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

//Handle expired token and refresh logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/auth/login") || originalRequest.url.includes("/auth/register")) {
      return Promise.reject(error);
    }

    //Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => resolve(originalRequest));
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        isRefreshing = false;
        onRefreshSuccess();

        return apiClient(originalRequest);
      } catch (error) {
        console.log("Error axios interctor refresh token");
        /* isRefreshing = false;
        refreshSubscribers = [];

        store.dispatch(logoutUser());
        if (window.location.pathname !== "/") {
          window.location.replace("/");
        }
        return Promise.reject(error); */
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
