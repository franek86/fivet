import apiClient from "./axiosConfig.js";

export const sendRequestToOwner = async (ownerId) => {
  try {
    const res = await apiClient.post(`/broker-assignments/${ownerId}`, { ownerId });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
