import apiClient from "../utils/axiosConfig.js";
import { PAGE_SIZE } from "../utils/constants.js";

/* GET ALL SHIP TYPES */
export const getAllShipTypes = async () => {
  try {
    const res = await apiClient.get("/shipType/all");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
    Get all categories with pagination
*/

export const getCategories = async ({ page = 1, sortBy = "desc", limit = PAGE_SIZE }) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (sortBy?.field && sortBy?.direction) {
      params.append("sortBy", `${sortBy.field}-${sortBy.direction}`);
    }
    let response = await apiClient(`/shipType?${params.toString()}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
  Insert (create) new category
*/

export const createEditCategory = async (newCategory, id) => {
  try {
    const endpoint = id ? `/shipType/edit/${id}` : "/shipType/create";

    const method = id ? "patch" : "post";

    const response = await apiClient[method](endpoint, newCategory);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
  Delete single category by id
*/

export const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`/shipType/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
