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
export const getAllEventsApi = async (filter) => {
  try {
    const { data } = await apiClient.get("/events", { params: filter });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Get users recent events */
export const getRecentEvents = async (query) => {
  try {
    const { data } = await apiClient.get("/events/recent", { params: query });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Get single event */
export const singleEventApi = async (id) => {
  if (!id) throw new Error("Event id does not exists");
  try {
    const { data } = await apiClient.get(`/events/${id}`);
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Update event by id */
export const updateEventByIdApi = async ({ id, data }) => {
  if (!id) throw new Error("Event id does not exists");
  try {
    const response = await apiClient.patch(`/events/${id}`, { ...data });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* Delete Event by ID */
export const deleteEventByIdApi = async (id) => {
  if (!id) throw new Error("Event by id does not exists");
  try {
    const res = await apiClient.delete(`/events/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
