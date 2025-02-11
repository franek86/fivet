import Title from "../components/ui/Title.jsx";
import ShipsTable from "../components/ships/ShipsTable.jsx";
import AddShip from "../components/ships/AddShip.jsx";
import styled from "styled-components";

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
        <AddShip />
      </Wrap>
      <ShipsTable />
    </>
  );
}

export default Ships;
