import NavBar from "../../ui/NavBar";
import SideBar from "../../ui/SideBar";
import ShowBar from "../../ui/ShowBar";
import TitleCard from "../../cards/TitleCard";
import { useState , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../api/apiToken";
import InfoCard from "./InfoCard";
import { ToastContainer } from "react-toastify";


export default function ShowClassPage(){

    const[page,setPage] = useState("Informations");
    const navigate  = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    
    // Fetching if there is a classe with  the following id:
    useEffect(() => {
        const fetchClass = async () => {
            try {
                if (id !== "") {
                    const response = await api.get(`showClass/${id}`);
                    if(response.status !== 200){
                        navigate("/");
                    }
                }
            } catch (error) {
                error('Error');
            }
        };

        fetchClass();
    }, [id, navigate]);

    return(
    <div className="flex flex-col h-screen">
        <div className="">
            <NavBar/>
        </div>
        <div className="flex">
            <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                <SideBar/>
            </div>
            <div className="flex flex-col gap-4 h-screen  bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                    <div className="mx-0 md:mx-6  mt-6">
                        <TitleCard title="Gestion Classe"></TitleCard>
                    </div>
                    <div className="mx-0 md:mx-6  ">
                        <ShowBar page={page} setPage={setPage}></ShowBar>
                    </div>
                    <div className="mx-0 md:mx-6  overflow-y-auto ">
                        {page === "Informations" &&
                            <InfoCard title="Informations sur Classe" id={id}></InfoCard>
                        }
                        
                    </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
    )
}