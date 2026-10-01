import apiClient from "./axiosConfig.js";

/* Get app payments with pagination,sort and filter */
export const getPayments = async (filters) => {
  const params = {
    status: filters.status || undefined,
    search: filters.search || undefined,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    page: filters.page,
    limit: filters.limit,
    sortBy: filters.sortBy,
    order: filters.order,
  };

  try {
    const response = await apiClient.get("/payments", { params });
    const { meta, payload } = response.data;
    return { meta, payload };
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Get payment session */
export const getPaymentSession = async (sessionId) => {
  try {
    const response = await apiClient.get("/stripe/get-session", { params: { session_id: sessionId } });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Delete payment by id */
export const deletePayment = async (id) => {
  try {
    const response = await apiClient.delete(`/payments/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
