import apiClient from "./axiosConfig.js";

export const stripeSubscribeApi = async (plan) => {
  try {
    const res = apiClient.post("/stripe/checkout", { plan });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
