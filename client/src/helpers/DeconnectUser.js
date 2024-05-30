import Cookies from "js-cookie";

export default function DeconnectUser(){
    Cookies.remove("token");
    Cookies.remove("userRole");
}

