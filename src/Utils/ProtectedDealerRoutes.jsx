import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedDealerRoutes() {
    const dealerAccessToken = localStorage.getItem('accessToken')
    return dealerAccessToken ? <Outlet /> : <Navigate to="/login" />
}

function RedirectIfDealerAuthenticated() {
    const dealerAccessToken = localStorage.getItem('accessToken')
    return dealerAccessToken ? <Navigate to="/my-dashboard/listing" replace /> : <Outlet />
}

export  {ProtectedDealerRoutes, RedirectIfDealerAuthenticated}