import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getDealerAccessToken } from './Helper';

function ProtectedDealerRoutes() {
    const dealerAccessToken = getDealerAccessToken()
    return dealerAccessToken ? <Outlet /> : <Navigate to="/login" />
}

function RedirectIfDealerAuthenticated() {
    const dealerAccessToken = getDealerAccessToken();
    return dealerAccessToken ? <Navigate to="/my-dashboard/listing" replace /> : <Outlet />
}

export  {ProtectedDealerRoutes, RedirectIfDealerAuthenticated}