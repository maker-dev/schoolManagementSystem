
import {  Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/ui/NavBar';
import SideBar from "./components/ui/SideBar";
import HomePage from "./components/pages/HomePage";


function App() {
  
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    </div>
  );
}

export default App;
