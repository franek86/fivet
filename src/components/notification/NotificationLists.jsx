import styled from "styled-components";

import Spinner from "../Spinner.jsx";
import { useNotificationList, useUpdateReadNotification } from "../../hooks/useNotification.js";
import { customFormatDate } from "../../utils/formatDate.js";
import ToggleSwitch from "../ui/ToggleSwitch.jsx";

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

function NotificationLists() {
  const { data, isLoading, isError } = useNotificationList();
  const { mutate } = useUpdateReadNotification();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

  const handleChange = (id, checked) => {
    console.log({ id, data: checked });
    mutate({ id, checked });
  };

  return (
    <Wrapper>
      {data.map((item) => (
        <Card key={item.id} $props={item.isRead}>
          <div>
            <h4>{item.message}</h4>
            <p>Created at {customFormatDate(item.createdAt)}</p>
          </div>
          <div>
            Mark as read
            <ToggleSwitch checked={item.isRead} onChange={(e) => handleChange(item.id, e.target.checked)} />
          </div>
        </Card>
      ))}
    </Wrapper>
  );
}

export default NotificationLists;
