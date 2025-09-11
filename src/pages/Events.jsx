import styled from "styled-components";
import SearchBar from "../components/SearchBar.jsx";
import Title from "../components/ui/Title.jsx";
import AddEvent from "../components/events/AddEvent.jsx";
import EventList from "../components/events/EventList.jsx";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

function Events() {
  return (
    <>
      <Flex>
        <Title tag='h1'>Events</Title>
        <SearchBar />
        <AddEvent />
      </Flex>
      <EventList />
    </>
  );
}

export default Events;
