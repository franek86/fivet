import { Routes, Route } from "react-router";

import GlobalStyles from "./GlobalStyles.js";
import { ToastContainer } from "react-toastify";

import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Ships from "./pages/Ships.jsx";
import Categories from "./pages/Categories.jsx";
import Users from "./pages/Users.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CreateShip from "./pages/CreateShip.jsx";
import NotFound from "./pages/NotFound.jsx";
import EditShip from "./pages/EditShip.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <>
      <ToastContainer position='top-right' autoClose={2000} />
      <GlobalStyles />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Route>
        <Route element={<ProtectedRoute alowedRoles={["admin", "user"]} />}>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/ships' element={<Ships />} />
            <Route path='/ships/create' element={<CreateShip />} />
            <Route path='/ships/edit/:id' element={<EditShip />} />
            <Route path='/profile' element={<Profile />} />

            <Route element={<ProtectedRoute alowedRoles={["admin"]} />}>
              <Route path='/users' element={<Users />} />
              <Route path='/categories' element={<Categories />} />
            </Route>

            {/*  <Route element={<ProtectedRoute alowedRoles={["user"]} />}>
              <Route path='/profile' element={<Profile />} />
            </Route> */}
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
