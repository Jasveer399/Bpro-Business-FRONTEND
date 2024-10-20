import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import Dealers from "./Pages/Dealer/Dealers";
import Blogs from "./Pages/Blogs/Blogs";
import Banner from "./Pages/Banner/Banner";
import Category from "./Pages/Category/Category";
import BlogView from "./Components/Forms/Blogs/BlogView";
import AdminLogin from "./Pages/Login/AdminLogin";
import { ProtectedAdminRoutes, RedirectIfAuthenticated } from "./Utils/ProtectedAmdinRoutes";

function App() {
  return (
    <Routes>
       <Route element={<RedirectIfAuthenticated />}>
        <Route path="/login" element={<AdminLogin />} />
      </Route>
      <Route element={<ProtectedAdminRoutes />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/banners" element={<Banner />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogview/:id" element={<BlogView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;