import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSelector } from "react-redux";

import GlobalStyles from "./GlobalStyles.js";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard.jsx";
import Ships from "./pages/Ships.jsx";
import Categories from "./pages/Categories.jsx";
import Users from "./pages/Users.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CreateShip from "./pages/CreateShip.jsx";
import NotFound from "./pages/NotFound.jsx";
import EditShip from "./pages/EditShip.jsx";

function App() {
  const queryClient = new QueryClient();

  const user = useSelector((state) => state.auth.user);

  console.log(user.email);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position='top-right' autoClose={2000} />
      <GlobalStyles />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/ships' element={<Ships />} />
          <Route path='/ships/create' element={<CreateShip />} />
          <Route path='/ships/edit/:id' element={<EditShip />} />
          <Route path='/users' element={<Users />} />
          <Route path='/categories' element={<Categories />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
