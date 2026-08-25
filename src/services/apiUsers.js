import apiClient from "./axiosConfig.js";

export const getUserApi = async (params) => {
  const res = await apiClient.get("/users", { params });
  return res.data;
};

export const updateUserProfileVerification = async ({ userId, verificationStatus }) => {
  console.log(userId, verificationStatus);
  const res = await apiClient.patch("/users/verify-user-account", { userId, verificationStatus });
  return res.data;
};
