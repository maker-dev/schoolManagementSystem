import { useState } from "react"
import { ToastContainer } from "react-toastify";
import ShowStudents from "./student_resources/ShowStudents";
import ShowBar from "../../ui/ShowBar";
import TitleCard from "../../cards/TitleCard";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";

export default function StudentPage(){

    const [page, setPage] = useState("Etudiants Confirmées");
    return(
        <div className="flex flex-col h-screen">
        <div className="">
            <NavBar/>
        </div>
        <div className="flex">
            <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                <SideBar/>
            </div>
            <div className="flex flex-col gap-4 h-screen max-h-min bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                    <div className="mx-0 md:mx-6  mt-6">
                        <TitleCard title="Gestion des Etudiants"></TitleCard>
                    </div>
                    <div className="mx-0 md:mx-6  ">
                        <ShowBar page={page} setPage={setPage} arrayPagesName={["Etudiants Confirmées","Etudiants non Confirmées" ]}></ShowBar>
                    </div>
                    <div className="mx-0 md:mx-6 ">
                        {page === "Etudiants Confirmées" &&
                                <ShowStudents type={page} apiIndex="showConfirmedStudents"/>
                        }
                        {page === "Etudiants non Confirmées" &&
                                <ShowStudents type={page} apiIndex="showNoConfirmedStudents"/>
                        }
                    </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
    )
}