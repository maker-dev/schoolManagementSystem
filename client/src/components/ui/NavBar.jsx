import menu_icon from '../../assets/icons/menu_icon.svg';
import x from '../../assets/icons/x.svg';
import { useState } from "react";
import SideBar from './SideBar'


export default  function NavBar(){

    const [isHidden, setIsHidden] = useState(true);
    const [isConnect, setIsConnect] = useState(true);
    const handleMenu = () => {
        setIsHidden(isHidden ? false:true);
    }
    return (
        <div className="flex flex-col w-full">
           <div className={isHidden ? "hidden":"sm:hidden"}>
                <SideBar/>
           </div>
           <div className="flex justify-between px-6 py-4 w-full bg-teal-600 shadow-lg">
                <div className="flex  justify-between w-1/2">
                    <button onClick={()=>handleMenu()} className="sm:hidden"><img src={isHidden ? menu_icon:x} alt="menu icon" /></button>
                    <div className="text-white font-bold text-xl">Logo</div>
                </div>
                <div> 
                    {isConnect ? (
                    <button className="text-black hover:text-white font-bold py-1 px-2">LogOut</button>
                    ) : (
                    <button className="bg-white text-red-600 hover:text-white hover:bg-red-600 font-bold rounded py-1 px-2">LogIn</button>)
                    }
                </div>

           </div>
        </div>



    );
}