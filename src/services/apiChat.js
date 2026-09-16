import apiClient from "./axiosConfig.js";

export const fetchChatMessagesApi = async (conversationId) => {
  try {
    const response = await apiClient.get(`/chat/${conversationId}/messages`);

    return response.data.messages;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const fetchChatConversationApi = async () => {
  try {
    const response = await apiClient.get("/chat/conversations");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
