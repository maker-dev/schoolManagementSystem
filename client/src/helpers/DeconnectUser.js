import Cookies from "js-cookie";

export default function DeconnectUser(){
    Cookies.remove("token", { sameSite: 'lax' });
    Cookies.remove("userRole", { sameSite: 'lax' });
}

