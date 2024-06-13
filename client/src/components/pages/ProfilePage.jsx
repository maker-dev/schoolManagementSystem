import React, { useState } from 'react';
import Cookies from 'js-cookie';
import AdminProfile from './admin/AdminProfile';

export default function ProfilePage() {
    const [userRole,] = useState(Cookies.get('userRole'));
    return(
        <div>
            {userRole === "Admin" && 
                <AdminProfile/> 
            }
        </div>
    )
}

