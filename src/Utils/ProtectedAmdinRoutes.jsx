import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedAdminRoutes() {
    const adminAccessToken = localStorage.getItem('accessToken')
    return adminAccessToken ? <Outlet /> : <Navigate to="/home" />
}

function RedirectIfAuthenticated() {
    const adminAccessToken = localStorage.getItem('accessToken')
    return adminAccessToken ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export  {ProtectedAdminRoutes, RedirectIfAuthenticated}