import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AdminRoutes  = () => {
    const user = Cookies.get('userRole');
    if(user === "Admin"){
        return  <Outlet />;
    }else if(user === null || user === undefined || user === "null"|| user === ""){
        return <Navigate to="/userChoice" />;
    }else return <Navigate to={`/${user}/dashboard`}/>;
    
}

export default AdminRoutes;