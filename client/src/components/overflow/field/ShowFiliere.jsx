import { useState, useEffect } from "react";
import api from "../../../api/apiToken";
import ShowList from "../../ui/ShowList";


export default function ShowFiliere({id}){

    const [fieldName, setFieldName] = useState("");
    const [typeBacs, setTypeBacs] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    // fetching for data about the filiere data:
    useEffect(() => {
        const fetchField = async () => {
          try {
            if(id !== ""){
                const response = await api.get(`showField/${id}`);
                setTypeBacs(response.data.bacRequired === undefined?[]:response.data.bacRequired);
                setFieldName(response.data.fieldName); 
                setSubjectList(response.data.subjects); 
            }
          } catch (error) {
            error('Error');
          }
        };
    
        fetchField();
      },[id]);

    
    return(


           
            <>
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Filière</label>
                        <input type="text"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value) }
                        name="name"
                        id="name"
                        autoComplete="on"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Filière"
                        readOnly={true}
                        required/>
                    </div>
                   
                    <div className="col-span-2">
                    <span  className="block mb-2 text-sm font-medium text-gray-900 text-left">Bac Selectionner</span>
                        <ShowList array={typeBacs}></ShowList>
                    </div>
                    <div className="col-span-2">
                    <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Module Selectionner</span>
                        <ShowList array={subjectList}></ShowList>
                    </div>
            </> 

    );
}