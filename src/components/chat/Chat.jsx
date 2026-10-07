import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Send, Search, Paperclip } from "lucide-react";

import Spinner from "../Spinner.jsx";

import { fetchChatConversationApi, fetchChatMessagesApi } from "../../services/apiChat.js";

import socket from "../../shared/socket.js";
import { useUser } from "../../hooks/useAuth.js";

export default function Chat() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const scrollToBottomRef = useRef(null);

  /* get conversation */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchChatConversationApi(),
  });

  const conversations = data?.conversations ?? [];

  /* get online user from socket */
  const { data: onlineUsersIds = [] } = useQuery({
    queryKey: ["online-users"],
    queryFn: () => [],
    staleTime: Infinity,
  });
  const onlineUsers = new Set(onlineUsersIds);

  /* Get messages */
  useEffect(() => {
    if (!selectedConversation?.id) {
      setMessages([]);
      return;
    }

    let cancelled = false;

    const loadMessages = async () => {
      try {
        setMessages([]);
        const result = await fetchChatMessagesApi(selectedConversation.id);
        if (!cancelled) {
          setMessages(result);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load chat messages:", error);
        }
      }
    };

    loadMessages();
  }, [selectedConversation]);

  /* Handle real time messages */
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.conversationId !== selectedConversation?.id) {
        return;
      }

      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [selectedConversation]);

  /* Join or leave conversation */
  useEffect(() => {
    const conversationId = selectedConversation?.id;
    if (!conversationId) {
      return;
    }

    socket.emit("conversation:join", conversationId);

    return () => {
      socket.emit("conversation:leave", conversationId);
    };
  }, [selectedConversation?.id]);

  /* Handle new message */
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.conversationId !== selectedConversation?.id) {
        return;
      }
      setMessages((previousMessages) => {
        const exists = previousMessages.some((item) => item.id === newMessage.id);
        if (exists) {
          return previousMessages;
        }
        return [...previousMessages, newMessage];
      });
    };
    socket.on("message:new", handleNewMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [selectedConversation?.id]);

  /* Select conversation */
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessage("");
    socket.emit("conversation:read", conversation.id);
    queryClient.invalidateQueries({
      queryKey: ["conversations"],
    });
  };

  /* Handle send message */
  const handleSendMessage = (event) => {
    event.preventDefault();
    const content = message.trim();
    if (!content || !selectedConversation?.id) {
      return;
    }
    socket.emit("message:send", { conversationId: selectedConversation.id, content });
    setMessage("");
  };

  /* Auto scroll */
  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <ChatWrapper>
        <EmptyChat>
          <h3>Unable to load conversations</h3> <p> Please try again later. </p>
        </EmptyChat>
      </ChatWrapper>
    );
  }

  return (
    <ChatWrapper>
      {/* Conversations */}
      <Sidebar>
        <SidebarHeader>
          <Title>Messages</Title>
        </SidebarHeader>

        <SearchWrapper>
          <Search size={18} />
          <SearchInput placeholder='Search conversations...' />
        </SearchWrapper>

        <ConversationList>
          {conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              $active={selectedConversation?.id === conversation.id}
              onClick={() => handleSelectConversation(conversation)}
            >
              <Avatar>
                {conversation.user.avatar ? (
                  <img src={conversation.user.avatar} alt={conversation.user.name} />
                ) : (
                  conversation.user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                )}

                {onlineUsers.has(conversation.user.id) && <OnlineDot />}
              </Avatar>

              <ConversationContent>
                <ConversationTop>
                  <Name>{conversation.user?.name}</Name>
                  <Time>
                    {conversation.lastMessageAt
                      ? new Date(conversation.lastMessageAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </Time>
                </ConversationTop>

                <ConversationBottom>
                  <LastMessage> {conversation.lastMessage?.content ?? "No messages yet"}</LastMessage>

                  {conversation.unreadCount > 0 && <Unread>{conversation.unreadCount}</Unread>}
                </ConversationBottom>
              </ConversationContent>
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>

      {/* No conversation selected */}
      {!selectedConversation ? (
        <ChatContainer>
          <EmptyChat>
            <h3>Select a conversation</h3>
            <p> Choose a conversation to start messaging. </p>
          </EmptyChat>
        </ChatContainer>
      ) : (
        <ChatContainer>
          <ChatHeader>
            <UserInfo>
              <Avatar>
                {selectedConversation.user?.avatar ? (
                  selectedConversation.user?.avatar
                ) : (
                  <div>
                    {}
                    {selectedConversation.user?.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>
                )}
              </Avatar>

              <div>
                <ChatName>{selectedConversation.user?.name}</ChatName>
              </div>
            </UserInfo>
          </ChatHeader>

          <Messages>
            {messages?.map((msg) => {
              const isMine = msg.senderId === user?.id;

              return (
                <MessageRow key={msg.id} $mine={isMine}>
                  <MessageAvatar $mine={isMine}>
                    <Avatar>
                      {msg.sender?.avatar ? (
                        <img src={conversation.user.avatar} alt={conversation.user.name} />
                      ) : (
                        msg.sender?.fullName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                      )}
                    </Avatar>
                  </MessageAvatar>

                  <MessageContent $mine={isMine}>
                    <MessageBubble $mine={isMine}>
                      <MessageText>{msg.content}</MessageText>
                    </MessageBubble>
                    <MessageTime $mine={isMine}>
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}{" "}
                    </MessageTime>
                  </MessageContent>
                </MessageRow>
              );
            })}

            <div ref={scrollToBottomRef} />
          </Messages>

          <MessageForm onSubmit={handleSendMessage}>
            <AttachButton type='button'>
              <Paperclip size={20} />
            </AttachButton>

            <MessageInput value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Write a message...' />

            <SendButton type='submit' disabled={!message}>
              <Send size={18} />
            </SendButton>
          </MessageForm>
        </ChatContainer>
      )}
    </ChatWrapper>
  );
}

/* =========================
   Layout
========================= */

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

/* =========================
   Sidebar
========================= */

const EmptyChat = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Sidebar = styled.aside`
  width: 100%;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 640px) {
    width: 340px;
  }
`;

const SidebarHeader = styled.div`
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
`;

const SearchWrapper = styled.div`
  margin: 16px;
  height: 40px;
  padding: 0 12px;

  display: flex;
  align-items: center;
  gap: 8px;

  background: var(--color-white);
  border-radius: 8px;

  color: var(--color-text-muted);
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 10px 12px;
  font-size: 14px;

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const ConversationList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Conversation = styled.div`
  padding: 14px 16px;
  display: flex;
  gap: 12px;

  cursor: pointer;

  background: ${({ $active }) => ($active ? "var(--color-success)" : "var(--color-white)")};

  &:hover {
    background: var(--color-success);
  }
`;

const ConversationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ConversationTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ConversationBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
`;

const Time = styled.span`
  font-size: 11px;
  color: var(--color-text-muted);
  white-space: nowrap;
`;

const LastMessage = styled.div`
  flex: 1;
  min-width: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 13px;
  color: var(--color-text-muted);
`;

const Unread = styled.span`
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-danger-600);
  color: var(--color-white);

  font-size: 11px;
  font-weight: 600;
`;

/* =========================
   Avatar
========================= */

const Avatar = styled.div`
  position: relative;

  width: 42px;
  height: 42px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-border);
  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;
`;

const OnlineDot = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;

  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: var(--color-success-600);

  border: 2px solid var(--color-white);
`;

/* =========================
   Chat
========================= */

const ChatContainer = styled.main`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.header`
  height: 70px;

  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--color-border);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ChatName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
`;

/* =========================
   Messages
========================= */

const Messages = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
  gap: 1rem;
`;

const MessageAvatar = styled.div`
  order: ${({ $mine }) => ($mine ? "2" : "1")};
`;

const MessageContent = styled.div`
  order: ${({ $mine }) => ($mine ? "1" : "2")};
`;

const MessageBubble = styled.div`
  min-width: 10rem;
  padding: 10px 13px;
  border-radius: ${({ $mine }) => ($mine ? "14px 14px 3px 14px" : "14px 14px 14px 3px")};
  background: ${({ $mine }) => ($mine ? "var(--color-accent)" : "var(--color-white)")};
  color: ${({ $mine }) => ($mine ? "var(--color-white)" : "var(--color-text)")};
  box-shadow: ${({ $mine }) => ($mine ? "none" : "var(--shadow-md)")};
`;

const MessageText = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

const MessageTime = styled.div`
  margin-top: 4px;
  text-align: center;
  font-size: 10px;
  color: var(--color-text);
`;

/* =========================
   Message Form
========================= */

const MessageForm = styled.form`
  min-height: 70px;

  padding: 12px 16px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-top: 1px solid var(--color-border);

  background: var(--color-white);
`;

const MessageInput = styled.input`
  flex: 1;

  height: 42px;

  padding: 0 14px;

  border: 1px solid var(--color-border);
  border-radius: 8px;

  outline: none;

  font-size: 14px;

  &:focus {
    border-color: var(--color-accent);
  }
`;

const AttachButton = styled.button`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;

  color: var(--color-text-muted);

  cursor: pointer;

  &:hover {
    color: var(--color-text);
  }
`;

const SendButton = styled.button`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 8px;

  background: var(--color-accent);
  color: var(--color-white);

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: var(--color-accent);
  }
`;
