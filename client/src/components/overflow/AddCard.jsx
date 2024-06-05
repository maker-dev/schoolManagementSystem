import { useState } from "react";
import Loader from "../ui/Loader";
import AddFiliere from "./field/AddFIliere";
import AddBac from "./bac/AddBac";
import AddSubject from "./subject/AddSubject";

export default function AddCard({display,eventHide,id,cardName}){

    const [loading,setLoading] = useState(false);
    const [validateCredentials, setValidateCredentials] = useState([]);


return(

<div aria-hidden="true" className={display + ' backdrop-blur overflow-y-auto overflow-x-hidden fixed right-center z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full'}>
    <div className="relative p-4 w-full max-w-md max-h-full  inset-y-10 start-0 md:start-1/3">
        
        <div className="relative bg-white rounded-lg shadow ">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900 ">
                    Ajouter {cardName}
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
                    
                        {cardName === "Filière" && 
                            <AddFiliere  fieldId={id} setValidateCredentials={setValidateCredentials} setLoading={setLoading} eventHide={eventHide}></AddFiliere>
                        }
                        {cardName === "Bac" &&
                            <AddBac setValidateCredentials={setValidateCredentials} setLoading={setLoading} eventHide={eventHide}></AddBac>

                        }
                        {cardName === "Module" &&
                            <AddSubject setValidateCredentials={setValidateCredentials} setLoading={setLoading} eventHide={eventHide}></AddSubject>

                        }

                   
                </div>
            </form>
        </div>
    </div>
    {loading && <Loader/>} 
</div> 

    );
}