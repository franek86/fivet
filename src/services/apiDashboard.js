import apiClient from "../utils/axiosConfig.js";

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

export const getAdminDashboardEarnings = async (period = "week") => {
  try {
    const res = await apiClient.get(`/dashboard/admin-earnings?period=${period}`);
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
