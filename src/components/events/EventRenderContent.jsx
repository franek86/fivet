import { useState } from "react";
import moment from "moment";

import Button from "../ui/Button.jsx";

import styled from "styled-components";
import { useDeleteEvent } from "../../hooks/useEvents.js";
import { useDispatch } from "react-redux";
import { closeModalByName } from "../../slices/modalSlice.js";
import { setIsDrawerOpen } from "../../slices/uiSlice.js";

const Wrapper = styled.div`
  padding: 1rem;
`;

const Status = styled.div`
  max-width: max-content;
  font-size: 1rem;
  color: var(--color-grey-0);
  padding: 0.65rem;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  border-radius: var(--border-radius-md);

  background-color: ${({ $status }) => {
    switch ($status) {
      case "DONE":
        return "#51cab2";
      case "CANCALLED":
        return "#b91c1c";
      case "PLANNED":
        return "#312e81";
      default:
        return "#d1d5db";
    }
  }};
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1rem 0;
`;

const DateText = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.25rem;
  background-color: var(--color-grey-200);
  padding: 0.35rem 0.7rem;
  border-radius: var(--border-radius-md);
`;

const Content = styled.div``;

const PriorityDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.3rem 0;
`;

const Priority = styled.span`
  color: ${({ $priority }) => {
    switch ($priority) {
      case "HIGH":
        return "#b91c1c";
      case "MEDIUM":
        return "#facc15";
      case "LOW":
        return "#51cab2";
      default:
        return "#d1d5db";
    }
  }};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ConfirmWrap = styled.div`
  display: flex;
  gap: 1rem;
`;

function EventRenderContent({ data }) {
  const [confirm, setConfirm] = useState(false);
  const { mutate } = useDeleteEvent();
  const dispatch = useDispatch();
  const { id, title, description, start, end, status, priority } = data;

  const handleConfirm = () => {
    setConfirm(true);
  };

  const handleDelete = (id) => {
    mutate(id);
    dispatch(closeModalByName(id));
  };

  return (
    <Wrapper>
      <Status $status={status}>{status}</Status>
      <DateWrapper>
        <DateText>
          <span>
            <strong>Start:</strong>
          </span>
          <span>{moment(start).utc().format("dddd, Do MMMM YYYY")}</span>
          <span>&#124;</span>
          <span>{moment(start).utc().format("HH:mm")}</span>
        </DateText>

        <DateText>
          <span>
            <strong>End</strong>
          </span>
          <span>{moment(end).utc().format("dddd, Do MMMM YYYY")}</span>
          <span>&#124;</span>
          <span>{moment(end).utc().format("HH:mm")}</span>
        </DateText>
      </DateWrapper>

      <Content>
        <h2>{title}</h2>
        <p>{description}</p>
        <PriorityDiv>
          <p>Priority: </p>
          <Priority $priority={priority}>{priority}</Priority>
        </PriorityDiv>
      </Content>

      <Footer>
        <Button $size='small' $variation='third' onClick={() => dispatch(setIsDrawerOpen())}>
          Edit
        </Button>

        {confirm ? (
          <ConfirmWrap>
            <Button $size='small' $variation='danger' onClick={() => handleDelete(id)}>
              Yes
            </Button>
            <Button $size='small' $variation='third' onClick={() => setConfirm(false)}>
              Cancel
            </Button>
          </ConfirmWrap>
        ) : (
          <Button $size='small' $variation='danger' onClick={handleConfirm}>
            Delete
          </Button>
        )}
      </Footer>
    </Wrapper>
  );
}

export default EventRenderContent;
