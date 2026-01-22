import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { toggleDropdown } from "../../slices/uiSlice.js";
import { Bell } from "lucide-react";
import { markNotificationRead } from "../../slices/realtimeSlice.js";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
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
  background-color: var(--color-red-700);
  color: white;
  border-radius: 50%;
`;

const DropdownToggle = styled.div`
  position: absolute;
  left: 0;
  top: 2.5rem;
`;

const NotificationCard = styled.div`
  position: relative;
  padding: 1rem 2rem;
  background-color: var(--color-grey-0);
  color: var(--color-brand-900);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);
  width: max-content;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  p {
    font-size: 1.35rem;
    font-weight: 600;
  }
  span {
    font-size: 1rem;
    display: block;
  }
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
  font-size: 1.2rem;
  font-weight: bold;
  background-color: var(--color-red-700);
  color: white;
  border-radius: 50%;
  z-index: 9;
  cursor: pointer;
`;

export default function NotificationIcon() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const notifications = useSelector((state) => state.realtime.notifications);
  const unreadCount = useSelector((state) => state.realtime.notifications.filter((n) => !n.read && n.scope === "ADMIN").length);
  const isToggleDropdown = useSelector((state) => state.ui.isDropdownOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(toggleDropdown(false));
      }
    }

    if (isToggleDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggleDropdown, dispatch]);

  const markAsRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  return (
    <Wrapper ref={dropdownRef}>
      <Bell size={22} onClick={() => dispatch(toggleDropdown())} />
      {unreadCount > 0 && <Count>{unreadCount}</Count>}

      {isToggleDropdown && (
        <DropdownToggle>
          {notifications.length === 0 && <NotificationCard>No new notifications</NotificationCard>}
          {notifications.map((n) => (
            <NotificationCard key={n.id}>
              <DeleteCircle onClick={() => markAsRead(n.id)}>x</DeleteCircle>
              <p>{n.message}</p>
              <span>{n.createdAt}</span>
            </NotificationCard>
          ))}
        </DropdownToggle>
      )}
    </Wrapper>
  );
}
