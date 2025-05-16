import apiClient from "../utils/axiosConfig.js";

/* Create contact in address boook */
export const createAddressBoookContactApi = async (newData) => {
  try {
    const res = await apiClient.post("/address-book/create", {
      ...newData,
    });
    return res;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Edit contact by id in address boook */
export const editAddressBoookContactApi = async (newData, id) => {
  if (!id) throw new Error("Address book does not exists");

  const { data, error } = await supabase.from("address_book").update(newData).eq("id", id).select();

  if (error) {
    throw new Error("Contact could not be edited");
  }

  return data;
};

/* Edit only address book priority field */
export const editAddressBookPriorityApi = async (id, newPriority) => {
  if (!id) throw new Error("Address book id does not exists");

  const { data, error } = await supabase.from("address_book").update({ priority: newPriority }).eq("id", id);
  if (error) {
    throw new Error("Priority could not be edited");
  }

  return data;
};

/* Get address book list */
export const fecthAddressBookApi = async (userId) => {
  if (!userId) throw new Error("User does not exists");

  try {
    const res = await apiClient.get("/address-book");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Get single address book */
export const getSingleAddressBookApi = async (id) => {
  if (!id) throw new Error("Address book by id does not exists");
  const { data, error } = await supabase.from("address_book").select("*").eq("id", id).single();
  if (error) {
    throw new Error("Ship colud not be loaded");
  }

  return data;
};

/* Delete single address book by id */
export const deleteSingleAddressBookApi = async (id) => {
  if (!id) throw new Error("Address book by id does not exists");
  const { data, error } = await supabase.from("address_book").delete().eq("id", id);
  if (error) {
    throw new Error("Address book list could not be loaded");
  }

  return data;
};
