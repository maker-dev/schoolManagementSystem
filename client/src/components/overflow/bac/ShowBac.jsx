import { useState, useEffect } from "react";
import api from "../../../api/apiToken";

export default function ShowBac({ id }) {
    //functionalities
    const [newTypeName, setNewTypeName] = useState("");

    // Fetching bac data
    useEffect(() => {
        const fetchBac = async () => {
            try {
                if (id !== "") {
                    const response = await api.get(`showType/${id}`);
                    setNewTypeName(response.data.typeName);
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchBac();
    }, [id]);
    

    return (
        <>
            <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom Filière</label>
                <input type="text"
                    readOnly
                    value={newTypeName}
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nom Filière"
                    required />
            </div>
            
        </>
    );
}
