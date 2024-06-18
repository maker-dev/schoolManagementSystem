import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import apiToken from '../../api/apiToken';
import Loader from '../ui/Loader';


const NonConfirmedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const userRole = Cookies.get('userRole');


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await apiToken.post('user');
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setUser({ confirmation: null });
        }

      } catch (e) {
        setUser({ confirmation: null });
        setLoading(false);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);


  if (loading) {
    return <Loader />; // Render Loader while loading
  }
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
