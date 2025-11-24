import { Outlet } from "react-router";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  max-width: 40rem;
  margin: 0 auto;
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
      <FormSection>
        <Outlet />
      </FormSection>
    </Wrap>
  );
}

export default AuthLayout;
