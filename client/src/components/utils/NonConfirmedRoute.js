import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import apiToken from '../../api/apiToken';


const NonConfirmedRoute = () => {
  const [user, setUser] = useState(null);
  const userRole = Cookies.get('userRole');


  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await apiToken.post('user');
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setUser({ confirmation: null });
        }

      } catch (e) {
        setUser({ confirmation: null });

      }
    };

    fetchUser();
  }, []);


  if (userRole === "Student") {
    if (user && user.confirmation === true) {
      return <Navigate to="/student/dashboard" replace />;
    } else {
      return <Outlet />;
    }
  } else if (!userRole || userRole === "null") {
    return <Navigate to="/userChoice" />;
  } else {
    return <Navigate to={`/${userRole}/dashboard`} />;
  }
  

};

export default NonConfirmedRoute;
