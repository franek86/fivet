import { Routes, Route } from "react-router";

import GlobalStyles from "./GlobalStyles.js";
import { ToastContainer } from "react-toastify";

import Spinner from "./components/Spinner.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import DashboardRedirect from "./pages/DashboardRedirect.jsx";
import NotFound from "./pages/NotFound.jsx";

import Billing from "./pages/admin/Billing.jsx";

import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentError from "./pages/PaymentError.jsx";

import { AuthRoutes } from "./routes/authRoutes.jsx";
import { AdminRoutes } from "./routes/adminRoutes.jsx";
import { BrokerRoutes } from "./routes/brokerRoutes.jsx";
import { OwnerRoutes } from "./routes/ownerRouter.jsx";
import { BuyerRoutes } from "./routes/buyerRoutes.jsx";
import { SharedRoutes } from "./routes/sharedRoutes.jsx";
import { useRestoreSession } from "./hooks/useRestoreSession.js";

const ALL_ROLES = ["ADMIN", "BROKER", "OWNER", "BUYER"];

function App() {
  const { isLoading } = useRestoreSession();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer position='top-center' autoClose={1800} />
      <GlobalStyles />

      <Routes>
        {AuthRoutes}

        <Route element={<ProtectedRoute allowedRoles={ALL_ROLES} />}>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<DashboardRedirect />} />
            {AdminRoutes}
            {BrokerRoutes}
            {OwnerRoutes}
            {BuyerRoutes}
            {SharedRoutes}
          </Route>

          {/*  <Route element={<PaymentProtectedRoute />}>{PremiumRoute}</Route> */}

          <Route path='/billing' element={<Billing />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/payment-error' element={<PaymentError />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
