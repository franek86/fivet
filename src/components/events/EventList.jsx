import { useState } from "react";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";

import Spinner from "../Spinner.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import EventsFilters from "./EventsFilters.jsx";
import Pagination from "../Pagination.jsx";
import { LuEye, LuEyeOff, LuSearch, LuSearchX } from "react-icons/lu";

import styled from "styled-components";
import { formatMinutes } from "../../utils/formatTime.js";
import { useDeleteEvent, useGetAllEvents } from "../../hooks/useEvents.js";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import EmptyState from "../EmptyState.jsx";
import EventEdit from "./EventEdit.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const EventCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

const EventCard = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  padding: 1.8rem;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  border-left: 10px solid;
  border-color: ${({ $priority }) => {
    switch ($priority) {
      case "LOW":
        return "#51cab2";
      case "MEDIUM":
        return "#ffc88d";
      case "HIGH":
        return "#b91c1c";
      default:
        return "#000";
    }
  }};
  cursor: pointer;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Priority = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ $priority }) => {
    switch ($priority) {
      case "low":
        return "#51cab2";
      case "medium":
        return "#ffc88d";
      case "high":
        return "#b91c1c";
      default:
        return "#000";
    }
  }};
`;

const EventCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const EventCardFooter = styled.footer`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Status = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-0);
  padding: 0.65rem 1rem;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
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

const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  padding: 1.5rem;

  a {
    font-weight: 600;
    color: var(--color-brand-500);
    &:hover {
      color: var(--color-grey-900);
    }
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.65rem;
`;

const Tag = styled.div`
  background-color: var(--color-grey-200);
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const ButtonGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.25rem;
    text-transform: uppercase;
    gap: 0.8rem;
    color: var(--color-grey-800);
    background-color: var(--color-brand-200);
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-md);
    cursor: pointer;
  }
`;

const DateCard = styled.div`
  background: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 1.2rem;
`;

const LabelDate = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const DateText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Time = styled.span`
  font-size: 1.5rem;
  color: var(--color-brand-500);
  margin-left: 6px;
`;

function EventList() {
  const [openEventId, setOpenEventId] = useState(null);
  const { data, isPending, isError } = useGetAllEvents();
  const { mutate } = useDeleteEvent();
  const dispatch = useDispatch();
  const { resetFilters } = useGetAllEvents();

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;
  const dataLength = data?.events.length;
  if (dataLength < 1) return <EmptyState message='No events for now. Please add event' />;

  const handleToggleAccordion = (id) => {
    setOpenEventId(openEventId === id ? null : id);
  };

  return (
    <Container>
      <ButtonGrid>
        <p onClick={() => dispatch(openModalByName("filter-events"))}>
          <LuSearch />
          Filter events
        </p>
        <p onClick={resetFilters}>
          <LuSearchX />
          Clear filters
        </p>
      </ButtonGrid>

      <EventCardWrapper>
        {data?.events.map((item) => (
          <div key={item.id}>
            <EventCard onClick={() => handleToggleAccordion(item.id)} $priority={item.priority}>
              <Status $status={item.status}>{item.status}</Status>
              <header>
                <h3>{item.title}</h3>
                <Priority $priority={item.priority}>{item.priority}</Priority>
              </header>

              <EventCardBody>
                <DateCard>
                  <LabelDate>Start at</LabelDate>
                  <DateText>
                    {moment(item.start).utc().format("dddd, Do MMMM YYYY")}
                    <Time>{moment(item.start).utc().format("HH:mm")}</Time>
                  </DateText>
                </DateCard>

                <DateCard>
                  <LabelDate>End at</LabelDate>
                  <DateText>
                    {moment(item.end).utc().format("dddd, Do MMMM YYYY")}
                    <Time>{moment(item.end).utc().format("HH:mm")}</Time>
                  </DateText>
                </DateCard>
              </EventCardBody>

              <EventCardFooter>
                <Button $variation='icon'>
                  <ButtonInner>
                    {openEventId === item.id ? (
                      <>
                        <LuEyeOff />
                        Close
                      </>
                    ) : (
                      <>
                        <LuEye />
                        View
                      </>
                    )}
                  </ButtonInner>
                </Button>
              </EventCardFooter>
            </EventCard>

            {openEventId === item.id && (
              <>
                <AnimatePresence>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <Accordion>
                      <div>
                        {item.tags.length > 0 && (
                          <Tags>
                            {item.tags.map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </Tags>
                        )}
                        {item.description && <p>{item.description}</p>}
                      </div>
                      <div>
                        {item.reminder && <p>Remind me {formatMinutes(item.reminder)} before</p>}
                        {item.location && (
                          <a href={item.location} target='_blank'>
                            {item.location}
                          </a>
                        )}
                      </div>
                      <EventCardFooter>
                        <Button $size='small' $variation='third' onClick={() => dispatch(openModalByName("edit-event"))}>
                          Edit
                        </Button>
                        <Button $size='small' $variation='danger' onClick={() => dispatch(openModalByName("delete-event"))}>
                          Delete
                        </Button>
                      </EventCardFooter>
                    </Accordion>
                  </motion.div>
                </AnimatePresence>

                <Modal name='edit-event' onClose={() => dispatch(closeModalByName("edit-event"))}>
                  <EventEdit editId={item.id} />
                </Modal>

                <Modal name='delete-event' onClose={() => dispatch(closeModalByName("delete-event"))}>
                  <ConfirmDialog
                    itemName={item.title}
                    onConfirm={() => mutate(item.id)}
                    onCloseModal={() => dispatch(closeModalByName("delete-event"))}
                  />
                </Modal>
              </>
            )}
          </div>
        ))}
      </EventCardWrapper>
      <Pagination count={data.total} />

      <Modal name='filter-events' onClose={() => dispatch(closeModalByName("filter-events"))}>
        <EventsFilters />
      </Modal>
    </Container>
  );
}

export default EventList;
