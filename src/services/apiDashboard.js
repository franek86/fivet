import apiClient from "./axiosConfig.js";

/* 
  Get dashboard statistic
*/
export const getAdminDashboardStatistic = async () => {
  try {
    const res = await apiClient.get("/statistics/admin");
    return res.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
Get dashboard earnings
*/

export const getAdminDashboardEarnings = async () => {
  try {
    const res = await apiClient.get("/dashboard/admin-earnings");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/*
Get users by country 
*/
export const getUsersByCountry = async () => {
  try {
    const res = await apiClient.get("statistics/admin/users-by-country");

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
Get user dashboard statistic
*/
export const getUserDashboardStatistic = async () => {
  try {
    const res = await apiClient.get("/dashboard/user-statistic");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
