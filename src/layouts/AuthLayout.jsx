import { Outlet } from "react-router";
import styled from "styled-components";

import Logo from "../components/Logo.jsx";

const Wrap = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormSection = styled.section`
  flex: 1;
  align-items: center;
  text-align: center;
  width: 400px;
  margin: auto;
`;

const ImageSection = styled.section`
  display: none;
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: var(--color-brand-100);

  @media screen and (min-width: 640px) {
    display: flex;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 18% 100%, 0 52%);
  }
`;

function AuthLayout() {
  return (
    <Wrap>
      <FormSection>
        <Outlet />
      </FormSection>
      <ImageSection>
        <img src='/images/login-image.png' alt='Login' />
      </ImageSection>
    </Wrap>
  );
}

export default AuthLayout;
