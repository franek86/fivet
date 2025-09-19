import Title from "../components/ui/Title.jsx";
import ShipsTable from "../components/ships/ShipsTable.jsx";
import AddShip from "../components/ships/AddShip.jsx";
import styled from "styled-components";
import SearchBar from "../components/SearchBar.jsx";

function Ships() {
  return (
    <>
      <div class='search-container'>
        <Title tag='h1'>Ships</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddShip />
        </div>
      </div>
      <ShipsTable />
    </>
  );
}

export default Ships;
