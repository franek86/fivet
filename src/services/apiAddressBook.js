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
  if (!id) throw new Error("Address book id does not exists");

  try {
    const response = await apiClient.patch(`/address-book/${id}`, { ...newData });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(message);
  }
};

/* Edit only address book priority field */
export const editAddressBookPriorityApi = async (id, newPriority) => {
  if (!id) throw new Error("Address book id does not exists");

  try {
    const response = await apiClient.patch(`/address-book/${id}`, { priority: newPriority });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(message);
  }
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
  console.log(id);
  try {
    const res = await apiClient.get(`/address-book/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Delete single address book by id */
export const deleteSingleAddressBookApi = async (id) => {
  if (!id) throw new Error("Address book by id does not exists");
  try {
    const res = await apiClient.delete(`/address-book/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
