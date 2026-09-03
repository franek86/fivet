import React from "react";
import ShipsTable from "../../components/ships/ShipsTable.jsx";
import Title from "../../components/ui/Title.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import AddShip from "../../components/ships/AddShip.jsx";

const Vessels = () => {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>My vessels</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddShip />
        </div>
      </div>
      <ShipsTable />
    </>
  );
};

export default Vessels;
