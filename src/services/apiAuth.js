import { setUser } from "../slices/authSlice.js";
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

/* get user role */
export const getCurrentUser = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session?.user || sessionError) throw sessionError || new Error("No session found");

  const { data, error } = await supabase.from("user_roles").select("roles(role)").eq("user_id", session.user.id).single();

  if (error) {
    throw new Error(error.message);
  }

  return { ...session.user, role: data.roles.role };
};

/* logout user */

export const logoutUserApi = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};
