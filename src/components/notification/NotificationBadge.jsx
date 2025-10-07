import { Link } from "react-router";
import { IoMdNotifications, IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";
import Button from "../ui/Button.jsx";
import EmptyState from "../EmptyState.jsx";

import { customFormatDate } from "../../utils/formatDate.js";
import { useAllUnreadNotification } from "../../hooks/useNotification.js";
import { useDispatch, useSelector } from "react-redux";
import { closeDropdown, toggleDropdown } from "../../slices/uiSlice.js";

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
  right: -10px;
  top: -10px;
  font-size: 1rem;
  font-weight: 600;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  padding: 0.5rem;
  border-radius: 50%;
`;

const DropdownWrapper = styled.div`
  display: flex;
  width: max-content;
  background-color: rgba(255, 255, 255, 0.95);
  flex-direction: column;
  position: absolute;
  padding: 1.2rem;
  gap: 0.8rem;
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);
  z-index: 5;
`;

const Close = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
`;

const Card = styled.div`
  width: 25rem;
  height: auto;
  padding: 1rem;
  color: var(--color-grey-0);
  background-color: var(--color-brand-500);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-md);

  p {
    font-size: 1.25rem;
    font-style: italic;
  }
`;

function NotificationBadge() {
  const { data } = useAllUnreadNotification();
  const dispatch = useDispatch();
  const isToggleDropdown = useSelector((state) => state.ui.isDropdownOpen);

  return (
    <>
      <Wrapper>
        <div onClick={() => dispatch(toggleDropdown())}>
          <Count>{data?.unreadCount}</Count>
          <IoMdNotifications size={25} />
        </div>

        {isToggleDropdown && (
          <DropdownWrapper>
            <Close onClick={() => dispatch(closeDropdown())}>
              <IoIosCloseCircle size={25} />
            </Close>
            {data?.notifications?.map((item) => (
              <Card key={item.id}>
                <h5>{item.message}</h5>
                <p>{customFormatDate(item.createdAt)}</p>
              </Card>
            ))}
            {data?.notifications.length > 0 ? (
              <Link to='/notifications' onClick={() => dispatch(closeDropdown())}>
                <Button $size='small' $variation='third'>
                  View
                </Button>
              </Link>
            ) : (
              <p>No notifications</p>
            )}
          </DropdownWrapper>
        )}
      </Wrapper>
    </>
  );
}

export default NotificationBadge;
