import supabase from "./databaseConfig.js";

/* Create contact in address boook */
export const createAddressBoookContactApi = async (newData, userId) => {
  if (!userId) throw new Error("User does not exists");

  const { data, error } = await supabase.from("address_book").insert([{ ...newData, user_id: userId }]);

  if (error) {
    throw new Error("Contact could not be added");
  }

  return data;
};

/* Get address book list */
export const fecthAddressBookApi = async (userId) => {
  if (!userId) throw new Error("User does not exists");
  const { data, error } = await supabase.from("address_book").select("*").eq("user_id", userId);

  if (error) {
    throw new Error("Address book list could not be loaded");
  }

  return data;
};
