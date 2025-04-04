import { useUser } from "../hooks/useAuth.js";
import { Navigate, Outlet } from "react-router";

import Spinner from "../components/Spinner.jsx";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
`;

function ProtectedRoute({ alowedRoles }) {
  const { isLoading, data } = useUser();

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (!data) return <Navigate to='/' replace />;
  if (!alowedRoles.includes(data.user.role)) return <Navigate to='/unauthorized' replace />;

  return <Outlet />;
}

export default ProtectedRoute;
