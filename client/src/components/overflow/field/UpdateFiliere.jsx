import { useState , useEffect } from "react";
import api from "../../../api/apiToken";
import Loader from "../../ui/Loader";
import  {useNavigate} from "react-router-dom";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { success, error } from "../../../helpers/Alerts";
import ShowList from "../../ui/ShowList";


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
            
            if(fieldId !== ""){
                
                const response = await api.get(`showField/${fieldId}`);
                setBacOptions(response.data.bacRequired === undefined?[]:response.data.bacRequired);
                setNewFieldName(response.data.fieldName); 
            }
             else return;
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
      },[display]);
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
                        <ShowList array={bacOptions} deleteEvent={handleDeletedBac}></ShowList>
                    </div>
                </div>
                <button 
                onClick={updateFiliere}
                className="text-white inline-flex  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    <svg xmlns="http://www.w3.org/2000/svg"className="me-1 -ms-1 w-5 h-5" fill="currentColor"  enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="reload"><path d="M20.9292,10.8662c-0.0688-0.5479-0.5698-0.9346-1.1172-0.8672c-0.5479,0.0688-0.936,0.5688-0.8672,1.1172
                        C18.981,11.4053,19,11.7007,19,12c0,3.8599-3.1401,7-7,7s-7-3.1401-7-7s3.1401-7,7-7c1.8568,0,3.6179,0.7455,4.9119,2.0166
                        c0.062,0.0613,0.1177,0.1297,0.1776,0.1935c0.0279,0.0295,0.0533,0.0613,0.0806,0.0914L15.3794,7.624
                        c-0.5435,0.0981-0.9048,0.6182-0.8071,1.1616c0.0874,0.4839,0.5088,0.8228,0.9834,0.8228c0.0586,0,0.1182-0.0049,0.1782-0.0156
                        l4.1753-0.7524c0.5435-0.0981,0.9048-0.6182,0.8071-1.1616l-0.7524-4.1758c-0.0986-0.5439-0.6167-0.9058-1.1616-0.8071
                        c-0.5435,0.0981-0.9048,0.6182-0.8071,1.1616l0.3109,1.7251C16.6447,3.9421,14.4072,3,12,3c-4.9624,0-9,4.0376-9,9s4.0376,9,9,9
                        s9-4.0376,9-9C21,11.6216,20.9761,11.2402,20.9292,10.8662z" className="color944cf2 svgShape">       
                        </path>
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