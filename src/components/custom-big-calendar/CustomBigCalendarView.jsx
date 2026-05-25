import styled from "styled-components";
import Button from "../ui/Button.jsx";
import { format, parseISO } from "date-fns";
import { useDeleteEvent } from "../../hooks/useEvents.js";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 18, 0.5);
  backdrop-filter: blur(5px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 20px;
`;

const CalendarModal = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 460px;
  box-shadow: var(--shadow-lg);
  animation: scaleIn 0.2s ease both;
  overflow: hidden;

  .modal-bar {
    height: 4px;
  }

  .modal-body {
    padding: 28px 28px 24px;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 6px;
  }

  .modal-meta {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-bottom: 18px;
  }

  .modal-desc {
    font-size: 12px;
    color: var(--color-text);
    line-height: 1.65;
    background: var(--color-accent);
    border-radius: var(--border-radius-md);
    padding: 14px;
    margin-bottom: 24px;
    min-height: 60px;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.93);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Priority = styled.div`
  height: 4px;
  width: 100%;
  background-color: ${({ $priority }) => {
    switch ($priority) {
      case "HIGH":
        return "#ffb29f";
      case "MEDIUM":
        return "#facc15";
      case "LOW":
        return "#51cab2";
      default:
        return "#d1d5db";
    }
  }};
`;

const CustomBigCalendarView = ({ viewEvent, setViewEvent, openEdit }) => {
  const { mutate } = useDeleteEvent();

  const fmtDate = (dateString) => {
    return format(parseISO(dateString), "MMMM d, yyyy HH:mm");
  };

  const fmtRange = (e) => {
    return e.start === e.end ? fmtDate(e.start) : `${fmtDate(e.start)} — ${fmtDate(e.end)}`;
  };

  const deleteEvent = (id) => {
    mutate(id);
    setViewEvent(null);
  };
  return (
    <Overlay onClick={() => setViewEvent(null)}>
      <CalendarModal onClick={(e) => e.stopPropagation()}>
        <Priority $priority={viewEvent.priority} />
        <div className='modal-body'>
          <h2 className='modal-title'>{viewEvent.title}</h2>
          <p className='modal-meta'>📅 {fmtRange(viewEvent)}</p>
          <p className='modal-desc'>{viewEvent.description || "No description provided."}</p>
          <ModalActions>
            <Button $variation='secondary' onClick={() => setViewEvent(null)}>
              Close
            </Button>
            <Button $variation='danger' onClick={() => deleteEvent(viewEvent.id)}>
              Delete
            </Button>
            <Button onClick={(e) => openEdit(viewEvent, e)}>Edit</Button>
          </ModalActions>
        </div>
      </CalendarModal>
    </Overlay>
  );
};

export default CustomBigCalendarView;
