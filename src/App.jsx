import { Routes, Route } from "react-router";

import GlobalStyles from "./GlobalStyles.js";
import { ToastContainer } from "react-toastify";

import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Ships from "./pages/Ships.jsx";
import SingleShip from "./pages/SingleShip.jsx";
import Categories from "./pages/Categories.jsx";
import Users from "./pages/Users.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import CreateShip from "./pages/CreateShip.jsx";
import NotFound from "./pages/NotFound.jsx";
import EditShip from "./pages/EditShip.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import AddressBook from "./pages/AddressBook.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Events from "./pages/Events.jsx";
import Notifications from "./pages/Notifications.jsx";
import Payments from "./pages/Payments.jsx";
import Billing from "./pages/Billing.jsx";
import PremiumRoute from "./pages/PremiumRoute.jsx";
import { useSelector } from "react-redux";

function App() {
  return (
    <>
      <ToastContainer position='top-right' autoClose={2000} />

      <GlobalStyles />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/billing' element={<Billing />} />
        </Route>
        <Route element={<ProtectedRoute alowedRoles={["ADMIN", "USER"]} />}>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/ships' element={<Ships />} />
            <Route path='/ships/create' element={<CreateShip />} />
            <Route path='/ships/edit/:id' element={<EditShip />} />
            <Route path='/ships/:id' element={<SingleShip />} />
            <Route element={<PremiumRoute />}>
              <Route path='/address-book' element={<AddressBook />} />
            </Route>
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute alowedRoles={["ADMIN"]} />}>
          <Route element={<MainLayout />}>
            <Route path='/users' element={<Users />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/events' element={<Events />} />
            <Route path='/payments' element={<Payments />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
