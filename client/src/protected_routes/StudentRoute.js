import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../global/Auth.js';


function StudentRoute() {
    const {user} = useAuth();
    if (user === null) {
        Navigate("/loginEtudiant");
    } else if (user.role == "Student") {
        return <Outlet />
    } else {
        Navigate("/userChoice");
    }
}

export default StudentRoute;