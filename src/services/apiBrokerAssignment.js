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

/* Update broker request to user */
export const updateBrokerRequestToUser = async ({ brokerId, id, status }) => {
  try {
    const res = await apiClient.put("/broker-assignments/edit-broker-request", { brokerId, id, status });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
