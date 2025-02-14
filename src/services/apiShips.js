import { PAGE_SIZE } from "../utils/constants.js";
import supabase from "./databaseConfig.js";

/* 
    Get all ships with pagination
    TO DO: add filters
*/
export const getShips = async ({ page }) => {
  let query = supabase.from("ships").select("*", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Ships could not be loaded");
  }

  return { data, count };
};

/* 
    Create ship data
*/

export const createShip = async (newData) => {
  const { data, error } = await supabase.from("ships").insert([newData]).select();

  if (error) {
    console.log(error);
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
    console.log(error);
    throw new Error("Category could not be deleted");
  }

  return data;
};
