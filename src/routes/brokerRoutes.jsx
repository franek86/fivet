import { Route } from "react-router";

import ProtectedRoute from "../pages/ProtectedRoute.jsx";
import BuyersLists from "../pages/broker/BuyersLists.jsx";
import BrokerDashboard from "../pages/broker/BrokerDashboard.jsx";
import Enquiries from "../pages/broker/Enquiries.jsx";
import SearchOwner from "../pages/broker/SearchOwner.jsx";
import SingleShip from "../pages/broker/SingleShip.jsx";
import Vessels from "../pages/broker/Vessels.jsx";
import Messages from "../pages/broker/Messages.jsx";
import Documents from "../pages/broker/Documents.jsx";
import Verification from "../pages/broker/Verification.jsx";
import CompanyProfile from "../pages/broker/CompanyProfile.jsx";

export const BrokerRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["BROKER"]} />}>
    <Route path='/broker/dashboard' element={<BrokerDashboard />} />
    <Route path='/broker/enquiries' element={<Enquiries />} />
    <Route path='/broker/vessels' element={<Vessels />} />
    <Route path='/broker/vessels:id' element={<SingleShip />} />
    <Route path='/broker/find-owners' element={<SearchOwner />} />

    <Route path='/broker/messages' element={<Messages />} />
    <Route path='/broker/documents' element={<Documents />} />
    <Route path='/broker/verification' element={<Verification />} />
    <Route path='/broker/profile' element={<CompanyProfile />} />
  </Route>
);
