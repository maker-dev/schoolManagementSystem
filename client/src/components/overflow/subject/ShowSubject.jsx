import { useState, useEffect } from "react";
import api from "../../../api/apiToken";


export default function UpdateSubject({ id }) {
    
    // State for the new data
    const [subName, setSubName] = useState("");
    const [labs, setLabs] = useState(0);

  

    // Fetch module data
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                if (id !== "") {
                    const response = await api.get(`showSubject/${id}`);
                    setSubName(response.data.subName);
                    setLabs(response.data.labs);
                }
            } catch (error) {
                console.error('Error fetching module data', error);
            }
        };

        fetchSubject();
    }, [id]);

    return (
        <>
            {/* Nom du module */}
            <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom Module</label>
                <input type="text"
                    value={subName}
                    readOnly
                    autoComplete="on"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nom Module"
                    required />
            </div>
            
            {/* INput facteur du module */}
            <div className="col-span-2">
                        <label htmlFor="facteur" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Facteur Module</label>
                        <input type="number"
                        value={labs}
                        readOnly
                        name="facteur"
                        id="facteur"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Facteur"
                        required/>
            </div>

        </>
    );
}
