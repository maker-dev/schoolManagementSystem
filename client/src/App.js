
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
// import CardDashboard from "./components/cards/CardDashboard";


function App() {
  
  return (
    <div className="App">
      <Auth>
        <Routes>
            <Route path="/userChoice" element={<UserChoice/>}/>
            <Route path="/loginEtudiant" element={<LoginStudent/>}/>
            <Route path="/loginAdmin" element={<LoginAdmin/>}/>
            <Route path="/loginProf" element={<LoginTeacher/>}/>
            <Route element={<TeacherRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route element={<StudentRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route path="/" element={<HomePage/>}/>
            {/* <Route path="/test" element={<CardDashboard/>}/> */}
        </Routes>
      </Auth>
        
    </div>
  );
}

export default App;
