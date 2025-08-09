import Title from "../components/ui/Title.jsx";
import ShipsTable from "../components/ships/ShipsTable.jsx";
import AddShip from "../components/ships/AddShip.jsx";
import styled from "styled-components";
import SearchBar from "../components/SearchBar.jsx";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Ships() {
  return (
    <>
      <Wrap>
        <Title tag='h1'>Ships</Title>
        <SearchBar />
        <AddShip />
      </Wrap>
      <ShipsTable />
    </>
  );
}

export default Ships;
