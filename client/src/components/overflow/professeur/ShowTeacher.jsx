import { useState, useEffect } from "react";
import ShowList from "../../ui/ShowList";
import api from "../../../api/apiToken";
import { error } from "../../../helpers/Alerts";

export default function ShowTeacher({ id }) {
    // Collecting data:
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [salaire, setSalaire] = useState(0);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState([]);

    // Fetching data about the teacher:
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                if (id !== "") {
                    const response = await api.get(`showTeacher/${id}`);
                    if(response.status === 200){
                        setPrenom(response.data.firstName);
                        setNom(response.data.lastName);
                        setSalaire(response.data.salary);
                        setEmail(response.data.email);
                        setSubject(response.data.teacherSubject);

                    }else{
                        error("Erreur!");
                    }
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchTeacher();
    }, [id]);

   
    return (
        <>
            <div className="col-span-2 flex flex-col md:flex-row gap-2">
                {/* Teacher firstName */}
                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom</span>
                    <input
                        type="text"
                        value={nom}
                        autoComplete="on"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 cursor-not-allowed text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom"
                        required
                        readOnly
                    />
                </div>
                {/* Teacher LastName */}
                <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 text-left">Prénom</label>
                    <input
                        type="text"
                        value={prenom}
                        autoComplete="on"
                        name="lastname"
                        id="lastname"
                        className="bg-gray-50 border border-gray-300 cursor-not-allowed text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Prénom"
                        required
                        readOnly
                    />
                </div>
            </div>
            {/* Salary per hour */}
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Salaire (Dhs/heure)</span>
                <input
                    type="number"
                    min="0"
                    value={salaire}
                    name="salaire"
                    id="salaire"
                    className="bg-gray-50 border border-gray-300 text-gray-900 cursor-not-allowed text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Salaire (dhs/heure)"
                    required
                    readOnly
                />
            </div>
            {/* Email */}
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">E-mail</span>
                <input
                    type="text"
                    value={email}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900  cursor-not-allowed text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Email"
                    required
                    readOnly
                />
            </div>
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Module Selectionner</span>
                <ShowList array={subject} ></ShowList>
            </div>
        </>
    )
}
