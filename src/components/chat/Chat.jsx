import { useState } from "react";
import styled from "styled-components";
import { Send, Search, Paperclip } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "John Smith",
    role: "Owner",
    lastMessage: "Yes, that works for me.",
    time: "10:42",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Owner",
    lastMessage: "Can you send me the vessel details?",
    time: "09:18",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Broker",
    lastMessage: "I will get back to you tomorrow.",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
];

const initialMessages = [
  {
    id: 1,
    senderId: "owner",
    text: "Hi, thanks for contacting me.",
    time: "10:35",
  },
  {
    id: 2,
    senderId: "me",
    text: "Hi John. I would like to discuss the vessel you have available.",
    time: "10:36",
  },
  {
    id: 3,
    senderId: "owner",
    text: "Sure. Which vessel are you interested in?",
    time: "10:38",
  },
  {
    id: 4,
    senderId: "me",
    text: "I'm interested in the tanker available for sale.",
    time: "10:40",
  },
  {
    id: 5,
    senderId: "owner",
    text: "Yes, that vessel is still available.",
    time: "10:41",
  },
  {
    id: 6,
    senderId: "me",
    text: "Great. Could you send me the full specifications?",
    time: "10:42",
  },
];

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: "me",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

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
              $active={selectedConversation.id === conversation.id}
              onClick={() => setSelectedConversation(conversation)}
            >
              <Avatar>
                {conversation.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}

                {conversation.online && <OnlineDot />}
              </Avatar>

              <ConversationContent>
                <ConversationTop>
                  <Name>{conversation.name}</Name>
                  <Time>{conversation.time}</Time>
                </ConversationTop>

                <ConversationBottom>
                  <LastMessage>{conversation.lastMessage}</LastMessage>

                  {conversation.unread > 0 && <Unread>{conversation.unread}</Unread>}
                </ConversationBottom>

                <Role>{conversation.role}</Role>
              </ConversationContent>
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>

      {/* Chat */}
      <ChatContainer>
        <ChatHeader>
          <UserInfo>
            <Avatar>
              {selectedConversation.name
                .split(" ")
                .map((name) => name[0])
                .join("")}

              {selectedConversation.online && <OnlineDot />}
            </Avatar>

            <div>
              <ChatName>{selectedConversation.name}</ChatName>

              <Status>
                <StatusDot />
                {selectedConversation.online ? "Online" : "Offline"}
              </Status>
            </div>
          </UserInfo>
        </ChatHeader>

        <Messages>
          {messages.map((msg) => {
            const isMine = msg.senderId === "me";

            return (
              <MessageRow key={msg.id} $mine={isMine}>
                <MessageBubble $mine={isMine}>
                  <MessageText>{msg.text}</MessageText>

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

          <SendButton type='submit' disabled={!message.trim()}>
            <Send size={18} />
          </SendButton>
        </MessageForm>
      </ChatContainer>
    </ChatWrapper>
  );
}

/* =========================
   Layout
========================= */

const ChatWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 700px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
`;

/* =========================
   Sidebar
========================= */

const Sidebar = styled.aside`
  width: 340px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
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

const Role = styled.div`
  margin-top: 4px;
  font-size: 11px;
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
