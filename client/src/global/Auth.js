import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import api from '../api/api';

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

  const fetchUser =  () => {
    
      setUser(Cookies.get("user"));
      
      
    
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
