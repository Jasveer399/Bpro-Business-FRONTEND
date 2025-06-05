import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDealerAccessToken } from "./Helper";

function ProtectedDealerRoutes() {
  const dealerAccessToken = getDealerAccessToken();
  const { planDaysLeft = 0 } = useSelector((state) => state.dealers || {});
  const location = useLocation();

  // Check if the user is authenticated
  if (!dealerAccessToken) {
    return <Navigate to="/home" replace />;
  }

  // Check if the plan has expired (planDaysLeft === 0)
  // Skip redirect if the user is already on /my-dashboard/listing
  if (planDaysLeft === 0 && location.pathname !== "/my-dashboard/listing") {
    return (
      <Navigate
        to="/my-dashboard/listing"
        state={{
          message:
            "Your plan has expired. Please renew to access this feature.",
        }}
        replace
      />
    );
  }

  // If authenticated and plan is active, or on /my-dashboard/listing, render the child routes
  return <Outlet />;
}

function RedirectIfDealerAuthenticated() {
  const dealerAccessToken = getDealerAccessToken();
  return dealerAccessToken ? (
    <Navigate to="/my-dashboard/listing" replace />
  ) : (
    <Outlet />
  );
}

export { ProtectedDealerRoutes, RedirectIfDealerAuthenticated };
