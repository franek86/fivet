import styled from "styled-components";
import BackBtn from "../components/BAckBtn.jsx";
import SingleShipData from "../components/ships/SIngleShipData.jsx";
import Title from "../components/ui/Title.jsx";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function SingleShip() {
  return (
    <>
      <FlexWrap>
        <Title tag='h1'>Single ship</Title>
        <BackBtn />
      </FlexWrap>
      <SingleShipData />
    </>
  );
}

export default SingleShip;
