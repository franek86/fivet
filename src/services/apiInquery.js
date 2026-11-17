import apiClient from "./axiosConfig.js";

/* Get my inqueries */
export const fetchMyInquery = async (filter) => {
  const params = {
    search: filter.search || undefined,
    status: filter.status,
  };

  try {
    const { data } = await apiClient.get("/inqueries", { params });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
