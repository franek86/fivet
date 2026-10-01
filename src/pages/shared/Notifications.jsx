import Title from "../../components/ui/Title.jsx";
import NotificationLists from "../../components/notification/NotificationLists.jsx";

function Notifications() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Notifications</Title>
      </div>
      <NotificationLists />
    </>
  );
}

export default Notifications;
