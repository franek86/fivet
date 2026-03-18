import SearchBar from "../components/SearchBar.jsx";
import Title from "../components/ui/Title.jsx";
import AddEvent from "../components/events/AddEvent.jsx";
import EventCalendar from "../components/events/EventCalendar.jsx";
import styled from "styled-components";
import AsideEvents from "../components/events/AsideEvents.jsx";

const EventWrapper = styled.main`
  display: grid;
  gap: 1.5rem;

  @media screen and (min-width: 992px) {
    grid-template-columns: 1fr minmax(0, 25rem);
  }
`;

const MainSection = styled.section`
  order: 2;
  @media screen and (min-width: 992px) {
    order: 1;
  }
`;

const SidebarSection = styled.section`
  order: 1;
  @media screen and (min-width: 992px) {
    order: 2;
  }
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
        <MainSection>
          <EventCalendar />
        </MainSection>
        <SidebarSection>
          <AsideEvents />
        </SidebarSection>
      </EventWrapper>
    </>
  );
}

export default Events;
