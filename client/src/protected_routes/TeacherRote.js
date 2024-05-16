import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../global/Auth.js';


function TeacherRoute() {
    const {user} = useAuth();
    if (user === null) {
        Navigate("/loginProf");
    } else if (user.role == "Teacher") {
        return <Outlet />
    } else {
        Navigate("/userChoice");
    }
}

export default TeacherRoute;