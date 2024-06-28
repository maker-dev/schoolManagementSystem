import React, { useEffect, useState, useCallback } from "react";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";
import CardInfo from "../../cards/CardInfo";
import ShowCard from "../../overflow/ShowCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noNotificationsImage from "../../../assets/icons/void.svg";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faBook,
  faSchool,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../../helpers/DeconnectUser";
import api from "../../../api/apiToken";
import CountNum from "../../ui/CountNum";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { error, success } from "../../../helpers/Alerts";

export default function AdminDashboard() {
  // State
  const [showInfo, setShowInfo] = useState(false);
  const [cardName, setCardName] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [info, setInfo] = useState({});
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const navigate = useNavigate();

  // Fetch data functions
  const fetchInfos = useCallback(async () => {
    try {
      const response = await api.get("getDashboardInfo");
      if (response.status === 200) {
        setInfo(response.data);
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        console.error("Server Error");
      }
    } catch (error) {
      console.error("Server Error");
    }
  }, [navigate]);

  const fetchComplaints = useCallback(async () => {
    try {
      const response = await api.get("showComplains");// Adjusted endpoint to "showComplaints"
      if (response.status === 200) {
        setComplaints(response.data);
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        console.error("Server Error");
      }
    } catch (error) {
      console.error("Server Error");
    }
  }, [navigate]);

  // Initial data fetch on component mount
  useEffect(() => {
    fetchInfos();
    fetchComplaints();
  }, [fetchInfos, fetchComplaints]);

  // Toggle notifications visibility
  const handleShowNotif = () => {
    setShowAllNotifications(!showAllNotifications);
  };

  // Show complaint details
  const showInfoPage = (complaint, cardName) => {
    setSelectedComplaint(complaint);
    setCardName(cardName);
    setShowInfo(true);
  };

  // Hide complaint details
  const hideInfoPage = () => {
    setSelectedComplaint(null);
    setCardName("");
    setShowInfo(false);
  };

  // Delete a complaint
  const deleteComplaint = async (complaintId) => {
    try {
      const response = await api.delete(`deleteComplain/${complaintId}`); 
      if (response.status === 200) {
        success("La réclamation a été supprimée avec succès."); 
        fetchComplaints(); 
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        error("Erreur lors de la suppression de la réclamation.");
      }
    } catch (error) {
      console.error("Server Error", error);
      error("Erreur serveur lors de la suppression de la réclamation.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1">
        <div className="md:w-1/5 shadow-md hidden md:block overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
          <div className="bg-white p-6 shadow mb-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-gray-800 uppercase">
                  Tableau de Bord
                </div>
                <div className="font-semibold text-gray-400">
                  Bienvenue sur votre tableau de bord
                </div>
              </div>
              <button 
                className="bg-teal-600 hover:bg-teal-700 text-white text-sm p-3 font-bold rounded-md flex items-center"
                onClick={handleShowNotif}
              >
                {showAllNotifications
                  ? "Cacher les Notifications"
                  : "Afficher toutes les Notifications"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            <CardInfo
              title="Total Étudiants"
              number={info.totalStudents}
              color="bg-green-400"
              icon={
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="text-white text-3xl"
                />
              }
            />
            <CardInfo
              title="Total Professeurs"
              number={info.totalTeachers}
              color="bg-orange-400"
              icon={
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="text-white text-3xl"
                />
              }
            />
            <CardInfo
              title="Nombre de Filières"
              number={info.totalFields}
              color="bg-red-400"
              icon={<FontAwesomeIcon icon={faBook} className="text-white text-3xl" />}
            />
            <CardInfo
              title="Total Classes"
              number={info.totalClasses}
              color="bg-red-500"
              icon={<FontAwesomeIcon icon={faSchool} className="text-white text-3xl" />}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1 bg-white p-4 shadow-md rounded-lg overflow-auto">
              <div className="font-bold text-gray-600 pb-2">
                {showAllNotifications ? "Toutes" : "Dernières"} Plaintes
              </div>
              {!complaints || complaints.length === 0 ? (
                <div className="my-5 text-center font-semibold text-xl">
                  <img
                    src={noNotificationsImage}
                    alt="Aucune réclamation"
                    className="mx-auto mb-4 w-1/3"
                  />
                  Aucune plainte pour le moment !
                </div>
              ) : (
                <table className="my-5 min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/6 text-left py-3 md:px-4 px-2 uppercase font-semibold text-sm">
                        Sujet
                      </th>
                      <th className="w-2/6 text-left py-3 md:px-4 px-2 uppercase font-semibold text-sm">
                        Nom d'Utilisateur
                      </th>
                      <th className="w-1/6 text-left py-3 md:px-4 px-2 uppercase font-semibold text-sm">
                        Date
                      </th>
                      <th className="w-1/6 text-left py-3 md:px-4 px-2 uppercase font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {(showAllNotifications
                      ? complaints
                      : complaints.slice(0, 4)
                    ).map((complaint, index) => (
                      <tr key={index} className="border-b-2">
                        <td className="w-1/6 text-left py-3 md:px-4 px-2">{complaint.subject}</td>
                        <td className="w-2/6 text-left py-3 md:px-4 px-2 ">
                          {complaint.complainant.name}
                        </td>
                        <td className="w-1/6 text-left py-3 md:px-4 px-2">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </td>
                        <td className="w-1/6 text-left py-3 md:px-4 px-2">
                          <button
                            onClick={() => showInfoPage(complaint, "Plainte")}
                            className="font-bold text-gray-800 hover:underline hover:text-red-400 transition duration-300 ease-in-out"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="md:mr-6 mr-4"
                            />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réclamation ?")) {
                                deleteComplaint(complaint._id);
                              }
                            }}
                            className="font-bold text-red-500 hover:underline hover:text-red-400 transition duration-300 ease-in-out"
                          >
                            <FontAwesomeIcon icon={faTrash} className="" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="bg-white p-4 md:p-6 shadow flex-shrink-0 max-h-[200px]">
              <div className="font-bold text-gray-600">Total des Plaintes</div>
              <div className="font-semibold text-gray-800 py-4 text-5xl">
                <CountNum number={complaints.length} />
              </div>
              <div className="text-gray-400">
                Voici le nombre total de plaintes pour cette année.
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInfo && selectedComplaint && (
        <ShowCard
          display="block"
          eventHide={hideInfoPage}
          cardName={cardName}
          object={selectedComplaint}
        />
      )}
      <ToastContainer />
    </div>
  );
}
