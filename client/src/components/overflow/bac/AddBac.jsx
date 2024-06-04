import { useState } from "react";
import AddButton from "../../buttons/AddButton";
import { useMemo } from "react";


export default function AddBac({setValidateCredentials, setLoading, eventHide}){
    
    // collecting data :
    const [typeName, setTypeName] = useState("");

    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        typeName:typeName,
    }), [typeName]);

    return(
    <>
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Type Bac</label>
                        <input type="text"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value) }
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Filière"
                        required/>
                    </div>
                    <div className="col-span-2">
                        <AddButton 
                        setInputs={[setTypeName]}
                        setLoading={setLoading} 
                        addApi="insertType" 
                        arrayData={allData} 
                        setValidateCredentials={setValidateCredentials} 
                        title="Bac" 
                        eventHide={eventHide}></AddButton>
                    </div>


    </>
    );
}