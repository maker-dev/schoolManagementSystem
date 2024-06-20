import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";
import CardInfo from "../../cards/CardInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faBook, faSchool } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import DeconnectUser from "../../../helpers/DeconnectUser";
import api from "../../../api/apiToken";

export default function AdminDashboard() {
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  // Fetching informations about the cards:
  const fetchInfos = useCallback(async () => {
    try {
      const response = await api.get('getDashboardInfo');
      if (response.status === 200) {
        setInfo(response.data);
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        console.error("Erreur serveur");
      }
    } catch (e) {
      console.error("Erreur serveur");
    }
  }, [navigate]);

  useEffect(() => {
    fetchInfos();
  }, [fetchInfos]);

  return (
    <div className="flex flex-col h-screen">
      <div>
        <NavBar />
      </div>
      <div className="flex">
        <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 h-screen bg-gray-100 md:w-4/5 w-full overflow-y-auto p-4 mt-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            <CardInfo 
              title="Total Etudiants" 
              number={info.totalStudents} 
              color='bg-green-400' 
              icon={<FontAwesomeIcon icon={faUserGraduate} className="text-white text-4xl" />} 
            />
            <CardInfo 
              title="Total Professeures" 
              number={info.totalTeachers} 
              color='bg-orange-400' 
              icon={<FontAwesomeIcon icon={faChalkboardTeacher} className="text-white text-4xl" />} 
            />
            <CardInfo 
              title="Nombre Filières" 
              number={info.totalFields} 
              color='bg-red-400' 
              icon={<FontAwesomeIcon icon={faBook} className="text-white text-4xl" />} 
            />
            <CardInfo 
              title="Total Classes" 
              number={info.totalClasses} 
              color='bg-red-500' 
              icon={<FontAwesomeIcon icon={faSchool} className="text-white text-4xl" />} 
            />
          </div>
          <div className="bg-white p-6 shadow rounded-sm">
            <h2>hi</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
