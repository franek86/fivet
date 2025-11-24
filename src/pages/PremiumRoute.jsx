import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

function PremiumRoute() {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to='/' />;

  // Allow Admins to access everything
  if (user.role === "ADMIN") return <Outlet />;

  if (user.subscription !== "PREMIUM") {
    return <Navigate to='/billing' />;
  }

  return <Outlet />;
}

export default PremiumRoute;
