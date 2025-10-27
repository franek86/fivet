import apiClient from "../utils/axiosConfig.js";

/* 
    Get all ships depend if is user or admin with pagination
*/
export const getShips = async (params = {}) => {
  try {
    const res = await apiClient.get("/ships", { params });

    return res.data;
  } catch (error) {
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

/* publish ship by id admin only */

export const publishShipApi = async (id, isPublished) => {
  try {
    const response = await apiClient.patch(`/ships/${id}/publish`, {
      isPublished,
    });
    return response;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
