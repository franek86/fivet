import { Route } from "react-router";

import ProtectedRoute from "../pages/ProtectedRoute.jsx";
import BuyerDashboard from "../pages/buyer/BuyerDashboard.jsx";

export const BuyerRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["BUYER"]} />}>
    <Route path='/buyer/dashboard' element={<BuyerDashboard />} />
  </Route>
);
