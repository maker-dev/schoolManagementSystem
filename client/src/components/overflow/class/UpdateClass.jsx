import { useState , useEffect } from "react";
import api from "../../../api/apiToken";
import UpdateButton from "../../buttons/UpdateButton";
import { useMemo } from "react";



export default function UpdateClass({classId, setValidateCredentials, setLoading, eventHide}){
    
    // collecting data :
    const [newClassName, setNewClassName] = useState("");
    const [newFieldOptions, setNewFieldOptions] = useState([]);
    const [newField, setNewField] = useState("");

    //fetching for newField data:
    useEffect(() => {
        const fetchnewField = async () => {
          try {
            const response = await api.get('showFields');
            setNewFieldOptions(response.data);  
          } catch (error) {
            error('Error');
          }
        };
    
        fetchnewField();
      },[]);
    
    // Fetch class data
    useEffect(() => {
        const fetchClass = async () => {
            try {
                if (classId !== "") {
                    const response = await api.get(`showClass/${classId}`);
                    setNewClassName(response.data.className);
                    setNewField(response.data.field)
                }
            } catch (error) {
                error('Error fetching Class data');
            }
        };

        fetchClass();
    }, [classId]);

    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        classId:classId,
        newClassName:newClassName,
        newField: newField,
    }), [newClassName, newField, classId]);
    
    return(
    <>

                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Classe</label>
                        <input type="text"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value) }
                        autoComplete="on"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Classe"
                        required/>
                    </div>
                    {/* INputs for filiere select */}
                    <div className="col-span-2">
                        <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Filière</span>
                        <select 
                        onChange={(e)=>setNewField(e.target.value)}
                        defaultValue={newField}
                        name="newField"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                            <option  value="" >Seletionner Filière</option>
                            {newFieldOptions.length !== 0 && 
                                newFieldOptions.map(newField =>{
                                    return <option key={newField._id} value={newField._id}>{newField.fieldName}</option>
                                })
                            }
                        </select>
                    </div>
                    
                    {/* Button of update */}
                    <div className="col-span-2">
                        <UpdateButton 
                            eventHide={eventHide} 
                            updateApi="updateClass"
                            title="Classe" 
                            arrayData={allData} 
                            setValidateCredentials={setValidateCredentials} 
                            setLoading={setLoading}>
                        </UpdateButton>
                    </div>


    </>
    );
}