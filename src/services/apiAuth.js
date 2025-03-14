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

/* Sign up with email and password */
export const signupEmailApi = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error("Invalid credentials.");
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

/* add user role */
export const createUserRoleApi = async (newData) => {
  const { data, error } = await supabase.from("user_roles").insert([newData]).select();

  if (error) {
    throw new Error(error.message);
  }

  return { data };
};
