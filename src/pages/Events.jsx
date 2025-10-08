import SearchBar from "../components/SearchBar.jsx";
import Title from "../components/ui/Title.jsx";
import AddEvent from "../components/events/AddEvent.jsx";
import EventCalendar from "../components/events/EventCalendar.jsx";

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
      <EventCalendar />
    </>
  );
}

export default Events;
