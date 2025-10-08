import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

import EmptyState from "./EmptyState.jsx";
import moment from "moment";

import styled from "styled-components";
import { closeModalByName, openModalByName } from "../slices/modalSlice.js";

const CalendarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  background: var(--color-grey-0);
  border-radius: 12px;
  overflow: hidden;
  padding: 1rem;
  margin-top: 4rem;

  .no-events {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 1.125rem;
    font-weight: 500;
  }

  /* toolbar */
  .rbc-toolbar {
    font-size: 1.3rem;
  }

  .rbc-toolbar button.rbc-active {
    background-color: var(--color-brand-200);
  }

  /* --- Day slot events --- */
  .rbc-event {
    border: none;
    border-radius: 8px;
    padding: 2px 6px;
    font-size: 1.3rem;
    color: white;
    transition: all 0.2s ease;
  }

  /* today */
  .rbc-today {
    background-color: var(--color-brand-200);
  }

  /* Hover efekat */
  .rbc-event:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  .rbc-event.low {
    background-color: #3b82f6;
  }

  .rbc-event.medium {
    background-color: #facc15;
    color: #1f2937;
  }

  .rbc-event.high {
    background-color: #ef4444;
  }

  /* Responsive */
  @media (max-width: 768px) {
    height: 60vh;
    font-size: 0.75rem;
  }
`;

function CustomBigCalendar({ data = [], renderEventModal }) {
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  const handleSelect = (event) => {
    setSelected(event);
    dispatch(openModalByName(event.id));
  };

  const handleClose = () => {
    dispatch(closeModalByName(selected?.id));
    setSelected(null);
  };

  return (
    <div>
      {data.length === 0 ? (
        <EmptyState message='There are no events available. Please add event.' />
      ) : (
        <>
          <CalendarWrapper>
            <Calendar
              localizer={localizer}
              events={data}
              startAccessor='start'
              endAccessor='end'
              eventPropGetter={(event) => ({
                className: event.priority?.toLowerCase() || "low",
              })}
              onSelectEvent={handleSelect}
            />
          </CalendarWrapper>

          {selected && renderEventModal && renderEventModal(selected, handleClose)}
        </>
      )}
    </div>
  );
}

export default CustomBigCalendar;
