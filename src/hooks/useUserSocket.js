import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import socket from "../shared/socket.js";

export function useUserSocket(userId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const handlePublishedShipNotify = () => {
      queryClient.invalidateQueries({ queryKey: ["ships"] });
      /*  queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-notification"] });
      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      }); */
    };

    // app notification
    const handleNewNotification = ({ notification, unreadCount }) => {
      console.log("🔔 NEW NOTIFICATION", {
        notification,
        unreadCount,
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.setQueryData(["unread-notification"], (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, unreadCount };
      });
    };

    // Chat notification
    const handleMessageNotification = (message) => {
      queryClient.setQueryData(["conversations"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          conversations: oldData.conversations.map((conversation) => {
            if (conversation.id !== message.conversationId) {
              return conversation;
            }
            return {
              ...conversation,
              lastMessage: {
                id: message.messageId,
                content: message.content,
                senderId: message.senderId,
                isRead: false,
                createdAt: message.createdAt,
              },
              lastMessageAt: message.createdAt,
              unreadCount: conversation.unreadCount + 1,
            };
          }),
        };
      });
    };

    // Conversation read
    const handleConversationRead = ({ conversationId }) => {
      queryClient.setQueryData(["conversations"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          conversations: oldData.conversations.map((conversation) =>
            conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation,
          ),
        };
      });
    };

    // Handle user offline/online
    const handleUserOnline = ({ userId: onlineUserId }) => {
      queryClient.setQueryData(["online-users"], (oldUsers = []) => {
        if (oldUsers.includes(onlineUserId)) {
          return oldUsers;
        }
        return [...oldUsers, onlineUserId];
      });
    };
    const handleUserOffline = ({ userId: offlineUserId }) => {
      queryClient.setQueryData(["online-users"], (oldUsers = []) => oldUsers.filter((id) => id !== offlineUserId));
    };

    /*  const handleNotificationCount = ({ count }) => {
      queryClient.setQueryData(["notification-count"], count);
    }; */

    socket.on("ship:published", handlePublishedShipNotify);
    socket.on("user:notification:new", handleNewNotification);
    socket.on("message:notification", handleMessageNotification);
    socket.on("conversation:read", handleConversationRead);
    socket.on("user:online", handleUserOnline);
    socket.on("user:offline", handleUserOffline);
    /*  socket.on("user:notification:count", handleNotificationCount); */

    return () => {
      socket.off("ship:published", handlePublishedShipNotify);
      socket.off("user:notification:new", handleNewNotification);
      socket.off("message:notification", handleMessageNotification);
      socket.off("conversation:read", handleConversationRead);
      socket.off("user:online", handleUserOnline);
      socket.off("user:offline", handleUserOffline);
      /* socket.off("user:notification:count", handleNotificationCount); */
    };
  }, [queryClient]);
}
