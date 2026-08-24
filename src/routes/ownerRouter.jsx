import { Route } from "react-router";

import OwnerDashboard from "../pages/owner/OwnerDashboard.jsx";
import ProtectedRoute from "../pages/ProtectedRoute.jsx";

export const OwnerRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
    <Route path='/owner/dashboard' element={<OwnerDashboard />} />
  </Route>
);
