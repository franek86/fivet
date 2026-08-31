import apiClient from "./axiosConfig.js";

export const getUserApi = async (params) => {
  try {
    const res = await apiClient.get("/users", { params });

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const getSingleUserProfileApi = async (id) => {
  try {
    const res = await apiClient.get(`users/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const updateUserProfileVerification = async ({ userId, verificationStatus }) => {
  const res = await apiClient.patch("/users/verify-user-account", { userId, verificationStatus });
  return res.data;
};
