import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Dealers from "./Pages/Dealer/Dealers";
import Blogs from "./Pages/Blogs/Blogs";
import Banner from "./Pages/Banner/Banner";
import Category from "./Pages/Category/Category";
import BlogView from "./Components/Forms/Blogs/BlogView";
import AdminLogin from "./Pages/Login/AdminLogin";
import Home from "./Dealer Dashboard/Pages/Home/Home";
import { ProtectedAdminRoutes, RedirectIfAuthenticated } from "./Utils/ProtectedAmdinRoutes";
import Workers from "./Pages/Workers/Workers";
import SellProduct from "./Pages/Sell Product/SellProduct";
import Allblogs from "./Dealer Dashboard/Pages/Blogs/Blogs";
import BlogDetails from "./Dealer Dashboard/Pages/Blogs/BlogDetails";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/login" element={<AdminLogin />} />
        </Route>
        <Route element={<ProtectedAdminRoutes />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/banners" element={<Banner />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogview/:id" element={<BlogView />} />
          </Route>
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/sellProduct" element={<SellProduct />} />
        <Route path="/Allblogs" element={<Allblogs />} />
        <Route path="/BlogDetails/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
}

export default App;