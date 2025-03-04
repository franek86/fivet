import { useSelector } from "react-redux";
import { useUser } from "../hooks/useAuth.js";
import { Navigate, Outlet } from "react-router";

import Spinner from "../components/Spinner.jsx";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
`;

function ProtectedRoute({ alowedRoles }) {
  const { isLoading, data: user } = useUser();
  const role = useSelector((state) => state.auth.role);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (!user) return <Navigate to='/login' replace />;
  if (!alowedRoles.includes(role)) return <Navigate to='/unauthorized' replace />;

  return <Outlet />;
}

export default ProtectedRoute;
