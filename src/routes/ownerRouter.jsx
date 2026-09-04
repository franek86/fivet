import { Route } from "react-router";

import OwnerDashboard from "../pages/owner/OwnerDashboard.jsx";
import ProtectedRoute from "../pages/ProtectedRoute.jsx";
import CompanyOwnerProfile from "../pages/owner/CompanyOwnerProfile.jsx";
import OwnerVessels from "../pages/owner/OwnerVessels.jsx";
import OwnerSingleVessels from "../pages/owner/OwnerSingleVessels.jsx";

export const OwnerRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
    <Route path='/owner/dashboard' element={<OwnerDashboard />} />
    <Route path='/owner/profile' element={<CompanyOwnerProfile />} />
    <Route path='/owner/vessels' element={<OwnerVessels />} />
    <Route path='/owner/vessels/:id' element={<OwnerSingleVessels />} />
  </Route>
);
