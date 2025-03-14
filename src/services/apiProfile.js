import supabase from "./databaseConfig.js";

/* Get all user profile oly for admin*/
export const getAllProfileApi = async () => {
  const { data, error } = await supabase.from("profile").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
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

/* Create profile  */
export const createProfileApi = async (profileData) => {
  const { data, error } = await supabase.from("profile").insert(profileData).select("*");

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
