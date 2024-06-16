import NavBar from "../../ui/NavBar";
import SideBar from "../../ui/SideBar";
import CardInfo from "../../cards/CardInfo";
import StudentIC from "../../../assets/icons/student_white.svg";
import TeacherIC from "../../../assets/icons/teacher_white.svg";
import FiliereIC from "../../../assets/icons/filiere_white.svg";

export default function DashboardStudent(){
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
                <div className="grid grid-cols-1 gap-4  px-4 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  sm:px-8">
        
                <CardInfo title="Total Etudiants" number="10" color='bg-green-400' icon={StudentIC}/>
                <CardInfo title="Total Professeures" number="10200" color='bg-orange-400' icon={TeacherIC}/>
                <CardInfo title="Nombre Filières" number="10" color='bg-red-400' icon={FiliereIC}/>
                <CardInfo title="Nombre Etudiants Non Payés" number="10" color='bg-red-500' icon={StudentIC}/>
                
                    
                </div>
                <div className="bg-white p-6 mx-4 shadow overflow-y-auto">
                    <h2>hi</h2>
                </div>
            </div>
        </div>
    </div>
    )
    
}