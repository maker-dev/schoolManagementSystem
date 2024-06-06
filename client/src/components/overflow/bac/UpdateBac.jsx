import { useState, useEffect, useMemo } from "react";
import api from "../../../api/apiToken";
import UpdateButton from "../../buttons/UpdateButton";

export default function UpdateBac({ typeId, setValidateCredentials, setLoading, eventHide }) {
    //functionalities
    const [newTypeName, setNewTypeName] = useState("");

    // Fetching bac data
    useEffect(() => {
        const fetchBac = async () => {
            try {
                if (typeId !== "") {
                    const response = await api.get(`showType/${typeId}`);
                    setNewTypeName(response.data.typeName);
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchBac();
    }, [typeId]);

    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        typeId:typeId,
        newTypeName: newTypeName,
    }), [typeId, newTypeName]);
    

    return (
        <>
            <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom Bac</label>
                <input type="text"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    name="name"
                    autoComplete="on"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nom Bac"
                    required />
            </div>

            <div className="col-span-2">
                <UpdateButton 
                eventHide={eventHide}
                updateApi="updateType" 
                title="Bac" 
                arrayData={allData} 
                setValidateCredentials={setValidateCredentials} 
                setLoading={setLoading}></UpdateButton>
            </div>
            
        </>
    );
}
