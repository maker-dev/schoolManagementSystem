import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import api from '../Api/api';

const AuthContext = createContext();

function Auth({ children }) {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // Check if token exists in cookies
    const token = Cookies.get('token');
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("user", {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}` // Include token in request headers
        }
      });
      setUser(response.data.data.user);
    } catch (error) {
      // If error, clear token from cookies
      Cookies.remove('token');
      console.error('Error fetching user:', error);
    }
  };


  const login = (token) => {
    // Set token in cookies
    Cookies.set('token', token);
    fetchUser();
  };

  const logout = () => {
    // Clear token from cookies
    Cookies.remove('token');
    setUser(null);
  };

  const values = {
    user,
    setUser,
    coordinates,
    setCoordinates,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export default Auth;
export { useAuth };
