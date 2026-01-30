import SearchBar from "../components/SearchBar.jsx";
import Title from "../components/ui/Title.jsx";
import AddEvent from "../components/events/AddEvent.jsx";
import EventCalendar from "../components/events/EventCalendar.jsx";
import styled from "styled-components";
import AsideEvents from "../components/events/AsideEvents.jsx";

const EventWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr minmax(0, 25rem);
  gap: 1.5rem;
`;

function Events() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Events</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddEvent />
        </div>
      </div>
      <EventWrapper>
        <EventCalendar />
        <AsideEvents />
      </EventWrapper>
    </>
  );
}

export default Events;
