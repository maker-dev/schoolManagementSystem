import menu_icon from '../../assets/icons/menu_icon.svg';
import x from '../../assets/icons/x.svg';
import { useState } from "react";
import SideBar from './SideBar'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

export default  function NavBar(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(true);
    

    const  logOut = () =>{
        setLoading(true);
        Cookies.remove('token');
        Cookies.set('userRole',null);
        navigate('/');
        setLoading(false);
    }

    const handleMenu = () => {
        setIsHidden(isHidden ? false:true);
    }
    return (
        <div className="flex flex-col w-full">
           <div className={isHidden ? "hidden":"md:hidden"}>
                <SideBar/>
           </div>
           <div className="flex justify-between px-6 py-4 w-full bg-teal-600 shadow-lg">
                <div className="flex  justify-between w-1/2">
                    <button onClick={()=>handleMenu()} className="md:hidden"><img src={isHidden ? menu_icon:x} alt="menu icon" /></button>
                    <div className="text-white font-bold text-xl">Logo</div>
                </div>
                <div> 
                    <button className="text-black hover:text-white font-bold py-1 px-2" onClick={logOut}>Se Déconnecter</button>
                </div>

           </div>
           {loading && <Loader/>}
        </div>



    );
}