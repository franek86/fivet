import React from "react";
import BackBtn from "../../components/BackBtn.jsx";
import SingleShipData from "../../components/ships/SingleShipData.jsx";
import Title from "../../components/ui/Title.jsx";
import styled from "styled-components";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OwnerSingleVessels = () => {
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

export default OwnerSingleVessels;
