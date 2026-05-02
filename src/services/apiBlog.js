import apiClient from "./axiosConfig.js";

export const createBlogApi = async (data) => {
  try {
    const res = await apiClient.post("/posts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
