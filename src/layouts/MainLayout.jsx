import { Outlet } from "react-router";

import styled from "styled-components";

import Sidebar from "../components/Sidebar.jsx";

import { useSocketAuth } from "../hooks/useSocketAuth.js";
import { useRealtime } from "../hooks/useRealtime.js";
import Header from "../components/header/Header.jsx";

const LayoutGrid = styled.div`
  width: 100%;
`;

const MainWrap = styled.div`
  background-color: var(--color-grey-100);
  height: 100%;
  min-height: 100vh;

  @media (min-width: 640px) {
    margin-left: 10rem;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 20rem;
  }
`;

const Main = styled.main`
  padding: 2rem;
  @media (min-width: 640px) {
    padding: 1.6rem 2rem;
  }
`;

function MainLayout() {
  useSocketAuth();
  useRealtime();

  return (
    <LayoutGrid>
      <Sidebar />
      <MainWrap>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </MainWrap>
    </LayoutGrid>
  );
}

export default MainLayout;
