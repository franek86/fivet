import { useSelector } from "react-redux";
import { Outlet } from "react-router";

import styled from "styled-components";

import Sidebar from "../components/Sidebar.jsx";
import { useNotificationSocket } from "../hooks/useSocket.js";

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: 10rem 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 20rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  height: 100%;
  min-height: 100vh;
  padding: 2rem;

  @media (min-width: 640px) {
    padding: 1.6rem 2rem;
  }
`;

function MainLayout() {
  const role = useSelector((state) => state.auth?.role);
  const userId = useSelector((state) => state.auth?.user?.id);

  useNotificationSocket(role, userId);

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
