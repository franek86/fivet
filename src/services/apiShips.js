import apiClient from "../utils/axiosConfig.js";
import { PAGE_SIZE } from "../utils/constants.js";
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
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
  Single ship data by id
*/
export const getShip = async (id) => {
  if (!id) return;
  const { data, error } = await supabase.from("ships").select("*").eq("id", id).single();
  if (error) {
    throw new Error("Ship colud not be loaded");
  }

  const { data: files } = await supabase.storage.from(bucketName).list();

  const checkImageExists = (imageUrl) => {
    if (!imageUrl) return placeholder;

    const fileName = imageUrl.split("/").pop();
    const fileExists = files.some((file) => file.name === fileName);

    return fileExists ? getResizedImageUrl(imageUrl, 80, 45) : placeholder;
  };

  const updatedData = { ...data, mainImage: checkImageExists(data.mainImage) };

  return updatedData;
};

/* 
    Create and edit ship data
*/

export const createEditShip = async (newData, id) => {
  try {
    const res = await apiClient.post("/ships/create", newData, {
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
  const { data, error } = await supabase.from("ships").delete().eq("id", id);
  if (error) {
    throw new Error("Category could not be deleted");
  }

  return data;
};
