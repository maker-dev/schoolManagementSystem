import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../global/Auth.js';
import LoginTeacher from '../components/pages/LoginTeacher.jsx';
import HomePage from '../components/pages/HomePage.jsx';

function TeacherRoute() {
    const {user} = useAuth();
    if (user === null) {
        return <LoginTeacher />
    } else if (user.role == "Teacher") {
        return <Outlet />
    } else {
        return <HomePage />
    }
}

export default TeacherRoute;