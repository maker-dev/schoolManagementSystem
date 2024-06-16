import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../../helpers/DeconnectUser";

export default function WaitingConfirmationPage() {

	const navigate = useNavigate();

    //handle click:
    const handleClickButton = () =>{
            DeconnectUser();
            navigate('/');
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-10">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 sm:p-10">
                <div className="text-center">
                    <FontAwesomeIcon
                        icon={faHourglassHalf}
                        className="mx-auto h-16 w-16 text-blue-600"
                    />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">
                        Confirmation en attente
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Votre compte est en attente de confirmation par l'administrateur. Nous vous informerons une fois que votre compte aura été confirmé.
                    </p>
                </div>
                <div className="mt-6 text-center">
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleClickButton}
                    >
                        Page d'acceuil
                    </button>
                </div>
            </div>
        </div>
    );
}
