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
import Pricing from "./Dealer Dashboard/Pages/Pricing/Pricing";
import {
  ProtectedAdminRoutes,
  RedirectIfAuthenticated,
} from "./Utils/ProtectedAmdinRoutes";
import Workers from "./Pages/Workers/Workers";
import SellProduct from "./Pages/Sell Product/SellProduct";
import Allblogs from "./Dealer Dashboard/Pages/Blogs/Blogs";
import BlogDetails from "./Dealer Dashboard/Pages/Blogs/BlogDetails";
import BannersCategory from "./Pages/Banner/BannersCategory";
import DealerRegister from "./Dealer Dashboard/Pages/Auth/DealerRegister";
import DealerLogin from "./Dealer Dashboard/Pages/Auth/DealerLogin";
import ContactUs from "./Dealer Dashboard/Pages/Contact Us/ContactUs";
import DealerLayout from "./Dealer Dashboard/Components/Dashboard/DealerLayout";
import Listing from "./Dealer Dashboard/Pages/Dashboard/Listing";
import EditDealerProfile from "./Dealer Dashboard/Components/Dashboard/Accounts/EditDealerProfile";
import ProductLisiting  from "./Dealer Dashboard/Components/Forms/Product/ProductLisiting";
import AboutUs from "./Dealer Dashboard/Pages/About Us/AboutUs";
import Bookmark from "./Dealer Dashboard/Pages/Dashboard/Bookmark";
import { ProtectedDealerRoutes, RedirectIfDealerAuthenticated } from "./Utils/ProtectedDealerRoutes";
import ProductDetail from "./Dealer Dashboard/Components/Dashboard/Listing/ProductDetail";
import EditProductLisiting from "./Dealer Dashboard/Components/Forms/Product/EditProductLisiting";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/admin-login" element={<AdminLogin />} />

        </Route>
        <Route element={<ProtectedAdminRoutes />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/banners" element={<BannersCategory />} />
            <Route path="/banners/:id" element={<Banner />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogview/:id" element={<BlogView />} />
          </Route>
        </Route>
        <Route element={<ProtectedDealerRoutes />}>
          <Route element={<DealerLayout />}>
            <Route
              index
              element={<Navigate to="/my-dashboard/listing" replace />}
            />
            <Route path="/my-dashboard/listing" element={<Listing />} />
            <Route
              path="/my-dashboard/accounts"
              element={<EditDealerProfile />}
            />
            <Route path="/my-dashboard/bookmarks" element={<Bookmark />} />
          </Route>
          <Route path="/my-dashboard/product-detail" element={<ProductDetail />} />
          <Route path="/my-dashboard/edit-product-detail/:id" element={<EditProductLisiting />} />
          <Route path="/product-listing" element={<ProductLisiting />} />
        </Route>
        <Route element={<RedirectIfDealerAuthenticated />}>
          <Route path="/register" element={<DealerRegister />} />
          <Route path="/login" element={<DealerLogin />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sellProduct" element={<SellProduct />} />
        <Route path="/Allblogs" element={<Allblogs />} />
        <Route path="/BlogDetails/:id" element={<BlogDetails />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
