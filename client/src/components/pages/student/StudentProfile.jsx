import { ToastContainer } from "react-toastify";
import TitleCard from "../../cards/TitleCard";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";
import { useEffect, useState } from "react";
import { error } from "../../../helpers/Alerts";
import DeconnectUser from "../../../helpers/DeconnectUser";
import api from "../../../api/apiToken";
import Loader from "../../ui/Loader";

export default function StudentProfile(){
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    //fetching connected user :
    const fetchUser = async () => {
        setLoading(true);
        try {
          const response = await api.post('user');
          if (response.status === 200) {
            setUser(response.data);
          } else if (response.status === 400 ) {
            setUser(null);
          } else if(response.status === 401){
            DeconnectUser();
          } else {
            error("Erreur serveur");
          }
        } catch (e) {
          error("Erreur serveur");
          setUser(null);
          setLoading(false);
        }
        setLoading(false);
      };
    
      useEffect(() => {
        fetchUser();
      }, []);

    return(
        <div className="flex flex-col h-screen">
            <div className="">
                <NavBar />
            </div>
            <div className="flex">
                <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                    <SideBar />
                </div>
                <div className="flex flex-col gap-4 h-screen bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                    <div className="mx-0 md:mx-6 mt-6">
                        <TitleCard title={"Profile Etudiant"}></TitleCard>
                    </div>
                    <div className="mx-0 md:mx-6 mt-6 flex justify-center items-center  bg-gray-100 my-6 ">
                    <div className=" w-full bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl text-gray-600 bg-gray-100 p-4 font-bold mb-6 text-center">Informations générales</h2>
                        <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Email</span>
                                <input type="text" 
                                value={user?.email || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Role</span>
                                <input type="text" 
                                value={"Etudiant"}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Nom</span>
                                <input type="text" 
                                value={user?.firstName || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Prénom</span>
                                <input type="text" 
                                value={user?.lastName || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Téléphone</span>
                                <input type="text" 
                                value={user?.tel || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Filière</span>
                                <input type="text" 
                                value={user?.field?.fieldName || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Type du Bac</span>
                                <input type="text" 
                                value={user?.typeOfBac?.typeName || ""}  
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Classe</span>
                                <input type="text" 
                                value={user?.class?.className || ""}  
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed p-2 border bg-gray-100 border-gray-300 rounded-md" 
                                placeholder="Vide" />
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>  
            {loading && <Loader />}
            <ToastContainer />
        </div>
    )
}
