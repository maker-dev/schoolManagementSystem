import { useState, useEffect, useMemo } from "react";
import api from "../../../api/apiToken";
import UpdateButton from "../../buttons/UpdateButton";

export default function UpdateSubject({ subjectId, setValidateCredentials, setLoading, eventHide }) {
    
    // State for the new data
    const [newSubName, setNewSubName] = useState("");
    const [newLabs, setNewLabs] = useState(0);

  

    // Fetch module data
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                if (subjectId !== "") {
                    const response = await api.get(`showSubject/${subjectId}`);
                    setNewSubName(response.data.subName);
                    setNewLabs(response.data.labs);
                }
            } catch (error) {
                console.error('Error fetching module data', error);
            }
        };

        fetchSubject();
    }, [subjectId]);


    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        subjectId:subjectId,
        newSubjectName: newSubName,
        newLabs: newLabs
    }), [newSubName, newLabs, subjectId]);

    return (
        <>
            {/* Nom du module */}
            <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom Module</label>
                <input type="text"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    name="name"
                    id="name"
                    autoComplete="no"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nom Module"
                    required />
            </div>
            
            {/* INput facteur du module */}
            <div className="col-span-2">
                        <label htmlFor="facteur" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Facteur Module</label>
                        <input type="number"
                        value={newLabs}
                        onChange={(e) => setNewLabs(e.target.value) }
                        name="facteur"
                        id="facteur"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Facteur"
                        required/>
            </div>

            <div className="col-span-2">
                <UpdateButton 
                    eventHide={eventHide} 
                    updateApi="updateSubject"
                    title="Module" 
                    arrayData={allData} 
                    setValidateCredentials={setValidateCredentials} 
                    setLoading={setLoading}>
                </UpdateButton>
            </div>
        </>
    );
}
