import DataHandler from "../../ui/DataHandler";

export default function StudentCard(){

    return(
        <div className="flex flex-col items-center justify-center shadow-md bg-white p-4">
            <div className="container px-4 py-12 mx-auto">
            <h1 className="font-bold text-gray-600 text-xl w-full mb-8 text-center">Gestion des etudiants du Classe</h1>
            <DataHandler array={[{_id:"fkjeiojfe", nom:"Hamid"}]} event={()=>{return}}/>

            </div>
        </div>
    );
    
}