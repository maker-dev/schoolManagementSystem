import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import CardInfo from "../cards/CardInfo";
import Icon from "../../assets/icons/student_white.svg";

export default function Dashboard(){
    return(
    <div className="flex flex-col h-screen">
        <div className="">
            <NavBar/>
        </div>
        <div className="flex">
            <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                <SideBar/>
            </div>
            <div className="h-screen bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                
                
            <div className="grid grid-cols-1 gap-4  px-4 mt-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:px-8">
    
            <CardInfo title="Totale Etudiant" number="10" color='bg-green-400' icon={Icon}/>
            <CardInfo title="Totale Etudiant" number="10" color='bg-orange-400' icon={Icon}/>
            <CardInfo title="Totale Etudiant" number="10" color='bg-red-400' icon={Icon}/>
            <CardInfo title="Totale Etudiant" number="10" color='bg-blue-400' icon={Icon}/>
            <CardInfo title="Totale Etudiant" number="10" color='bg-green-400' icon={Icon}/>
                
            </div>
            </div>
        </div>
    </div>
    )
    
}