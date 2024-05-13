import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../global/Auth.js';
import LoginStudent from '../components/pages/LoginStudent.jsx';
import HomePage from '../components/pages/HomePage.jsx';

function StudentRoute() {
    const {user} = useAuth();
    if (user === null) {
        return <LoginStudent />
    } else if (user.role == "Student") {
        return <Outlet />
    } else {
        return <HomePage />
    }
}

export default StudentRoute;