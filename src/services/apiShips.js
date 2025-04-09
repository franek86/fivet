import { PAGE_SIZE } from "../utils/constants.js";
import { getResizedImageUrl } from "../utils/resizedImage.js";
import supabase from "./databaseConfig.js";

/* 
    Get all ships depend if is user or admin with pagination
    TO DO: add filters
*/
export const getShips = async ({ page, role, userId }) => {
  let query = supabase.from("ships").select("*,profile(fullName)", { count: "exact" });

  if (role !== "ADMIN") {
    query = query.eq("owner_id", userId);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error("Ships could not be loaded");
  }

  const { data: files } = await supabase.storage.from(bucketName).list();

  const checkImageExists = (imageUrl) => {
    if (!imageUrl) return placeholder;

    const fileName = imageUrl.split("/").pop();
    const fileExists = files.some((file) => file.name === fileName);

    return fileExists ? getResizedImageUrl(imageUrl, 80, 45) : placeholder;
  };

  const updatedData = data.map((ship) => ({
    ...ship,
    mainImage: checkImageExists(ship.mainImage),
  }));

  return { data: updatedData, count };
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
  let query = await supabase.from("ships");

  //Create new data
  if (!id) query = query.insert([newData]).select().single();

  //Edit current data by id
  if (id) query = query.update(newData).eq("id", id).select();

  const { data, error } = await query;

  if (error) {
    throw new Error("Ships colud not be create");
  }

  return data;
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
