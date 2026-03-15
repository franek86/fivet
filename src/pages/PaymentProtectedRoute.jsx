import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useAuth.js";

function PaymentProtectedRoute() {
  const { data: user } = useUser();

  if (!user) return <Navigate to='/' />;

  if (user?.role === "ADMIN") {
    return <Outlet />;
  }

  if (!user?.verifyPayment) {
    return <Navigate to='/billing' replace />;
  }

  return <Outlet />;
}

export default PaymentProtectedRoute;
