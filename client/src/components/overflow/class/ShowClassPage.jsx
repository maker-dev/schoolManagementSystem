import NavBar from "../../ui/NavBar";
import SideBar from "../../ui/SideBar";
import ShowBar from "../../ui/ShowBar";
import TitleCard from "../../cards/TitleCard";
import { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";


export default function ShowClassPage(){

    const[page,setPage] = useState("Informations");
    const location = useLocation();
    const { id } = location.state || {};
    useEffect(() => {
        if (id) {
            // Use the id to fetch data or perform other actions
            console.log("Received id:", id);
        }
    }, [id]);

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
            </div>
        </div>
    </div>
    )
}