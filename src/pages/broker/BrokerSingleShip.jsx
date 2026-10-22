import styled from "styled-components";
import Title from "../../components/ui/Title.jsx";
import BackBtn from "../../components/BackBtn.jsx";
import SingleShipData from "../../components/ships/SingleShipData.jsx";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrokerSingleShip = () => {
  return (
    <>
      <FlexWrap>
        <Title tag='h1'>Single ship</Title>
        <BackBtn />
      </FlexWrap>
      <SingleShipData />
    </>
  );
};

export default BrokerSingleShip;
