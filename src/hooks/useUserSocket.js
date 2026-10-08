import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import socket from "../shared/socket.js";

export function useUserSocket(userId, selectedConversationId) {
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
      const { conversationId, messageId, senderId, content, createdAt } = message;
      const isSelected = selectedConversationId === conversationId;

      queryClient.setQueriesData({ queryKey: ["conversations"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          conversations: oldData.conversations.map((conversation) => {
            if (conversation.id !== conversationId) {
              return conversation;
            }

            return {
              ...conversation,

              lastMessage: {
                id: messageId,
                content: content,
                senderId: senderId,
                isRead: isSelected,
                createdAt: createdAt,
              },
              lastMessageAt: createdAt,
              unreadCount: isSelected ? 0 : (conversation.unreadCount ?? 0) + 1,
            };
          }),
        };
      });

      if (isSelected) {
        socket.emit("conversation:read", conversationId);
      }
    };

    // Conversation read
    const handleConversationRead = ({ conversationId }) => {
      queryClient.setQueriesData({ queryKey: ["conversations"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          conversations: oldData.conversations.map((conversation) =>
            conversation.id === conversationId
              ? {
                  ...conversation,
                  unreadCount: 0,
                  lastMessage: conversation.lastMessage
                    ? {
                        ...conversation.lastMessage,
                        isRead: conversation.lastMessage.senderId === userId ? conversation.lastMessage.isRead : true,
                      }
                    : null,
                }
              : conversation,
          ),
        };
      });
    };

    //Handle users online
    const handleUsersOnline = ({ userIds }) => {
      queryClient.setQueryData(["online-users"], userIds);
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

    socket.on("users:online", handleUsersOnline);
    socket.on("user:online", handleUserOnline);
    socket.on("user:offline", handleUserOffline);
    /*  socket.on("user:notification:count", handleNotificationCount); */

    return () => {
      socket.off("ship:published", handlePublishedShipNotify);
      socket.off("user:notification:new", handleNewNotification);

      socket.off("message:notification", handleMessageNotification);
      socket.off("conversation:read", handleConversationRead);

      socket.off("users:online", handleUserOnline);
      socket.off("user:online", handleUserOnline);
      socket.off("user:offline", handleUserOffline);
      /* socket.off("user:notification:count", handleNotificationCount); */
    };
  }, [userId, selectedConversationId, queryClient]);
}
