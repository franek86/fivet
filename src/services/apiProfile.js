import apiClient from "../utils/axiosConfig.js";
import supabase from "./databaseConfig.js";

/* Get all user profile olny for admin*/
export const getAllProfileApi = async () => {
  try {
    const res = await apiClient.get("/profile");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
/* export const getAllProfileApi = async () => {
  const { data, error } = await supabase.from("profile").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}; */

/* get profile data by user id */

export const getProfileApi = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error("Error fetching user: " + userError.message);

  const { data, error } = await supabase.from("profile").select("*").eq("id", user.id).single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/* update profile  */
export const updateProfileApi = async (updatedData, userId) => {
  if (!userId) throw new Error("User id does not exists.");

  const { data, error } = await supabase.from("profile").update(updatedData).eq("id", userId).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
