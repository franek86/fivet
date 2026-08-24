import apiClient from "./axiosConfig.js";

export const getUserApi = async (params) => {
  const res = await apiClient.get("/users", { params });
  return res.data;
};
