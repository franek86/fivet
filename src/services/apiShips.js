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

export const createShip = async (newData, mainImage) => {
  const shipData = {
    ...newData,
    mainImage,
  };
  const { data, error } = await supabase.from("ships").insert([shipData]).select();

  if (error) {
    console.log(error);
    throw new Error("Ships colud not be create");
  }

  return data;
};
