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

export const getBlogsApi = async (filters) => {
  const params = {
    categories: filters.categories.length > 0 ? filters.categories.join(",") : undefined,
    tags: filters.tags.length > 0 ? filters.tags.join(",") : undefined,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    status: filters.status,
    search: filters.search || undefined,
    page: filters.page,
    limit: filters.limit,
    sortBy: filters.sortBy,
    order: filters.order,
  };

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
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const updateBlogApi = async (id, form) => {
  try {
    const res = await apiClient.patch(`/posts/${id}`, form, { headers: { "Content-Type": "multipart/form-data" } });
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
