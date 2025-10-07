import { Outlet } from "react-router";
import styled from "styled-components";

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
  height: 100%;

  img {
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: 640px) {
    display: block;
  }
`;

function AuthLayout() {
  return (
    <Wrap>
      <FormSection>
        <Outlet />
      </FormSection>
      <ImageSection>
        <img src='/images/login-image.webp' alt='Login' />
      </ImageSection>
    </Wrap>
  );
}

export default AuthLayout;
