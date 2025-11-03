import { IoMdNotifications } from "react-icons/io";
import styled from "styled-components";
import { useNotificationSocket } from "../../hooks/useNotification.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleDropdown } from "../../slices/uiSlice.js";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: red;
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
  width: max-content;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
`;

export default function NotificationIcon({ count }) {
  const { notifications, setNotifications, setUnreadCount } = useNotificationSocket();
  const dispatch = useDispatch();
  const isToggleDropdown = useSelector((state) => state.ui.isDropdownOpen);

  const markAsRead = (shipId) => {
    setNotifications((prev) => prev.filter((n) => n.shipId !== shipId));
    setUnreadCount((prev) => prev - 1);
  };

  return (
    <Wrapper>
      <IoMdNotifications size={25} onClick={() => dispatch(toggleDropdown())} />
      {count > 0 && <Count>{count}</Count>}

      {isToggleDropdown && (
        <DropdownToggle>
          {notifications.length === 0 && <div>No new notifications</div>}
          {notifications.map((n) => (
            <div
              key={n.shipId}
              style={{ padding: "0.5rem", borderBottom: "1px solid #ccc", cursor: "pointer" }}
              onClick={() => markAsRead(n.shipId)}
            >
              <strong>{n.shipName}</strong> by {n.createdBy}
              <div style={{ fontSize: "0.75rem", color: "#555" }}>{n.createdAt}</div>
            </div>
          ))}
        </DropdownToggle>
      )}
    </Wrapper>
  );
}
