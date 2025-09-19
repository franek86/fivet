import SearchBar from "../components/SearchBar.jsx";
import Title from "../components/ui/Title.jsx";
import AddEvent from "../components/events/AddEvent.jsx";
import EventList from "../components/events/EventList.jsx";

function Events() {
  return (
    <>
      <div class='search-container'>
        <Title tag='h1'>Events</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddEvent />
        </div>
      </div>
      <EventList />
    </>
  );
}

export default Events;
