import React, { useState, useEffect } from "react";
import api from "../../../api/apiToken";
import { error, success } from "../../../helpers/Alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ShowStudent({ id }) {
    const [filiere, setFiliere] = useState(null); 
    const [nom, setNom] = useState(null); 
    const [prenom, setPrenom] = useState(null); 
    const [bac, setBac] = useState(null); 
    const [email, setEmail] = useState(null); 
    const [phone, setPhone] = useState(null);
    const [classe, setClasse] = useState(null);
    const [confirmation, setConfirmation] = useState(true); 
    const [isLoading, setLoading] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            setLoading(true);
            try {
                if (id !== "") {
                    const response = await api.get(`showStudent/${id}`);
                    if (response.status === 200) {
                        const data = response.data;
                        setBac(data.typeOfBac.typeName);
                        setFiliere(data.field.fieldName);
                        setNom(data.firstName);
                        setPrenom(data.lastName);
                        setEmail(data.email);
                        setConfirmation(data.confirmation);
                        setPhone(data.tel);
                        setClasse(data.class?.className || null);
                    } else {
                        error("Erreur!");
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                error("Erreur serveur lors du chargement des données.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id, fetchTrigger]); 

    const handleConfirmation = async (e) => {
        e.preventDefault();

        confirmAlert({
            title: 'Confirmer',
            message: 'Êtes-vous sûr de vouloir confirmer ce Etudiant ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
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
                            error("Erreur serveur lors de la confirmation du student.");
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () => { }
                }
            ]
        });
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
