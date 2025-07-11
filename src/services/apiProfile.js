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

  try {
    const res = await apiClient.patch("/profile/update", updatedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Delete user admin only */
export const deleteUserProfileApi = async (userId) => {
  if (!userId) throw new Error("User id does not exists.");

  try {
    const res = await apiClient.delete(`/profile/${userId}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
