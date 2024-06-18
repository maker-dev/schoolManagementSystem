import {  Route,  Routes } from "react-router-dom";
import './App.css';
import HomePage from "./components/pages/HomePage";
import UserChoice from "./components/pages/UserChoice";
import LoginStudent from "./components/pages/student/LoginStudent";
import LoginAdmin from "./components/pages/admin/LoginAdmin";
import LoginTeacher from "./components/pages/teacher/LoginTeacher";
import SignUp from "./components/pages/SignUp";
import AdminRoutes from "./components/utils/AdminRoutes";
import GuestRoutes from "./components/utils/GuestRoutes";
import FilierePage from "./components/pages/admin/FilierePage";
import BacPage from "./components/pages/admin/BacPage";
import SubjectPage from "./components/pages/admin/SubjectPage";
import ClassPage from "./components/pages/admin/ClassPage";
import ShowClassPage from "./components/overflow/class/ShowClassPage";
import 'react-toastify/dist/ReactToastify.css';
import PlainningPage from "./components/pages/PlainningPage";
import ProfilePage from "./components/pages/ProfilePage";
import TeacherPage from "./components/pages/admin/TeacherPage";
import StudentPage from "./components/pages/admin/StudentPage";
import WaitingConfirmationPage from "./components/pages/student/WaitingConfirmationPage";
import StudentRoutes from "./components/utils/StudentRoutes";
import DashboardStudent from "./components/pages/student/DashboardStudent";
import NonConfirmedRoute from "./components/utils/NonConfirmedRoute";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ChangePasswordPage from "./components/pages/ChangePasswordPage";
import Cookies from "js-cookie";
import { useState } from "react";



function App() {
  

  return (
    <div className="App">
      
      <Routes>
        

        <Route element={<AdminRoutes/>}>
          <Route path="/Admin/dashboard" element={<AdminDashboard />} />
          <Route path="/filiere" element={<FilierePage />} />
          <Route path="/bac" element={<BacPage />} />
          <Route path="/subject" element={<SubjectPage />} />
          <Route path="/class" element={<ClassPage />} />
          <Route path="/class/show" element={<ShowClassPage />} />
          <Route path="/emploieTemps" element={<PlainningPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/professeurs" element={<TeacherPage/>}/>
          <Route path="/etudiants" element={<StudentPage/>}/>
        </Route>
        
        <Route element={<StudentRoutes/>}>
          <Route path="/Student/dashboard/" element={<DashboardStudent />} />
        </Route>

        <Route element={<NonConfirmedRoute/>}>
          <Route path="/waiting" element={<WaitingConfirmationPage/>}/>
        </Route>
       
        <Route element={<GuestRoutes/>}>
            <Route path="/userChoice" element={<UserChoice />} />
            <Route path="/loginEtudiant" element={<LoginStudent />} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/loginProf" element={<LoginTeacher />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/forgetPassword" element={<ForgotPasswordPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path={`/resetPassword/:resetToken`} element={<ChangePasswordPage />} />
        </Route>

        
            
          
        
      </Routes>
    </div>
  );
}

export default App;
