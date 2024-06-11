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
import FilierePage from "./components/pages/admin/FilierePage";
import BacPage from "./components/pages/admin/BacPage";
import SubjectPage from "./components/pages/admin/SubjectPage";
import ClassPage from "./components/pages/admin/ClassPage";
import ShowClassPage from "./components/overflow/class/ShowClassPage";
import 'react-toastify/dist/ReactToastify.css';
import PlainningPage from "./components/pages/PlainningPage";



function App() {
  
  
  return (
    <div className="App">
      
      <Routes>
        <Route element={<AdminRoutes/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/filiere" element={<FilierePage />} />
          <Route path="/bac" element={<BacPage />} />
          <Route path="/subject" element={<SubjectPage />} />
          <Route path="/class" element={<ClassPage />} />
          <Route path="/class/show" element={<ShowClassPage />} />
          <Route path="/emploieTemps" element={<PlainningPage/>}/>
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
