import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import styled from "styled-components";
import { Bell, CheckCheck } from "lucide-react";

import { markNotificationRead } from "../../slices/realtimeSlice.js";
import { toggleDropdown } from "../../slices/uiSlice.js";
import { customFormatDate } from "../../utils/formatDate.js";
import { useAllUnreadNotification, useUpdateReadNotification } from "../../hooks/useNotification.js";
import { useClickOutSide } from "../../hooks/useClickOutside.js";

import Spinner from "../Spinner.jsx";

const Container = styled.div`
  position: relative;
`;

const BellButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover {
    background: var(--color-border);
  }
`;

const UnreadBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border: 2px solid white;
  border-radius: 999px;
  background: var(--color-danger-600);
  color: var(--color-white);
  font-size: 9px;
  font-weight: 700;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  width: 390px;
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  z-index: 1000;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  border-bottom: 1px solid var(--color-border);
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 600;
`;

const UnreadCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--color-danger-600);
  color: var(--color-white);
  font-size: 12px;
`;

const MarkAllButton = styled.button`
  border: none;
  background: transparent;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: var(--color-border);
  }
`;

const NotificationItem = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 16px 18px;
  background: ${({ $isRead }) => ($isRead ? "var(--color-bg)" : "#f8fafc")};
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: var(--color-border);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UnreadDot = styled.span`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--color-danger-600);
`;

const NotificationTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
`;

const NotificationList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;
const NotificationTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const NotificationDate = styled.span`
  flex-shrink: 0;
  color: var(--color-text-muted);
  font-size: 11px;
`;
const NotificationMessage = styled.p`
  margin: 4px 0 0;
  color: var(--color-text-muted);
  font-size: 12px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const SeeMoreButton = styled.button`
  width: 100%;
  padding: 13px 16px;
  border: none;
  border-top: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: var(--color-bg);
  }
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--color-gray-200);
  font-size: 14px;
`;

export default function NotificationIcon() {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useAllUnreadNotification();
  const { mutate: markAsRead } = useUpdateReadNotification();

  const notifications = data?.notifications ?? [];
  const count = data?.unreadCount ?? 0;

  useClickOutSide(dropdownRef, () => setOpen(false));

  if (isLoading) return <Spinner />;

  return (
    <Container ref={dropdownRef}>
      <BellButton onClick={() => setOpen((prev) => !prev)}>
        <Bell size={22} />
        {count > 0 && <UnreadBadge> {count > 99 ? "99+" : count} </UnreadBadge>}
      </BellButton>

      {open && (
        <Dropdown>
          <DropdownHeader>
            <HeaderTitle>
              Notifications
              {count > 0 && <UnreadCount>{count}</UnreadCount>}
            </HeaderTitle>

            {count > 0 && (
              <MarkAllButton type='button'>
                <CheckCheck size={14} /> Mark all as read
              </MarkAllButton>
            )}
          </DropdownHeader>

          {notifications.length === 0 ? (
            <EmptyState>
              <Bell size={28} /> <span>No notifications</span>
            </EmptyState>
          ) : (
            <NotificationList>
              {notifications.map((n) => (
                <NotificationItem key={n.id} $isRead={n.isRead} onClick={() => markAsRead({ id: n.id, data: true })}>
                  {!n.isRead && <UnreadDot />}
                  <NotificationContent>
                    <NotificationTop>
                      <NotificationTitle>Hello</NotificationTitle>

                      <NotificationDate>{customFormatDate(n.createdAt)}</NotificationDate>
                    </NotificationTop>

                    <NotificationMessage>{n.message}</NotificationMessage>
                  </NotificationContent>
                </NotificationItem>
              ))}
            </NotificationList>
          )}

          <SeeMoreButton type='button'>See more notifications</SeeMoreButton>
        </Dropdown>
      )}
    </Container>
  );
}
