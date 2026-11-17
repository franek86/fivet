import apiClient from "./axiosConfig.js";

/* Get my inqueries */
export const fetchMyInquery = async (filter) => {
  const params = {
    search: filter.search || undefined,
    status: filter.status,
    sortBy: filter.sortBy,
    order: filter.order,
    page: filter.page,
  };

  try {
    const { data } = await apiClient.get("/inqueries", { params });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Update inquery status */
export const updateInqueryStatusApi = async ({ id, status }) => {
  try {
    const res = await apiClient.patch(`/inqueries/${id}/status`, { status });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Delete inquery */
export const deleteInqueryApi = async ({ id }) => {
  try {
    const res = await apiClient.delete(`/inqueries/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Save contact to address book */
export const saveInquiryContactApi = async ({ id }) => {
  try {
    const res = await apiClient.post(`/inqueries/${id}/address-book`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
