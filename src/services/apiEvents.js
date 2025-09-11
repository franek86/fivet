import apiClient from "../utils/axiosConfig.js";

/* Create contact in address boook */
export const createEventApi = async (newData) => {
  try {
    const res = await apiClient.post("/events/create", {
      ...newData,
    });
    return res;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Get all events */
export const getAllEventsApi = async () => {
  try {
    const res = await apiClient.get("/events/");
    return res;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
