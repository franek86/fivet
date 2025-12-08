import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { toggleDropdown } from "../../slices/uiSlice.js";
import { Bell } from "lucide-react";

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

export default function NotificationIcon() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const notifications = useSelector((state) => state.notifications.notifications);
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
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

  const markAsRead = (shipId) => {
    console.log(shipId);
  };

  return (
    <Wrapper ref={dropdownRef}>
      <Bell size={25} onClick={() => dispatch(toggleDropdown())} />
      {unreadCount > 0 && <Count>{unreadCount}</Count>}

      {isToggleDropdown && (
        <DropdownToggle>
          {notifications.length === 0 && <div>No new notifications</div>}
          {notifications.map((n) => (
            <div key={n.id}>
              <div onClick={() => markAsRead(n.id)}>
                <p>{n.message}</p>
                <span>{n.createdAt}</span>
              </div>
            </div>
          ))}
        </DropdownToggle>
      )}
    </Wrapper>
  );
}
