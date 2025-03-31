import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import styled from "styled-components";

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: 10rem 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 26rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  height: 100%;
  min-height: 100vh;
  padding: 2rem;

  @media (min-width: 640px) {
    padding: 1.6rem 4rem;
  }
`;

function MainLayout() {
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
