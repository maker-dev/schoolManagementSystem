import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../global/Auth.js';
import Cookies from 'js-cookie';

function AdminRoute() {
    const user = Cookies.get('user');
    console.log(user);
    
    if (user === null) {
        Navigate("/loginAdmin");
    } else if (user.role == "Admin") {
        return <Outlet />
    } else {
        Navigate("/userChoice");
    }
}

export default AdminRoute;