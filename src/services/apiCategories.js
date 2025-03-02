/* 
    Get all categories with pagination
*/

import { PAGE_SIZE } from "../utils/constants.js";
import supabase from "./databaseConfig.js";

export const getCategories = async ({ page, sortBy }) => {
  let query = supabase.from("categories").select("*", { count: "exact" });

  //Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  //Sort
  if (sortBy?.field) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  const { data, count, error } = await query;

  if (error) {
    throw new Error("Categories could not be loaded");
  }

  return { data, count };
};

/* 
  Insert (create) new category
*/

export const createEditCategory = async (newCategory, id) => {
  let query = supabase.from("categories");

  //Create category
  if (!id) query = query.insert([newCategory]).select().single();

  //Edit category
  if (id) query = query.update(newCategory).eq("id", id).select();

  const { data, error } = await query;

  if (error) {
    throw new Error("Categories could not be loaded");
  }

  return data;
};

/* 
  Delete single category by id
*/

export const deleteCategory = async (id) => {
  const { data, error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    throw new Error("Category could not be deleted");
  }

  return data;
};
