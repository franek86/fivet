import { Outlet, Navigate } from "react-router";
import { useUser } from "../hooks/useAuth.js";

function PremiumRoute() {
  const { data: user } = useUser();

  if (!user) return <Navigate to='/' />;

  // Allow Admins to access everything
  if (user.role === "ADMIN") return <Outlet />;

  if (user.subscription !== "PREMIUM") {
    return <Navigate to='/billing' />;
  }

  return <Outlet />;
}

export default PremiumRoute;
