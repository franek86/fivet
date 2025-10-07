import apiClient from "../utils/axiosConfig.js";

export const getNotifications = async () => {
  try {
    const res = await apiClient.get("/notification");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const getAllUnreadNotifications = async () => {
  try {
    const res = await apiClient.get("/notification/unread");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const updateReadNotification = async ({ id, data }) => {
  try {
    const response = await apiClient.put(`/notification/${id}/read`, { ...data, isRead: data });
    return response;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const deleteNotificationApi = async (id) => {
  try {
    const response = await apiClient.delete(`/notification/${id}`);
    return response;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
