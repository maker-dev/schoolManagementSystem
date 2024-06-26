import { ToastContainer } from "react-toastify";
import TitleCard from "../../../cards/TitleCard";
import SideBar from "../../../ui/SideBar";
import NavBar from "../../../ui/NavBar";
import ShowListStudents from "../../ShowListStudents";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function AbscenceClassTeacher() {
    // Get the state from useLocation
    const location = useLocation();
    const { id, className } = location.state || {}; // Destructure className from the state
    const navigate = useNavigate();


    useEffect(() => {
        if(id === undefined || id === "" || id === null){
            navigate("/");
        }
    },[id, navigate]);
    
    return (
        <div className="flex flex-col h-screen">
            <div className="">
                <NavBar />
            </div>
            <div className="flex">
                <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                    <SideBar />
                </div>
                <div className="flex flex-col gap-4 h-screen max-h-min bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                    <div className="mx-0 md:mx-6 mt-6">
                        <TitleCard title="Abscence"></TitleCard>
                    </div>
                    {(id !== undefined && id !== null) &&
                            <div className="mx-0 md:mx-6 text-center">
                                <ShowListStudents  className={className} id={id} role={"Etudiants"} />
                            </div>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
