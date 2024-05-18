import {  Route,  Routes } from "react-router-dom";
import './App.css';
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import UserChoice from "./components/pages/UserChoice";
import LoginStudent from "./components/pages/student/LoginStudent";
import LoginAdmin from "./components/pages/admin/LoginAdmin";
import LoginTeacher from "./components/pages/teacher/LoginTeacher";
import SignUp from "./components/pages/SignUp";
import AdminRoutes from "./components/utils/AdminRoutes";
import GuestRoutes from "./components/utils/GuestRoutes";



function App() {
  
  
  return (
    <div className="App">
      
      <Routes>
        <Route element={<AdminRoutes/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        

       
        <Route element={<GuestRoutes/>}>
            <Route path="/userChoice" element={<UserChoice />} />
            <Route path="/loginEtudiant" element={<LoginStudent />} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/loginProf" element={<LoginTeacher />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
        </Route>
            
          
        
      </Routes>
    </div>
  );
}

export default App;
