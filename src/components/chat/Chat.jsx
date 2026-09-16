import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { Send, Search, Paperclip } from "lucide-react";

import socket from "../../shared/socket.js";
import { fetchChatConversationApi, fetchChatMessagesApi } from "../../services/apiChat.js";
import Spinner from "../Spinner.jsx";
import { useUser } from "../../hooks/useAuth.js";

export default function Chat() {
  const { data: user } = useUser();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  /* get conversation */
  const { data, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchChatConversationApi(),
  });

  /* Get messages */
  useEffect(() => {
    if (!selectedConversation) return;

    const loadMessages = async () => {
      try {
        const messages = await fetchChatMessagesApi(selectedConversation.id);
        setMessages(messages);
      } catch (error) {
        console.log(error);
      }
    };

    loadMessages();
  }, [selectedConversation]);

  /* Handle real time messages */
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("new message ==== ", newMessage);
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

  /* Join room */
  useEffect(() => {
    if (!selectedConversation) return;

    socket.emit("conversation:join", selectedConversation.id);
  }, [selectedConversation]);

  /* Handle new message */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation) {
      return;
    }
    console.log("message send ===== ");
    socket.emit("message:send", { conversationId: selectedConversation.id, content: message.trim() });
    setMessage("");
  };

  if (isLoading) return <Spinner />;

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
          {data.conversations?.map((conversation) => (
            <Conversation
              key={conversation.id}
              $active={selectedConversation?.id === conversation.id}
              onClick={() => setSelectedConversation(conversation)}
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
                <OnlineDot />
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
                {selectedConversation.user?.avatar ? selectedConversation.user?.avatar : <div>A</div>}

                {/* {selectedConversation.online && <OnlineDot />} */}
              </Avatar>

              <div>
                <ChatName>{selectedConversation.user?.name}</ChatName>
                {/* 
                <Status>
                  <StatusDot />
                  {selectedConversation.online ? "Online" : "Offline"}
                </Status> */}
              </div>
            </UserInfo>
          </ChatHeader>

          <Messages>
            {messages?.map((msg) => {
              const isMine = msg.senderId === user?.id;

              return (
                <MessageRow key={msg.id} $mine={isMine}>
                  <MessageBubble $mine={isMine}>
                    <MessageText>{msg.content}</MessageText>

                    <MessageTime>{msg.time}</MessageTime>
                  </MessageBubble>
                </MessageRow>
              );
            })}
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

const Status = styled.div`
  margin-top: 3px;

  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 12px;
  color: var(--color-text-muted);
`;

const StatusDot = styled.span`
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--color-success-600);
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
`;

const MessageBubble = styled.div`
  max-width: 65%;

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

  text-align: right;

  font-size: 10px;

  color: var(--color-white);
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
