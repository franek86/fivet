import apiClient from "./axiosConfig.js";

/* 
  Get dashboard statistic
*/
export const getAdminDashboardStatistic = async () => {
  try {
    const res = await apiClient.get("/dashboard/admin-statistic");
    return res.data;
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
Get geo world countires
*/
export const getGeoWorld = async () => {
  try {
    const res = await apiClient.get("/geo/world.json");
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
