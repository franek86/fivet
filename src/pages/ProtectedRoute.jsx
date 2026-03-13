import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

import { useUser } from "../hooks/useAuth.js";

import Spinner from "../components/Spinner.jsx";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
`;

function ProtectedRoute({ alowedRoles }) {
  //const { isLoading } = useUser();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  /* if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    ); */
  if (!isAuthenticated) return <Navigate to='/' replace />;
  if (!alowedRoles.includes(role)) return <Navigate to='/unauthorized' replace />;

  return <Outlet />;
}

export default ProtectedRoute;
