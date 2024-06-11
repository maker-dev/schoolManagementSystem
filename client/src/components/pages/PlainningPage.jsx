import Cookies from "js-cookie";
import { useState } from "react";
import PlainningAdmin from "./admin/PlainningAdmin";


export default function PlainningPage(){
    const [userRole,] = useState(Cookies.get('userRole'));
    return(
        <div>
            {userRole === "Admin" && 
                <PlainningAdmin/> 
            }
        </div>
    )
}