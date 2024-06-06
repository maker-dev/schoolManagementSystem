import { useState } from "react";


export default function ShowBar({page,setPage}){

    
    const [style, ] = useState(" p-2 font-bold hover:text-blue-700");
    const [styleCondition, ] = useState(" underline decoration-2 decoration-blue-700 text-blue-700 underline-offset-8");
    const [styleFalse, ] = useState(" text-gray-500");
    
    return(
        <>
            <div className="w-full bg-white p-4 shadow-md">
                <button
                onClick={()=>setPage("Informations")}
                name="Informations" 
                id="Informations"
                className={((page==="Informations")?styleCondition:styleFalse) + style}>
                    Information
                </button>

                <button
                onClick={()=>setPage("Etudiants")} 
                name="Etudiants" 
                id="Etudiants"
                className={((page==="Etudiants")?styleCondition:styleFalse) + style}  >
                    Etudiants
                </button>

                <button 
                onClick={()=>setPage("Professeurs")}
                name="Professeurs" 
                id="Professeurs"
                className={((page==="Professeurs")?styleCondition:styleFalse) + style} >
                    Professeurs
                </button>

            </div>
        </>
    );
}