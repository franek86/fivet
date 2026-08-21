import { Route } from "react-router";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";

export const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route index element={<Login />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/unauthorized' element={<Unauthorized />} />
  </Route>
);
