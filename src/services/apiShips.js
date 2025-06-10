import apiClient from "../utils/axiosConfig.js";
import { getResizedImageUrl } from "../utils/resizedImage.js";
import supabase from "./databaseConfig.js";

/* 
    Get all ships depend if is user or admin with pagination
    TO DO: add filters
*/
export const getShips = async ({ page, role, userId }) => {
  try {
    const res = await apiClient.get("/ships", {
      params: {
        page,
        role,
        userId,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
  Single ship data by id
*/
export const getShip = async (id) => {
  try {
    const res = await apiClient(`/ships/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
    Create and edit ship data
*/

export const createEditShip = async (newData, id) => {
  try {
    const method = id ? "patch" : "post";
    const endpoint = id ? `/ships/${id}` : "/ships/create";
    const res = await apiClient[method](endpoint, newData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
  Delete ship by id
*/
export const deleteShip = async (id) => {
  try {
    const res = await apiClient.delete(`/ships/${id}`);
    return res;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
