import { Routes, Route } from "react-router";

import GlobalStyles from "./GlobalStyles.js";
import { ToastContainer } from "react-toastify";

import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import PaymentProtectedRoute from "./pages/PaymentProtectedRoute.jsx";
import DashboardRedirect from "./pages/DashboardRedirect.jsx";
import NotFound from "./pages/NotFound.jsx";

import CreateShip from "./pages/CreateShip.jsx";
import EditShip from "./pages/EditShip.jsx";

import AddressBook from "./pages/shared/AddressBook.jsx";
import Events from "./pages/shared//Events.jsx";
import Notifications from "./pages/shared/Notifications.jsx";

import Billing from "./pages/admin/Billing.jsx";
import PremiumRoute from "./pages/PremiumRoute.jsx";

import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentError from "./pages/PaymentError.jsx";
import Settings from "./pages/Settings.jsx";

import { AuthRoutes } from "./routes/authRoutes.jsx";
import { AdminRoutes } from "./routes/adminRoutes.jsx";
import { BrokerRoutes } from "./routes/brokerRoutes.jsx";
import { OwnerRoutes } from "./routes/ownerRouter.jsx";
import { BuyerRoutes } from "./routes/buyerRoutes.jsx";

const ALL_ROLES = ["ADMIN", "BROKER", "OWNER", "BUYER"];

function App() {
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
          </Route>

          <Route element={<PaymentProtectedRoute />}>
            <Route path='/ships/create' element={<CreateShip />} />
            <Route path='/ships/edit/:id' element={<EditShip />} />

            <Route path='/events' element={<Events />} />

            <Route element={<PremiumRoute />}>
              <Route path='/address-book' element={<AddressBook />} />
            </Route>
            <Route path='/notifications' element={<Notifications />} />
          </Route>

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
