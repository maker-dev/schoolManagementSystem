import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../helpers/DeconnectUser";
import api from "../../api/apiToken";
import { success, error } from "../../helpers/Alerts";

export default function AddButton({ setInputs, setLoading, addApi, arrayData, setValidateCredentials, title, eventHide }){

    const navigate = useNavigate();
    const addFiliere = async (e) => {

        setLoading(true);
        setValidateCredentials("");
        e.preventDefault();
      
        try{
            const response = await api.post(addApi, JSON.stringify(arrayData));
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
               success("Insertion affectueé!"); 
               setInputs.map((setInput)=>{
                    return setInput([]);
               })
               eventHide();
            }else{
                error("une erreur est survenue");
                
            }
            setLoading(false);
          }catch(e){
            error("Error!"+e);
            setLoading(false);
          }
        
          
      }

    return(
        <button 
                onClick={addFiliere}
                className="text-white inline-flex  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" ></path></svg>
                    Ajouter {title}
        </button>
    )
}