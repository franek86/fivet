import Spinner from "../Spinner.jsx";
import CustomBigCalendar from "../CustomBigCalendar.jsx";
import Modal from "../Modal.jsx";
import { useGetAllEvents } from "../../hooks/useEvents.js";

import EventRenderContent from "./EventRenderContent.jsx";

function EventCalendar() {
  const { data, isPending, isError } = useGetAllEvents();

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;
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
