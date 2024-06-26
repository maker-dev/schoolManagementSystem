import { useState } from "react"
import { ToastContainer } from "react-toastify";
import ShowPlainning from "./admin_plainning_pages/ShowPlainning";
import ShowBar from "../../ui/ShowBar";
import TitleCard from "../../cards/TitleCard";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";

export default function PlainningAdmin(){

    const [page, setPage] = useState("Classes");
    return(
        <div className="flex flex-col h-screen text-center">
        <div className="">
            <NavBar/>
        </div>
        <div className="flex">
            <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                <SideBar/>
            </div>
            <div className="flex flex-col gap-4 h-screen max-h-min bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                    <div className="mx-0 md:mx-6  mt-6">
                        <TitleCard title="Gestion d'Emploie du temps"></TitleCard>
                    </div>
                    <div className="mx-0 md:mx-6  ">
                        <ShowBar page={page} setPage={setPage} arrayPagesName={["Classes","Professeurs" ]}></ShowBar>
                    </div>
                    <div className="mx-0 md:mx-6 ">
                        {page === "Classes" &&
                                <ShowPlainning type={page} apiIndex="showClasses"/>
                        }
                        {page === "Professeurs" &&
                                <ShowPlainning type={page} apiIndex="showAllTeachers"/>
                        }
                    </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
    )
}