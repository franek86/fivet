import { Outlet } from "react-router";
import styled from "styled-components";
import Logo from "../components/Logo.jsx";

const Wrap = styled.div`
  height: 100%;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media screen and (min-width: 720px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormSection = styled.section`
  padding: 2rem;
  @media screen and (min-width: 720px) {
    padding: 4rem;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50rem;
  margin: 0 auto;
  padding: 4rem;

  h1 {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
`;

function AuthLayout() {
  return (
    <Wrap>
      <Intro>
        <Logo />
        <h1>Where vessels meet opportunity.</h1>
        <p>A dedicated platform for discovering, listing, and connecting vessels with serious buyers and sellers.</p>
      </Intro>
      <FormSection>
        <Outlet />
      </FormSection>
    </Wrap>
  );
}

export default AuthLayout;
