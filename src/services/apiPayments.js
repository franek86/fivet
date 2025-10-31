import apiClient from "../utils/axiosConfig.js";

/* Get app payments with pagination,sort and filter */
export const getPayments = async (params = {}) => {
  try {
    const response = await apiClient.get("/payments", { params });
    const { meta, payload } = response.data;
    return { meta, payload };
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
