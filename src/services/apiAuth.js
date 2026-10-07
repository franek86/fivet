import apiClient, { setAccessToken } from "./axiosConfig.js";

/* Register user */
export const registerUser = async (data) => {
  const res = await apiClient.post("/auth/register", {
    ...data,
  });
  return res.data;
};

/* Verify OTP */
export const verifyOtpApi = async ({ data, subscription, otp }) => {
  try {
    const res = await apiClient.post("/auth/verify-user", {
      ...data,
      subscription,
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
  const res = await apiClient.post("/auth/forgot-password", {
    email,
  });

  return res.data;
};

/* VERIFY OTP FORGET PASSWORD */
export const verifyOtpForgetPasswordApi = async ({ email, otp }) => {
  const res = await apiClient.post("/auth/verify-forgot-password", {
    email,
    otp: otp.join(""),
  });

  return res.data;
};

/* RESET PASSWORD */
export const resetPasswordApi = async ({ resetToken, password }) => {
  const res = await apiClient.post("/auth/reset-password", {
    resetToken,
    newPassword: password,
  });

  return res.data;
};

/* LOGIN USER */
export const loginApi = async ({ email, password, rememberMe }) => {
  const res = await apiClient.post("/auth/login", {
    email,
    password,
    rememberMe,
  });

  return res.data;
};

/* Refresh token api */
export const refreshTokenApi = async () => {
  const res = await apiClient.post("/auth/refresh-token");
  console.log(res.data);
  setAccessToken(res.data.accessToken);

  return res.data;
};

export const getCurrentUser = async () => {
  try {
    const res = await apiClient.get("/auth/me");

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Unauthorized";
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
