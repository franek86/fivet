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
    throw new Error("Ships could not be loaded");
  }

  return { data, count };
};

/* 
  Single ship data by id
*/
export const getShip = async (id) => {
  if (!id) return;
  let { data, error } = await supabase.from("ships").select("*").eq("id", id).single();
  if (error) {
    throw new Error("Ship colud not be loaded");
  }

  return data;
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
