import apiClient from "../utils/axiosConfig.js";
import supabase from "./databaseConfig.js";

/* Register user */
export const registerUser = async ({ fullName, email, password }) => {
  try {
    const res = await apiClient.post("/auth/register", {
      fullName,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginApi = async ({ email, password }) => {
  try {
    const res = await apiClient.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await apiClient.get("/auth/me");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* logout user */
export const logoutUserApi = async () => {
  try {
    const res = await apiClient.post("/auth/logout");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
