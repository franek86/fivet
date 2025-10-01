import React from "react";
import Title from "../components/ui/Title.jsx";
import SearchBar from "../components/SearchBar.jsx";
import NotificationLists from "../components/notification/NotificationLists.jsx";

function Notifications() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Notifications</Title>
        <div className='search-container-right'>
          <div></div>
          <SearchBar />
        </div>
      </div>
      <NotificationLists />
    </>
  );
}

export default Notifications;
