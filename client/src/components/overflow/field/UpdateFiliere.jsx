import { useState , useEffect } from "react";
import api from "../../../api/apiToken";
import Loader from "../../ui/Loader";
import  {useNavigate} from "react-router-dom";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { success, error } from "../../../helpers/Alerts";


export default function UpdateFiliere({display, eventHide, fieldId}){
    //functionalities
    const [newFieldName, setNewFieldName] = useState("");
    const [loading, setLoading] = useState(false);
    const [validateCredentials, setValidateCredentials] = useState([]);
    const navigate = useNavigate();
    
    //data collector:
    const [bacOptions, setBacOptions] = useState([]);
    const [typeBac, setTypeBac] = useState([]);
    
    //getting field data:
    useEffect(() => {
        const fetchField = async () => {
          try {
            const response = await api.get(`showField/${fieldId}`);
            // setOptions(response.data);
            setBacOptions(response.data.bacRequired === undefined?[]:response.data.bacRequired);
            setNewFieldName(response.data.fieldName);  
          } catch (error) {
            console.error('Error');
          }
        };
    
        fetchField();
      },[fieldId]);
    //getting bac data:
    useEffect(() => {
        const fetchBacType = async () => {
          try {
            const response = await api.get('typesOfBac');
            // setOptions(response.data);
            setTypeBac(response.data);  
          } catch (error) {
            console.error('Error');
          }
        };
    
        fetchBacType();
      },[]);
    //Update field event:
    const updateFiliere = async (e) => {

        setLoading(true);
        setValidateCredentials("");
        e.preventDefault();
          try{
            let newBacRequired = bacOptions.map((bac)=>{
                return bac._id;
            })
            
            const response = await api.put("updateField", JSON.stringify({ fieldId, newFieldName, newBacRequired }));
            if(response.status === 401){
                
                DeconnectUser();
                navigate("/");
                console.log("error autorization");

            }
            if (response.status === 400) {
              let arrErrors = [];
              for(let i = 0; i<response.data.errors.length; i++){
                  arrErrors.push({key: i, msg: response.data.errors[i].msg});
              }
              setValidateCredentials(arrErrors);
              
             
            } else if (response.status === 200) {
               success("mise à jour effectueé!") 
               setNewFieldName("");
               setBacOptions([]);
               eventHide();
            }
            setLoading(false);
          }catch(e){
            error("Error!");
          }
        
          
      }

    //Handling bac select in show list:
    const handleSelectedBac = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const newOption = { _id: selectedOption.value, typeName: selectedOption.text };

        setBacOptions((prevOptions) => {
            const foundIndex = prevOptions.findIndex(bac => bac._id === selectedOption.value);
            if (foundIndex === -1) {
                return [...prevOptions, newOption];
            }
            return prevOptions;
        });
    };
    //handling deleting bac from show list:
    const handleDeletedBac = (value) => {
        
        setBacOptions((prevItems) => prevItems.filter(item => item._id !== value));
    }
    console.log(bacOptions);
    
    return(

<div aria-hidden="true" className={display + ' backdrop-blur overflow-y-auto overflow-x-hidden fixed right-center z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full'}>
    <div className="relative p-4 w-full max-w-md max-h-full  inset-y-10 start-0 md:start-1/3">
        
        <div className="relative bg-white rounded-lg shadow ">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900 ">
                        Mise à jour Filière
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
                    {validateCredentials.length !== 0 &&
                        <div className='col-span-2 bg-red-300 text-red-900 p-4'>
                            <ul className='list-disc pl-20 pr-20'>
                                { validateCredentials.map(item => (
                                
                                // Use the item's ID as the key for efficient rendering
                                <li key={item.key}>{item.msg}</li>
                            ))}
                            </ul>
                        </div>
                    }
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Filière</label>
                        <input type="text"
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value) }
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Filière"
                        required/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 text-left">Type de Bac</label>
                        <select 
                        onChange={handleSelectedBac}
                        required={true}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                            <option selected disabled >Seletionner type du Bac</option>
                            {typeBac.length !== 0 && 
                                typeBac.map(typesOfBacSelect =>{
                                    return <option key={typesOfBacSelect._id} value={typesOfBacSelect._id}>{typesOfBacSelect.typeName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-span-2">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 text-left">Bac Selectionner</label>
                        <div className="border bg-gray-50 p-2">
                            <ul >
                                <li className="text-left text-md">Vous avez selectionner:</li>
                                {bacOptions.length !== 0 &&
                                 bacOptions.map( bac => {
                                    return <li
                                    className="text-sm p-2 hover:bg-gray-100  cursor-pointer text-left"
                                    onDoubleClick={()=>handleDeletedBac(bac._id)}
                                    key={bac._id}>{bac.typeName}</li>
                                 })
                                    
                                }
                                {
                                    bacOptions.length === 0 &&
                                    <li className="text-sm p-2 font-bold text-left text-red-600">Rien</li>
                                }
                            </ul>
                            
                        </div>
                    </div>
                </div>
                <button 
                onClick={updateFiliere}
                className="text-white inline-flex  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" ></path>
                    </svg>
                    Mise à jour Filiere
                </button>
            </form>
        </div>
    </div>
    {loading && <Loader/>} 
</div> 

    );
}