import axios, { AxiosError, AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
