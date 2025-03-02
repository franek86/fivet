import supabase from "./databaseConfig.js";

/* log in user */
export const loginApi = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Invalid login credentials.");
  }

  return data;
};

/* get user session */
export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
};
