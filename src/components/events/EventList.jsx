import { useGetAllEvents } from "../../hooks/useEvents.js";

function EventList() {
  const { data } = useGetAllEvents();
  console.log(data.data);
  return <div></div>;
}

export default EventList;
