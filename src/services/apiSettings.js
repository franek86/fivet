import apiClient from "./axiosConfig.js";

export const changePassword = async (values) => {
  try {
    const res = await apiClient.patch("/settings/password", values);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const requestEmailChange = async ({ email, password }) => {
  try {
    const res = await apiClient.post("/settings/email/request", { email, password });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const confirmEmailChange = async ({ email, otp }) => {
  try {
    const res = await apiClient.post("/settings/email/confirm", { email, otp });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const changeAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await apiClient.patch("/settings/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const freezeAccount = async ({ password }) => {
  try {
    const res = await apiClient.post("/settings/freeze", { password });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
