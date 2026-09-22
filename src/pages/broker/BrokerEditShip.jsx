import { useParams } from "react-router";
import styled from "styled-components";
import Title from "../../components/ui/Title.jsx";
import BackBtn from "../../components/BackBtn.jsx";
import CreateShipForm from "../../components/ships/CreateShipForm.jsx";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function BrokerEditShip() {
  const { id } = useParams();

  return (
    <>
      <FlexWrap>
        <Title tag='h1'>Edit ship</Title>
        <BackBtn />
      </FlexWrap>
      <CreateShipForm editId={id} />
    </>
  );
}

export default BrokerEditShip;
