import { Outlet } from "react-router";

import styled from "styled-components";

import Sidebar from "../components/Sidebar.jsx";

import { useSocketAuth } from "../hooks/useSocketAuth.js";
import { useRealtime } from "../hooks/useRealtime.js";
import Header from "../components/header/Header.jsx";

const LayoutGrid = styled.div`
  min-height: 100vh;
  width: 100%;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: 100px 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 240px 1fr;
  }
`;

const MainWrap = styled.div`
  background-color: var(--color-grey-100);
  height: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  padding: 2rem;
  @media (min-width: 640px) {
    padding: 24px 32px 40px;
  }
`;

function MainLayout() {
  useSocketAuth();
  useRealtime();

  return (
    <LayoutGrid>
      <Sidebar />
      <MainWrap>
        <Main>
          <Header />
          <Outlet />
        </Main>
      </MainWrap>
    </LayoutGrid>
  );
}

export default MainLayout;
