import { Navigate, Outlet } from "react-router";

import { useUser } from "../hooks/useAuth.js";

import Spinner from "../components/Spinner.jsx";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
`;

function ProtectedRoute({ allowedRoles }) {
  const { isLoading, data: user, isError } = useUser();

  if (!isLoading && (!user || isError)) {
    return <Navigate to='/' replace />;
  }
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return <Outlet />;
}

export default ProtectedRoute;
