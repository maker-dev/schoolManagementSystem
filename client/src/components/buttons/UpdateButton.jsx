import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../helpers/DeconnectUser";
import api from "../../api/apiToken";
import { success, error } from "../../helpers/Alerts";

export default function UpdateButton({ setLoading, updateApi, arrayData, setValidateCredentials, title, eventHide }) {
    const navigate = useNavigate();

    const updateFiliere = async (e) => {
        setLoading(true);
        setValidateCredentials("");
        e.preventDefault();
        try {
            // console.log(arrayCredentiels);
            const response = await api.put(updateApi, JSON.stringify(arrayData));

            if (response.status === 401) {
                DeconnectUser();
                navigate("/");
                console.log("error authorization");
            }
            if (response.status === 400) {
                let arrErrors = [];
                for (let i = 0; i < response.data.errors.length; i++) {
                    arrErrors.push({ key: i, msg: response.data.errors[i].msg });
                }
                setValidateCredentials(arrErrors);
            } else if (response.status === 200) {
                success("mise à jour effectueé!");
                eventHide();
            }else{
                error("une erreur est survenue");
            }
            setLoading(false);
        } catch (e) {
            error("Error!");
            setLoading(false);
        }
    }

    return (
        <button
            onClick={updateFiliere}
            className="text-white inline-flex  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            <svg xmlns="http://www.w3.org/2000/svg" className="me-1 -ms-1 w-5 h-5" fill="currentColor" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="reload"><path d="M20.9292,10.8662c-0.0688-0.5479-0.5698-0.9346-1.1172-0.8672c-0.5479,0.0688-0.936,0.5688-0.8672,1.1172 C18.981,11.4053,19,11.7007,19,12c0,3.8599-3.1401,7-7,7s-7-3.1401-7-7s3.1401-7,7-7c1.8568,0,3.6179,0.7455,4.9119,2.0166 c0.062,0.0613,0.1177,0.1297,0.1776,0.1935c0.0279,0.0295,0.0533,0.0613,0.0806,0.0914L15.3794,7.624 c-0.5435,0.0981-0.9048,0.6182-0.8071,1.1616c0.0874,0.4839,0.5088,0.8228,0.9834,0.8228c0.0586,0,0.1182-0.0049,0.1782-0.0156 l4.1753-0.7524c0.5435-0.0981,0.9048-0.6182,0.8071-1.1616l-0.7524-4.1758c-0.0986-0.5439-0.6167-0.9058-1.1616-0.8071 c-0.5435,0.0981-0.9048,0.6182-0.8071,1.1616l0.3109,1.7251C16.6447,3.9402,14.395,3,12,3c-4.9715,0-9,4.0285-9,9 s4.0285,9,9,9c4.836,0,8.7952-3.854,8.9882-8.6791C20.9883,11.3204,21.0022,11.0957,20.9292,10.8662z"></path></svg>
            <span>Mise à jour {title}</span>
        </button>
    );
}
