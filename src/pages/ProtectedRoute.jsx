import { useDispatch, useSelector } from "react-redux";
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

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (!user) return <Navigate to='/' replace />;
  if (!alowedRoles.includes(user.role)) return <Navigate to='/unauthorized' replace />;

  return <Outlet />;
}

export default ProtectedRoute;
