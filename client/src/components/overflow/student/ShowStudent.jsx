import { useState, useEffect } from "react";
import api from "../../../api/apiToken";
import { error, success } from "../../../helpers/Alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { useNavigate } from "react-router-dom";

export default function ShowStudent({ id }) {

    //data:
    const [filiere, setFiliere] = useState(null); 
    const [nom, setNom] = useState(null); 
    const [prenom, setPrenom] = useState(null); 
    const [bac, setBac] = useState(null); 
    const [email, setEmail] = useState(null); 
    const [phone, setPhone] = useState(null);
    const [classe, setClasse] = useState(null);

    //functionalities
    const [confirmation, setConfirmation] = useState(true); 
    const [isLoading, setLoading] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(false); 
    const navigate = useNavigate();
    //fetch student:
    useEffect(() => {
        const fetchStudent = async () => {
            setLoading(true);
            try {
                if (id !== "") {
                    const response = await api.get(`showStudent/${id}`);
                    if (response.status === 200) {
                        setBac(response.data.typeOfBac.typeName);
                        setFiliere(response.data.field.fieldName);
                        setNom(response.data.firstName);
                        setPrenom(response.data.lastName);
                        setEmail(response.data.email);
                        setConfirmation(response.data.confirmation);
                        setPhone(response.data.tel);
                        setClasse((response.data.class === undefined || response.data.class === null)?null:response.data.class.className);
                    } else {
                        error("Erreur!");
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id, fetchTrigger]); 
    //handling confirmation event:
    const handleConfirmation = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await api.post(`confirmStudent/${id}`);
            if (response.status === 401) {
                DeconnectUser();
                navigate("/");
                console.log("error authorization");
            } else if (response.status === 200) {
                success("Confirmation effectuée!");
                setFetchTrigger(!fetchTrigger); 
            } else {
                error("Une erreur est survenue");
            }
        } catch (e) {
            console.error("Error!", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="col-span-2 flex flex-col md:flex-row gap-2">
                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom</span>
                    <input
                        type="text"
                        value={nom || ""} 
                        autoComplete="on"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 cursor-not-allowed text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom"
                        required
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 text-left">Prénom</label>
                    <input
                        type="text"
                        value={prenom || ""} 
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
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">E-mail</span>
                <input
                    type="text"
                    value={email || ""} 
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900  cursor-not-allowed text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Email"
                    required
                    readOnly
                />
            </div>
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Filière</span>
                <input
                    type="text"
                    value={filiere || ""} 
                    name="field"
                    id="field"
                    className="bg-gray-50 border border-gray-300 text-gray-900 cursor-not-allowed text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Filiere"
                    required
                    readOnly
                />
            </div>
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Type Bac</span>
                <input
                    type="text"
                    value={bac || ""} 
                    name="field"
                    id="field"
                    className="bg-gray-50 border border-gray-300 text-gray-900 cursor-not-allowed text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Filiere"
                    required
                    readOnly
                />
            </div>
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Telphone</span>
                <input
                    type="text"
                    value={phone || ""} 
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 cursor-not-allowed text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Telephone"
                    required
                    readOnly
                />
            </div>
            {classe && 
                    <div className="col-span-2">
                    <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Classe</span>
                    <input
                        type="text"
                        value={classe || ""} 
                        name="classe"
                        id="classe"
                        className="bg-gray-50 border border-gray-300 text-gray-900 cursor-not-allowed text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Classe"
                        required
                        readOnly
                    />
                    </div>
            }
            {confirmation === false && 
            <div className="col-span-2">
                <button
                    className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 px-4 py-2.5"
                    onClick={handleConfirmation}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> 
                            Chargement...
                        </>
                    ) : (
                        <>
                            Confirmer
                            <FontAwesomeIcon icon={faCheck} className="ml-2" /> 
                        </>
                    )}
                </button>
            </div>
            }
        </>
    )
}
