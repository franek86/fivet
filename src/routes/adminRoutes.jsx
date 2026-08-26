import { Route } from "react-router";

import ProtectedRoute from "../pages/ProtectedRoute.jsx";

import Users from "../pages/admin/Users.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Blogs from "../pages/admin/Blogs.jsx";
import CreateBlog from "../components/blog/CreateBlog.jsx";
import EditBlog from "../pages/admin/EditBlog.jsx";
import BlogCategory from "../pages/admin/BlogCategory.jsx";
import Categories from "../pages/admin/Categories.jsx";
import Payments from "../pages/admin/Payments.jsx";
import Vessels from "../pages/admin/Vessels.jsx";
import SingleShip from "../pages/admin/SingleShip.jsx";
import Blog from "../pages/admin/Blog.jsx";
import SingleUser from "../pages/admin/SingleUser.jsx";

export const AdminRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
    <Route path='/admin/dashboard' element={<AdminDashboard />} />
    <Route path='/admin/users'>
      <Route index element={<Users />} />
      <Route path=':id' element={<SingleUser />} />
    </Route>
    <Route path='/admin/categories' element={<Categories />} />
    <Route path='/admin/vessels' element={<Vessels />} />
    <Route path='/admin/vessels/:id' element={<SingleShip />} />

    <Route path='/admin/blogs'>
      <Route index element={<Blogs />} />
      <Route path=':slug' element={<Blog />} />
      <Route path='create' element={<CreateBlog />} />
      <Route path='edit/:slug' element={<EditBlog />} />
      <Route path='category' element={<BlogCategory />} />
    </Route>

    <Route path='/admin/payments' element={<Payments />} />
  </Route>
);
