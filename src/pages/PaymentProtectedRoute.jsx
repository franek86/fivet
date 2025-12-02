import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useAuth.js";

function PaymentProtectedRoute() {
  const user = useUser();

  if (!user) return <Navigate to='/' />;

  if (user?.data?.role === "ADMIN") {
    return <Outlet />;
  }

  if (!user?.data?.verifyPayment) {
    return <Navigate to='/billing' replace />;
  }

  return <Outlet />;
}

export default PaymentProtectedRoute;
