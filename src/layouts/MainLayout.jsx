import { Outlet } from "react-router";

import styled from "styled-components";

import Sidebar from "../components/Sidebar.jsx";

import { useSocketAuth } from "../hooks/useSocketAuth.js";
import { useRealtime } from "../hooks/useRealtime.js";

const LayoutGrid = styled.div`
  width: 100%;
  /* display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: 10rem 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 20rem 1fr;
  } */
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  height: 100%;
  min-height: 100vh;
  padding: 2rem;

  @media (min-width: 640px) {
    padding: 1.6rem 2rem;
    margin-left: 10rem;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 20rem;
  }
`;

function MainLayout() {
  useSocketAuth();
  useRealtime();

  return (
    <LayoutGrid>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </LayoutGrid>
  );
}

export default MainLayout;
