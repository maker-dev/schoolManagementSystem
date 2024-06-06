import { useState , useEffect } from "react";
import api from "../../../api/apiToken";
import AddButton from "../../buttons/AddButton";
import { useMemo } from "react";


export default function AddClass({setValidateCredentials, setLoading, eventHide}){
    
    // collecting data :
    const [className, setClassName] = useState("");
    const [fieldOptions, setFieldOptions] = useState([]);
    const [field, setField] = useState("");
    

    //fetching for field data:
    useEffect(() => {
        const fetchField = async () => {
          try {
            const response = await api.get('showFields');
            setFieldOptions(response.data);  
          } catch (error) {
            error("error!")
          }
        };
    
        fetchField();
      },[]);
    

    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        className:className,
        field: field,
    }), [className, field]);

    return(
    <>

                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Classe</label>
                        <input type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value) }
                        autoComplete="on"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Classe"
                        required/>
                    </div>
                    {/* INputs for bac select */}
                    <div className="col-span-2">
                        <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Filière</span>
                        <select 
                        onChange={(e)=>setField(e.target.value)}
                        name="Field"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                            <option  value="" >Seletionner Filière</option>
                            {fieldOptions.length !== 0 && 
                                fieldOptions.map(field =>{
                                    return <option key={field._id} value={field._id}>{field.fieldName}</option>
                                })
                            }
                        </select>
                    </div>
                    
                    {/* Button of add */}
                    <div className="col-span-2">
                        <AddButton 
                        setInputs={[setClassName,setField]}
                        setLoading={setLoading} 
                        addApi="insertClass" 
                        arrayData={allData} 
                        setValidateCredentials={setValidateCredentials} 
                        title="Classe" 
                        eventHide={eventHide}></AddButton>
                    </div>


    </>
    );
}