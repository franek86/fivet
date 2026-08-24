import { useUser } from "../hooks/useAuth.js";
import { Navigate } from "react-router";

const ROLE_DASHBOARD = {
  ADMIN: "/admin/dashboard",
  BROKER: "/broker/dashboard",
  OWNER: "/owner/dashboard",
  BUYER: "/buyer/dashboard",
};

function DashboardRedirect() {
  const { data: user } = useUser();

  if (!user) return <Navigate to='/' replace />;
  return <Navigate to={ROLE_DASHBOARD[user.role] ?? "/unauthorized"} replace />;

  /*  if (!user) {
    return <Navigate to='/' replace />;
  }

  if (user.role === "ADMIN") {
    return <Navigate to='/admin/dashboard' replace />;
  }

  if (user.role === "USER") {
    return <Navigate to='/user/dashboard' replace />;
  }

  return <Navigate to='/unauthorized' replace />;
  
  */
}
export default DashboardRedirect;
