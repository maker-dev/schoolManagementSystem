import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const GuestRoutes  = () => {
    const user = Cookies.get('userRole');
    if(user === null || user === undefined || user === "null"|| user === ""){
        return  <Outlet />;
    }else{
        return <Navigate to={`/${user}/dashboard`}/>;
    }
    
}

export default GuestRoutes;