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
import EditProfile from "./Dealer Dashboard/Pages/Edit Profile/EditProfile";
import ProductLisiting from "./Dealer Dashboard/Components/Forms/Product/ProductLisiting";
import AboutUs from "./Dealer Dashboard/Pages/About Us/AboutUs";
import Bookmark from "./Dealer Dashboard/Pages/Dashboard/Bookmark";
import {
  ProtectedDealerRoutes,
  RedirectIfDealerAuthenticated,
} from "./Utils/ProtectedDealerRoutes";
import ProductDetail from "./Dealer Dashboard/Components/Dashboard/Listing/ProductDetail";
import EditProductLisiting from "./Dealer Dashboard/Components/Forms/Product/EditProductLisiting";
import DealerProfile from "./Components/Dealers/DealerProfile";
import Thankyou from "./Dealer Dashboard/Pages/Edit Profile/Thankyou";
import Edtior from "./ui/Edtior";
import Messages from "./Dealer Dashboard/Pages/Dashboard/Messages";
import PricingPlan from "./Dealer Dashboard/Pages/PricingPlan/PricingPlan";
import Pricing from "./Pages/Pricing/Pricing";
import DealersDetails from "./Components/Workers/DealersDetails";
import DealerProfilePage from "./Dealer Dashboard/Pages/DealerProfile/DealerProfile";
import Cashfree from "./Dealer Dashboard/Pages/Cashfree";
import PaymentStatus from "./Dealer Dashboard/Pages/PaymentStatus";
import CategoriesProduct from "./Dealer Dashboard/Pages/Categories Products/CategoriesProduct";
import AllProducts from "./Dealer Dashboard/Pages/Products/AllProducts";
import Visiting_Card from "./Pages/Visiting-Card/Visiting_Card";
import VisitingCard from "./Dealer Dashboard/Pages/Visiting Card/VisitingCard";
import { getDealerAccessToken } from "./Utils/Helper";
import { useEffect } from "react";
import {
  fetchCurrentDealerAsync,
  getPlanDaysLeftAsync,
  selectCurrentDealer,
} from "./Redux/Features/dealersSlice";
import { useDispatch, useSelector } from "react-redux";
import AllVIsitingCards from "./Pages/Visiting-Card/AllVIsitingCards";
import SelectVIsitingCard from "./Dealer Dashboard/Pages/Visiting Card/SelectVIsitingCard";
import TermsCondition from "./Dealer Dashboard/Pages/Terms & Condition/Terms&Condition";
import AppPrivacyPolicy from "./Dealer Dashboard/Pages/AppPrivacyPolicy/AppPrivacyPolicy";
import Users from "./Pages/Users/Users";

function App() {
  const dealerAccessToken = getDealerAccessToken();
  const dispatch = useDispatch();

  const currentDealer = useSelector(selectCurrentDealer);
  const { planDaysLeftStatus } = useSelector((state) => state.dealers);

  console.log("currentDealer", currentDealer);

  // Fetch dealer data if logged in
  useEffect(() => {
    if (dealerAccessToken) {
      if (!currentDealer) {
        dispatch(fetchCurrentDealerAsync());
      }
      if (planDaysLeftStatus === "idle") {
        dispatch(getPlanDaysLeftAsync());
      }
    }
  }, [dispatch, currentDealer, dealerAccessToken, planDaysLeftStatus]);

  return (
    <>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route index path="/" element={<Home />} /> {/* Loads Home at root / */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/pricing-plan" element={<PricingPlan />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sellProduct" element={<SellProduct />} />
        <Route path="/blogs" element={<Allblogs />} />
        <Route path="/BlogDetails/:id" element={<BlogDetails />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/dealerProfile/:id" element={<DealerProfilePage />} />
        <Route path="/category/:title/:id" element={<CategoriesProduct />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/edtior" element={<Edtior />} />
        <Route path="/payment" element={<Cashfree />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/terms-and-conditions" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<AppPrivacyPolicy />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/visiting-card/:id" element={<VisitingCard />} />
        {/* ================= DEALER AUTH ROUTES ================= */}
        <Route element={<RedirectIfDealerAuthenticated />}>
          <Route path="/register" element={<DealerRegister />} />
          <Route path="/login" element={<DealerLogin />} />
        </Route>
        {/* ================= DEALER PROTECTED ROUTES ================= */}
        <Route element={<ProtectedDealerRoutes />}>
          <Route element={<DealerLayout />}>
            {/* Default dealer dashboard redirect */}
            {/* <Route element={<Navigate to="/my-dashboard/listing" replace />} /> */}
            <Route path="/my-dashboard/listing" element={<Listing />} />
            <Route
              path="/my-dashboard/accounts"
              element={<EditDealerProfile />}
            />
            <Route path="/my-dashboard/bookmarks" element={<Bookmark />} />
            <Route path="/my-dashboard/messages" element={<Messages />} />
            <Route
              path="/my-dashboard/select-visiting-card"
              element={<SelectVIsitingCard />}
            />
          </Route>

          {/* Dealer-specific actions outside main dashboard layout */}
          <Route path="/create-visiting-card" element={<Visiting_Card />} />
          <Route
            path="/my-dashboard/product-detail/:id"
            element={<ProductDetail />}
          />
          <Route
            path="/my-dashboard/edit-product-detail/:id"
            element={<EditProductLisiting />}
          />
          <Route path="/product-listing" element={<ProductLisiting />} />
        </Route>
        {/* ================= ADMIN AUTH ROUTES ================= */}
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>
        {/* ================= ADMIN PROTECTED ROUTES ================= */}
        <Route element={<ProtectedAdminRoutes />}>
          <Route element={<Layout />}>
            {/* Default admin redirect */}
            <Route element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route
              path="/dealers/view-profile/:id"
              element={<DealerProfile />}
            />
            <Route path="/workers" element={<Workers />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/workers/dealers-details/:id"
              element={<DealersDetails />}
            />
            <Route path="/banners" element={<BannersCategory />} />
            <Route path="/banners/:id" element={<Banner />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogview/:id" element={<BlogView />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/all-visiting-card" element={<AllVIsitingCards />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
