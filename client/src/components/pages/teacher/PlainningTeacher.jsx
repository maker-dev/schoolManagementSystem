import { useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import TitleCard from "../../cards/TitleCard";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import api from "../../../api/apiToken";
import Loader from "../../ui/Loader";
import { error, success } from "../../../helpers/Alerts";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { useNavigate, Link } from "react-router-dom";

export default function PlainningTeacher() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();
  const downloadLinkRef = useRef(null);

  //fetching the connected user:
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await api.post('user');
      // Update the user state with the fetched user data
      if (response.status === 200) {
        setUser(response.data);
      } else if (response.status === 400) {
        setUser(null);
      }else if(response.status === 401){
        DeconnectUser();
      }else{
        error("Erreur serveur");
      }
    } catch (e) {
      error("Erreur serveur");
      setUser(null);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //download event:
  const handleDownload = async () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 2000);
    try {
      const response = await api.get(`downloadTeacherSchedule/${user._id}`, { responseType: 'blob' }); // Request file as blob
      console.log(response.status);
      if (response.status === 401) {
        DeconnectUser();
        navigate("/");
        error("Error: Authorization error");
      } else if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' }); // Create a Blob from the response data
        const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
        downloadLinkRef.current.href = url; // Set the URL as the link's href
        downloadLinkRef.current.download = `Emploie_du_temps_${user.firstName + ' ' + user.lastName}.pdf`; // Set the download attribute to specify filename
        downloadLinkRef.current.click(); // Programmatically click the link to trigger the download
        window.URL.revokeObjectURL(url); // Revoke the object URL to free up memory
        success("Téléchargement du fichier effectuée!");
      } else {
        error("Error: Une erreur est survenue!");
      }
    } catch (err) {
      error("Error: Une erreur est survenue!");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div>
        <NavBar />
      </div>
      <div className="flex">
        <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 h-screen max-h-min bg-gray-100 md:w-4/5 w-full overflow-y-auto">
          <div className="mx-0 md:mx-6 mt-6">
            <TitleCard title="Emploie du temps de Professeur" />
          </div>
          <div className="mx-0 md:mx-6 mt-6">
            {user && user.schedule && (
              <div className="bg-white shadow-md rounded p-6 flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="rounded-full bg-gray-300 w-16 h-16 flex items-center justify-center text-xl font-bold text-gray-700">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user.lastName} {user.firstName}</h2>
                    <p className="text-gray-500 text-left">Professeur</p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start">
                  <button
                    onClick={handleDownload}
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    disabled={loading}
                  >
                    {downloading ? (
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    ) : (
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    )}
                    {downloading ? 'Téléchargement...' : 'Télécharger'}
                  </button>
                </div>
              </div>
            )}
            {user && (user.schedule === null || user.schedule === undefined) && (
              <div className="bg-white shadow  p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Vous n'avez pas un emploie du temps</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <Loader />}
      <ToastContainer />
      <div className="hidden">
        <Link ref={downloadLinkRef} target="_blank">Download</Link>
      </div>
    </div>
  );
}
