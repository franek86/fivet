import apiClient from "./axiosConfig.js";

export const createBlogCategoryApi = async (data, id) => {
  try {
    const endpoint = id ? `/posts-category/${id}` : "/posts-category/";

    const method = id ? "patch" : "post";

    const response = await apiClient[method](endpoint, data);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
    Get all categories with pagination
*/
export const getBlogCategoriesApi = async () => {
  try {
    const res = await apiClient.get("/posts-category");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
