import { ToastContainer } from "react-toastify";
import TitleCard from "../../cards/TitleCard";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";
import { useEffect, useState } from "react";
import { error } from "../../../helpers/Alerts";
import DeconnectUser from "../../../helpers/DeconnectUser";
import api from "../../../api/apiToken";
import Loader from "../../ui/Loader";

export default function TeacherProfile(){
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

  //fetching for connected user:
    const fetchUser = async () => {
        setLoading(true);
        try {
          const response = await api.post('user');

          if (response.status === 200) {
            setUser(response.data);
          } else if (response.status === 400 ) {
            setUser(null);
          }else if(response.status === 401){
            DeconnectUser();
          }else{
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
                        <TitleCard title={"Profile Professeur"}></TitleCard>
                    </div>
                    <div className="mx-0 md:mx-6 mt-6 flex justify-center items-center  bg-gray-100 my-6 ">
                    <div className=" w-full bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl text-gray-600 bg-gray-100 p-4 font-bold mb-6 text-center">General informations</h2>
                        <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Email</span>
                                <input type="text" 
                                value={user?.email || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed  p-2 border bg-gray-100  border-gray-300 rounded-md" 
                                placeholder="email" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Role</span>
                                <input type="text" 
                                value={"Professeur"}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed  p-2 border bg-gray-100  border-gray-300 rounded-md" 
                                placeholder="role" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Nom</span>
                                <input type="text" 
                                value={user?.firstName || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed  p-2 border bg-gray-100  border-gray-300 rounded-md" 
                                placeholder="nom" />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Prénom</span>
                                <input type="text" 
                                value={user?.lastName || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed  p-2 border bg-gray-100  border-gray-300 rounded-md" 
                                placeholder="prenom" />
                            </div>    
                            <div>
                                <span className="block text-sm font-medium text-gray-700 text-left">Salaire (DHs/heure)</span>
                                <input type="text" 
                                value={user?.salary || ""}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed  p-2 border bg-gray-100  border-gray-300 rounded-md" 
                                placeholder="salaire" />
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