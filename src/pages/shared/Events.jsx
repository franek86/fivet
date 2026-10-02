import styled from "styled-components";
import Title from "../../components/ui/Title.jsx";
import EventCalendar from "../../components/events/EventCalendar.jsx";

function Events() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Events</Title>
      </div>
      <EventWrapper>
        <MainSection>
          <EventCalendar />
        </MainSection>
      </EventWrapper>
    </>
  );
}

export default Events;

const EventWrapper = styled.main`
  display: grid;
  gap: 1.5rem;
`;

const MainSection = styled.section`
  order: 2;
  @media screen and (min-width: 992px) {
    order: 1;
  }
`;
