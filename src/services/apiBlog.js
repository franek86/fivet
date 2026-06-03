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

export const getBlogsApi = async (params) => {
  try {
    const res = await apiClient.get("/posts", { params });

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const getBlogApi = async (slug) => {
  try {
    const res = await apiClient.get(`/posts/admin/${slug}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const updateBlogApi = async (id, form) => {
  try {
    const res = await apiClient.patch(`/posts/${id}`, form, { headers: { "Content-Type": "multipart/form-data" } });
    console.log(res.data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const deleteBlogApi = async (id) => {
  try {
    const res = await apiClient.delete(`/posts/${id}`);
    return res;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
