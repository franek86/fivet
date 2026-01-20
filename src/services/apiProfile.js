import apiClient from "../utils/axiosConfig.js";

/* Get all user profile olny for admin*/
export const getAllProfileApi = async ({ search = "" }) => {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    const res = await apiClient.get(`/profile?${params.toString()}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Get last five created users */
export const getLastFiveUsersApi = async () => {
  try {
    const res = await apiClient.get("profile/last-users");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* update profile  */
export const updateProfileApi = async (updatedData, userId) => {
  if (!userId) throw new Error("User id does not exists.");

  try {
    const res = await apiClient.patch("/profile/update", updatedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Delete user admin only */
export const deleteUserProfileApi = async (userId) => {
  if (!userId) throw new Error("User id does not exists.");

  try {
    const res = await apiClient.delete(`/profile/${userId}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
