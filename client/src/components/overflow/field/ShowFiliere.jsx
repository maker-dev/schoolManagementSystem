import { useState, useEffect } from "react";
import api from "../../../api/apiToken";
import ShowList from "../../ui/ShowList";



export default function ShowFiliere({display, eventHide, id}){

    const [fieldName, setFieldName] = useState("");
    const [typeBacs, setTypeBacs] = useState([]);

    useEffect(() => {
        const fetchField = async () => {
          try {
            if(id !== ""){
                const response = await api.get(`showField/${id}`);
                setTypeBacs(response.data.bacRequired === undefined?[]:response.data.bacRequired);
                setFieldName(response.data.fieldName); 
            }
          } catch (error) {
            console.error('Error');
          }
        };
    
        fetchField();
      },[id]);

    
    return(

<div aria-hidden="true" className={display + ' backdrop-blur overflow-y-auto overflow-x-hidden fixed right-center z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full'}>
    <div className="relative p-4 w-full max-w-md max-h-full  inset-y-10 start-0 md:start-1/3">
        
        <div className="relative bg-white rounded-lg shadow ">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900 ">
                        Informations sur Filière
                </h3>
                <button 
                onClick={eventHide}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only"></span>
                </button>
            </div>
           
            <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Filière</label>
                        <input type="text"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value) }
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Filière"
                        readOnly={true}
                        required/>
                    </div>
                   
                    <div className="col-span-2">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 text-left">Bac Selectionner</label>
                        <ShowList array={typeBacs}></ShowList>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div> 

    );
}