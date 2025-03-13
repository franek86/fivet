import supabase from "./databaseConfig.js";

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
  const { data, error } = await supabase.from("profile").insert(profileData).single();

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
