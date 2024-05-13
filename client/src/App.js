
import {  Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import UserChoice from "./components/pages/UserChoice";
import Login from "./components/pages/Login";
import LoginStudent from "./components/pages/LoginStudent";
import LoginAdmin from "./components/pages/LoginAdmin";
import LoginTeacher from "./components/pages/LoginTeacher";
// import CardDashboard from "./components/cards/CardDashboard";


function App() {
  
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/userChoice" element={<UserChoice/>}/>
            <Route path="/loginEtudiant" element={<LoginStudent/>}/>
            <Route path="/loginAdmin" element={<LoginAdmin/>}/>
            <Route path="/loginProf" element={<LoginTeacher/>}/>

            {/* <Route path="/test" element={<CardDashboard/>}/> */}
        </Routes>
    </div>
  );
}

export default App;
