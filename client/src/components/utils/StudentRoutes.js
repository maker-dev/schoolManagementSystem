import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const StudentRoutes  = () => {
    const user = Cookies.get('userRole');
    if(user == "Student"){
        return  <Outlet />;
    }else if(user == null || user == undefined || user == "null"|| user == ""){
        return <Navigate to="/userChoice" />;
    }else return <Navigate to="/dashboard"/>;
    
}

export default StudentRoutes;