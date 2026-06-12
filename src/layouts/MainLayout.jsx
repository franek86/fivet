import { Outlet } from "react-router";

import styled from "styled-components";

import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/header/Header.jsx";

import { useSocketAuth } from "../hooks/useSocketAuth.js";

import { useUser } from "../hooks/useAuth.js";
import { useUserSocket } from "../hooks/useUserSocket.js";

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
  background-color: var(--color-grey-200);
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
  const { data: user } = useUser();

  if (user?.role === "USER") {
    useUserSocket(user?.id ?? "");
  }

  useSocketAuth();

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
