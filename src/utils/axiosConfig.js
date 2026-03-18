import axios from "axios";

let accessToken = null;

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

//Response interceptor (refresh logic)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle only 401 and avoid infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post("/auth/refresh-token", {}, { withCredentials: true });

        const newAccessToken = data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);

        // Let React handle redirect (DON'T hard redirect here ideally)
        return Promise.reject(error); // <-- IMPORTANT (keep original error)
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
