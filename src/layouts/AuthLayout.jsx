import { Outlet } from "react-router";
import styled from "styled-components";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const FormSection = styled.section`
  flex: 1;
  align-items: center;
  text-align: center;
  width: 100%;
`;

function AuthLayout() {
  return (
    <Wrap>
      <div>hello </div>
      <FormSection>
        <Outlet />
      </FormSection>
    </Wrap>
  );
}

export default AuthLayout;
