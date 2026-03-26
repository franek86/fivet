import { useUser } from "../hooks/useAuth.js";
import { Navigate } from "react-router";

function DashboardRedirect() {
  const { data: user } = useUser();

  if (!user) {
    return <Navigate to='/' replace />;
  }

  if (user.role === "ADMIN") {
    return <Navigate to='/admin/dashboard' replace />;
  }

  if (user.role === "USER") {
    return <Navigate to='/user/dashboard' replace />;
  }

  return <Navigate to='/unauthorized' replace />;
}

export default DashboardRedirect;
