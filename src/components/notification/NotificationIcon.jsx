import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import styled from "styled-components";
import { Bell, BellOff, X } from "lucide-react";

import { markNotificationRead } from "../../slices/realtimeSlice.js";
import { toggleDropdown } from "../../slices/uiSlice.js";
import { useAllUnreadNotification, useNotificationCount, useUpdateReadNotification } from "../../hooks/useNotification.js";
import { customFormatDate } from "../../utils/formatDate.js";
import Spinner from "../Spinner.jsx";

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  cursor: pointer;
  background-color: var(--color-white);
  width: 40px;
  height: 40px;
  border-radius: 12px;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  font-weight: bold;
  background-color: var(--color-danger);
  color: var(--color-white);
  border-radius: 50%;
`;

const DropdownToggle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
  position: absolute;
  left: 0;
  top: 3.5rem;
  background-color: var(--color-white);
  box-shadow: var(--box-shadow-lg);
  z-index: 2;
`;

const NotificationCard = styled.div`
  position: relative;
  color: var(--color-text);
  border-radius: var(--border-radius-md);
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;

  .content {
    padding: 1rem 2rem;
    background-color: var(--color-white);
    p {
      font-size: 1.35rem;
      font-weight: 600;
    }
    span {
      font-size: 1rem;
      display: block;
    }
  }
`;

const NotificationMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  font-size: 1.3rem;
  color: var(--color-text-muted);
`;

const DeleteCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0.2rem;
  background-color: var(--color-danger);
  color: white;
  border-radius: 50%;
  z-index: 9;
  cursor: pointer;
`;

export default function NotificationIcon() {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useAllUnreadNotification();
  //const { data: count } = useNotificationCount();
  const { mutate: markAsRead, isPending } = useUpdateReadNotification();

  const notifications = data?.notifications ?? [];
  const count = data?.unreadCount ?? 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (isLoading) return <Spinner />;

  return (
    <Wrapper ref={dropdownRef}>
      <Bell size={20} onClick={() => setOpen((prev) => !prev)} />
      {count > 0 && <Count>{count}</Count>}

      {open && (
        <DropdownToggle>
          {notifications.length === 0 && (
            <NotificationCard>
              <NotificationMsg>
                <BellOff />
                We'll you keep updated <br /> on any feature notifications
              </NotificationMsg>
            </NotificationCard>
          )}
          {notifications.map((n) => (
            <NotificationCard key={n.id}>
              <DeleteCircle onClick={() => markAsRead({ id: n.id, data: true })}>
                <X />
              </DeleteCircle>
              <div className='content'>
                <p>{n.message}</p>
                <span>{customFormatDate(n.createdAt)}</span>
              </div>
            </NotificationCard>
          ))}
        </DropdownToggle>
      )}
    </Wrapper>
  );
}
