import axios from "axios";
import apiClient from "../utils/axiosConfig.js";

/* Register user */
export const registerUser = async ({ email, password, fullName }) => {
  try {
    const res = await apiClient.post("/auth/register", {
      email,
      password,
      fullName,
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "An error occurred during registration.";
    throw new Error(message);
  }
};

/* Verify OTP */
export const verifyOtpApi = async ({ data, otp }) => {
  try {
    const res = await apiClient.post("/auth/verify-user", {
      ...data,
      otp: otp.join(""),
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

/* FORGET PASSWORD */
export const forgetPasswordApi = async ({ email }) => {
  try {
    const res = await apiClient.post("/auth/forgot-password", {
      email,
    });

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

/* VERIFY OTP FORGET PASSWORD */
export const verifyOtpForgetPasswordApi = async ({ email, otp }) => {
  try {
    const res = await apiClient.post("/auth/verify-forgot-password", {
      email,
      otp: otp.join(""),
    });

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

/* RESET PASSWORD */
export const resetPasswordApi = async ({ email, password }) => {
  try {
    const res = await apiClient.post("/auth/reset-password", {
      email,
      newPassword: password,
    });

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

/* LOGIN USER */
export const loginApi = async ({ email, password, rememberMe }) => {
  try {
    const res = await apiClient.post("/auth/login", { email, password, rememberMe });
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

/* LOGOUT USER*/
export const logoutUserApi = async () => {
  try {
    const res = await apiClient.post("/auth/logout");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
