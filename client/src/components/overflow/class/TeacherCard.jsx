import DataHandler from "../../ui/DataHandler";
import api from "../../../api/apiToken";
import { useState, useEffect } from "react";
import Loader from "../../ui/Loader";
import { ToastContainer } from "react-toastify";


export default function TeacherCard({id}){

    //data:
    const [arrayProfInClasse, setArrayProfInClasse] = useState([]);
    const [arrayProfOutClasse, setArrayProfOutClasse] = useState([]);

    //funcionalities:
    const [loading, setLoading] = useState(false);

    //fetching students in classe:
    useEffect(() => {
        const fetchTeachersIn = async () => {

            try {
                
                if (id !== "") {
                    const response = await api.get(`showClassTeachers/${id}`);
                    setArrayProfInClasse(response.data);
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchTeachersIn();
    }, [id,loading]);

    //fetching students out classe:
    useEffect(() => {
        const fetchTeachersOut = async () => {
            try {
                if (id !== "") {
                    const response = await api.get(`showTeachersNotInClass/${id}`);
                    setArrayProfOutClasse(response.data);
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchTeachersOut();
    }, [id,loading]);


    return(
        <div className="flex flex-col items-center justify-center shadow-md bg-white p-4">
            <div className="container mb-2 mt-2 mx-auto">
                <h1 className="font-black text-gray-600 text-xl w-full mb-8 text-center bg-gray-100 p-2">Professeurs en classe</h1>
                <div className=" flex flex-col md:flex-row justify-around">
                    <div className=" w-1/3">
                        <h3 className="text-left my-2 font-bold text-gray-600">Professeurs hors la classe:</h3>
                        <DataHandler arrayData={arrayProfOutClasse}
                         apiUsed="addTeacherToClass" 
                         title="Ajouter Professeur(s)" 
                         color="blue" 
                         svgType="Add" 
                         id={id} 
                         setLoading={setLoading}/>
                    </div>
                    <div className="w-1/3">
                        <h3 className="text-left my-2 font-bold text-gray-600">Professeurs dans la classe:</h3>
                        <DataHandler arrayData={arrayProfInClasse}
                         apiUsed="removeTeacherFromClass"
                        title="Retirer Professeur(s)" 
                        color="red" 
                        svgType="Remove" 
                        id={id} 
                        setLoading={setLoading}/>
                    </div>
                </div>
                <div>

                </div>
            </div>
            {loading && <Loader></Loader>}
            <ToastContainer></ToastContainer>
        </div>
    );
    
}