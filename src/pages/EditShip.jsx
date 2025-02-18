import { useParams } from "react-router";
import styled from "styled-components";

import BackBtn from "../components/BAckBtn.jsx";
import Title from "../components/ui/Title.jsx";
import CreateShipForm from "../components/ships/CreateShipForm.jsx";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function EditShip() {
  const { id } = useParams();

  return (
    <>
      <FlexWrap>
        <Title tag='h1'>{`Edit ship - ${id}`}</Title>
        <BackBtn />
      </FlexWrap>
      <CreateShipForm editId={id} />
    </>
  );
}

export default EditShip;
