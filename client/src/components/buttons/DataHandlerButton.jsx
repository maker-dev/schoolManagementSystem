import api from "../../api/apiToken";
import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../helpers/DeconnectUser";
import { error, success } from "../../helpers/Alerts";

export default function DataHandlerButton({title, svgType, color, data, apiUsed, setLoading, id, setData}){

    const navigate = useNavigate();

    //eventApi
    const apiEvent = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (data.length === 0) {
            error(`Auccun element n'a été selectionneé!`);
            setLoading(false);
            return;
        }

        try {

                const promises = data.map(item =>{
                    if(apiUsed.toLowerCase().includes("student")){
                        return api.post(apiUsed, JSON.stringify({classId:id, studentId:item}));
                    } 
                    if(apiUsed.toLowerCase().includes("teacher")){
                        return api.post(apiUsed, JSON.stringify({classId:id, teacherId:item}));
                    }  
                    else return null;
                    
                }
                    
                ).filter(promise => promise !== null); ;
            


            const responses = await Promise.all(promises);

            let successCount = 0;
            let authError = false;
            let selectionError = false;

            responses.forEach(response => {
                if (response.status === 401) {
                    authError = true;
                } else if (response.status === 400) {
                    selectionError = true;
                } else if (response.status === 200) {
                    successCount++;
                }
            });

            if (authError) {
                DeconnectUser();
                navigate("/");
                error("error authorization");
                return;
            }

            if (selectionError) {
                error(`Aucun element n'a été selectionneé!`);
            } else if (successCount > 0) {
                success(`${successCount} effectueé(s)!`);
                setData([]);
            } else {
                error("Error: something went wrong!");
            }
        } catch (e) {
            console.log("error", e);
            error("Error!");
        }

        setLoading(false);
    };

    return(
    <button
      onClick={apiEvent}
      className={'flex w-full items-center p-3 text-sm font-medium text-'+color+'-600 border-t border-gray-200 rounded-b-lg bg-gray-50  hover:bg-gray-100  hover:underline'}>
        {svgType === "Remove" &&
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z"/>
            </svg>
        }
        {svgType === "Add" &&
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-2h-3v-3a1 1 0 1 0-2 0v3h-3a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2Z"/>
            </svg>
        }
        {title}
    </button>
    )
}