import supabase from "./databaseConfig.js";

/* Create contact in address boook */
export const createAddressBoookContactApi = async (data, userId) => {
  if (!userId) throw new Error("User does not exists");

  const { data, error } = await supabase.from("address_book").insert([{ ...data, user_id: userId }]);

  if (error) {
    throw new Error("Contact could not be added");
  }

  return data;
};
