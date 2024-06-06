import { useState } from "react";
import AddButton from "../../buttons/AddButton";
import { useMemo } from "react";


export default function AddSubject({setValidateCredentials, setLoading, eventHide}){
    
    // collecting data :
    const [subjectName, setSubjectName] = useState("");
    const [labs, setLabs] = useState(0);
    
    
    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        subName:subjectName,
        labs: labs
    }), [subjectName, labs]);

    return(
    <>
                    {/* INput nom du module */}
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Module</label>
                        <input type="text"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value) }
                        name="name"
                        autoComplete="on"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Module"
                        required/>
                    </div>

                    {/* INput facteur du module */}
                    <div className="col-span-2">
                        <label htmlFor="facteur" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Facteur Module</label>
                        <input type="number"
                        value={labs}
                        onChange={(e) => setLabs(e.target.value) }
                        name="facteur"
                        id="facteur"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Facteur"
                        required/>
                    </div>
                   
                    {/* Button of updating */}
                    <div className="col-span-2">
                        <AddButton 
                        setInputs={[setSubjectName,setLabs]}
                        setLoading={setLoading} 
                        addApi="insertSubject" 
                        arrayData={allData} 
                        setValidateCredentials={setValidateCredentials} 
                        title="Module" 
                        eventHide={eventHide}></AddButton>
                    </div>


    </>
    );
}