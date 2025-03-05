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
