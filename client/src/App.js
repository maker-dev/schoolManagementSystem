
import {  Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/ui/NavBar';


function App() {
  
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<NavBar/>}/>
        </Routes>
    </div>
  );
}

export default App;
