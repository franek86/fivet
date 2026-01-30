import CustomBigCalendar from "../CustomBigCalendar.jsx";
import Modal from "../Modal.jsx";
import { useGetAllEvents } from "../../hooks/useEvents.js";

import EventRenderContent from "./EventRenderContent.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

function EventCalendar() {
  const { data, isLoading } = useGetAllEvents();

  if (isLoading) return <TablePlaceholder count={6} />;

  return (
    <CustomBigCalendar
      data={data.events}
      renderEventModal={(event, onClose) => (
        <Modal name={event.id} onClose={onClose}>
          <EventRenderContent data={event} />
        </Modal>
      )}
    />
  );
}

export default EventCalendar;
