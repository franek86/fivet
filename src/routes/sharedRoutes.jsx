import { Route } from "react-router";
import CreateShip from "../pages/CreateShip.jsx";
import EditShip from "../pages/EditShip.jsx";
import Events from "../pages/shared/Events.jsx";
import Notifications from "../pages/shared/Notifications.jsx";
import ProtectedRoute from "../pages/ProtectedRoute.jsx";
import AddressBook from "../pages/shared/AddressBook.jsx";

export const SharedRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["ADMIN", "BROKER", "OWNER"]} />}>
    <Route path='/ships/create' element={<CreateShip />} />
    <Route path='/ships/edit/:id' element={<EditShip />} />

    <Route path='/address-book' element={<AddressBook />} />
    <Route path='/events' element={<Events />} />
    <Route path='/notifications' element={<Notifications />} />
  </Route>
);
