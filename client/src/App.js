
import {  Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
// import CardDashboard from "./components/cards/CardDashboard";


function App() {
  
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            {/* <Route path="/test" element={<CardDashboard/>}/> */}
        </Routes>
    </div>
  );
}

export default App;
