import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../global/Auth.js';
import LoginAdmin from '../components/pages/LoginAdmin.jsx';
import HomePage from '../Pages/HomePage.jsx';

function AdminRoute() {
    const {user} = useAuth();
    if (user === null) {
        return <LoginAdmin />
    } else if (user.role == "Admin") {
        return <Outlet />
    } else {
        return <HomePage />
    }
}

export default AdminRoute;