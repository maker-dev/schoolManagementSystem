
import {  Route, Routes } from "react-router-dom";
import Auth from "./global/Auth";
import './App.css';
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import UserChoice from "./components/pages/UserChoice";
import AdminRoute from "./protected_routes/AdminRoute";
import StudentRoute from "./protected_routes/StudentRoute";
import TeacherRoute from "./protected_routes/TeacherRote";
import LoginStudent from "./components/pages/LoginStudent";
import LoginAdmin from "./components/pages/LoginAdmin";
import LoginTeacher from "./components/pages/LoginTeacher";
import SignUp from "./components/pages/SignUp";
import useUser from "./global/User";
import Cookies from 'js-cookie';
// import CardDashboard from "./components/cards/CardDashboard";

// const user = User();
// console.log(user);

function App() {

  const user = useUser();
  
  return (
    <div className="App">
      
   
        <Routes>

         {user != null && user.role == "Admin" &&
         <Route path="/dashboard" element={<Dashboard/>}/>
         }
            
       
        {user === null &&
        <>
          <Route path="/userChoice" element={<UserChoice/>}/>
          <Route path="/loginEtudiant" element={<LoginStudent/>}/>
          <Route path="/loginAdmin" element={<LoginAdmin/>}/>
          <Route path="/loginProf" element={<LoginTeacher/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/" element={<HomePage/>}/>
        </>
         
         }
            
            {/* <Route element={<TeacherRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route element={<StudentRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route> */}
            {/* <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route> */}
            
            {/* <Route path="/test" element={<CardDashboard/>}/> */}
            <Route path="/*" element={<div>nothing</div>}/>
        </Routes>
   
        
    </div>
  );
}

export default App;
