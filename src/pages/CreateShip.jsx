import styled from "styled-components";
import BackBtn from "../components/BAckBtn.jsx";
import CreateShipForm from "../components/ships/CreateShipForm.jsx";
import Title from "../components/ui/Title.jsx";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function CreateShip() {
  return (
    <>
      <FlexWrap>
        <Title tag='h1'>Create ship</Title>
        <BackBtn />
      </FlexWrap>
      <CreateShipForm />
    </>
  );
}

export default CreateShip;
