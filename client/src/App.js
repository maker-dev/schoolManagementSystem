import { Navigate, Route, useNavigate, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import UserChoice from "./components/pages/UserChoice";
import LoginStudent from "./components/pages/LoginStudent";
import LoginAdmin from "./components/pages/LoginAdmin";
import LoginTeacher from "./components/pages/LoginTeacher";
import SignUp from "./components/pages/SignUp";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";



function App() {
  
  const [role] = useState(Cookies.get("userRole"));
  
  
 
  
  return (
    <div className="App">
      
      <Routes>
        {role != null && role == "Admin" &&
        <>
          <Route path="/*" element={<Navigate to="/dashboard" />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
        </>
         
        }

        { (role == null || role == undefined || role == "null"|| role == "") &&
          <>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/userChoice" element={<UserChoice />} />
            <Route path="/loginEtudiant" element={<LoginStudent />} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/loginProf" element={<LoginTeacher />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
          </>
        }
      </Routes>
    </div>
  );
}

export default App;
