import apiClient from "./axiosConfig.js";

export const getCompanyProfileApi = async () => {
  try {
    const res = await apiClient.get("/company");
    return res.data.company;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const updateCompanyProfileApi = async (data) => {
  try {
    const res = await apiClient.patch("/company", data, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
