import { Route } from "react-router";

import ProtectedRoute from "../pages/ProtectedRoute.jsx";

import BrokerDashboard from "../pages/broker/BrokerDashboard.jsx";
import Enquiries from "../pages/broker/Enquiries.jsx";
import SearchOwner from "../pages/broker/SearchOwner.jsx";
import SingleShip from "../pages/broker/SingleShip.jsx";
import Vessels from "../pages/broker/Vessels.jsx";

import Documents from "../pages/broker/Documents.jsx";
import CompanyProfile from "../pages/broker/CompanyProfile.jsx";
import BrokerChat from "../pages/broker/BrokerChat.jsx";

export const BrokerRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["BROKER"]} />}>
    <Route path='/broker/dashboard' element={<BrokerDashboard />} />
    <Route path='/broker/enquiries' element={<Enquiries />} />
    <Route path='/broker/vessels' element={<Vessels />} />
    <Route path='/broker/vessels/:id' element={<SingleShip />} />
    <Route path='/broker/find-owners' element={<SearchOwner />} />

    <Route path='/broker/chat' element={<BrokerChat />} />
    <Route path='/broker/documents' element={<Documents />} />
    <Route path='/broker/profile' element={<CompanyProfile />} />
  </Route>
);
