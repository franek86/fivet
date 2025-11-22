import styled from "styled-components";

import ToggleSwitch from "../ui/ToggleSwitch.jsx";
import EmptyState from "../EmptyState.jsx";
import Spinner from "../Spinner.jsx";
import Button from "../../components/ui/Button.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import Modal from "../Modal.jsx";

import { customFormatDate } from "../../utils/formatDate.js";
import { useDeleteNotification, useNotificationList, useUpdateReadNotification } from "../../hooks/useNotification.js";
import { useDispatch } from "react-redux";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 10px solid;
  border-color: ${({ $props }) => ($props ? "#15803d" : "#b91c1c")};
  background-color: var(--color-grey-0);
  letter-spacing: 0.5px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    font-size: 1.35rem;
  }
`;

function NotificationLists() {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useNotificationList();
  const { mutate } = useUpdateReadNotification();
  const { mutate: deleteNotification } = useDeleteNotification();

  if (isLoading) return <Spinner />;
  if (data.length < 1) return <EmptyState message='No notifications for now.' />;
  if (isError) return <div>Error</div>;

  const handleChange = (id, checked) => {
    mutate({ id, data: checked });
  };

  return (
    <Wrapper>
      {data.map((item) => (
        <div key={item.id}>
          <Card $props={item.isRead}>
            <div>
              <h4>{item.message}</h4>
              <p>Created at {customFormatDate(item.createdAt)}</p>
            </div>
            <Buttons>
              <SwitchWrapper>
                <p>Mark as read</p>
                <ToggleSwitch checked={item.isRead} onChange={(e) => handleChange(item.id, e.target.checked)} />
              </SwitchWrapper>
              <Button $size='small' $variation='danger' onClick={() => dispatch(openModalByName(item.id))}>
                Delete
              </Button>
            </Buttons>
          </Card>
          <Modal name={item.id} onClose={() => dispatch(closeModalByName(item.id))}>
            <ConfirmDialog
              itemName={item.id}
              onConfirm={() => deleteNotification(item.id)}
              onCloseModal={() => dispatch(closeModalByName(item.id))}
            />
          </Modal>
        </div>
      ))}
    </Wrapper>
  );
}

export default NotificationLists;
