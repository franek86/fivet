import apiClient from "../utils/axiosConfig.js";

/* 
  Get dashboard statistic
*/
export const getDashboardStatistic = async () => {
  try {
    const res = await apiClient.get("/dashboard/statistic");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

/* 
Get dashboard earnings
*/

export const getDashboardEarnings = async (period = "week") => {
  try {
    const res = await apiClient.get(`/dashboard/earnings?period=${period}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
