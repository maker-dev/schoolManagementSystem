import DataHandler from "../../ui/DataHandler";
import api from "../../../api/apiToken";
import { useState, useEffect } from "react";
import Loader from "../../ui/Loader";
import { ToastContainer } from "react-toastify";


export default function StudentCard({id}){

    //data:
    const [arrayEtudiantInClasse, setArrayEtudiantInClasse] = useState([]);
    const [arrayEtudiantOutClasse, setArrayEtudiantOutClasse] = useState([]);

    //funcionalities:
    const [loading, setLoading] = useState(false);

    //fetching students in classe:
    useEffect(() => {
        const fetchStudentsIn = async () => {

            try {
                
                if (id !== "") {
                    const response = await api.get(`showClassStudents/${id}`);
                    setArrayEtudiantInClasse(response.data);
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchStudentsIn();
    }, [id,loading]);

    //fetching students out classe:
    useEffect(() => {
        const fetchStudentsOut = async () => {
            try {
                if (id !== "") {
                    const response = await api.get(`showFieldStudents/${id}`);
                    setArrayEtudiantOutClasse(response.data);
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchStudentsOut();
    }, [id,loading]);


    return(
        <div className="flex flex-col items-center justify-center shadow-md bg-white p-4">
            <div className="container mb-2 mt-2 mx-auto">
                <h1 className="font-black text-gray-600 text-xl w-full mb-8 text-center bg-gray-100 p-2">Etudiants en classe</h1>
                <div className=" flex flex-col md:flex-row justify-around">
                    <div className=" w-1/3">
                        <h3 className="text-left my-2 font-bold text-gray-600">Etudiants hors la classe:</h3>
                        <DataHandler arrayData={arrayEtudiantOutClasse}
                         apiUsed="addStudentToClass" 
                         title="Ajouter Etudiant(s)" 
                         color="blue" 
                         svgType="Add" 
                         id={id} 
                         setLoading={setLoading}/>
                    </div>
                    <div className="w-1/3">
                        <h3 className="text-left my-2 font-bold text-gray-600">Etudiants dans la classe:</h3>
                        <DataHandler arrayData={arrayEtudiantInClasse}
                         apiUsed="removeStudentFromClass"
                        title="Retirer Etudiant(s)" 
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