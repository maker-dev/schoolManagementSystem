import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api/apiToken";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";
import CardInfo from "../../cards/CardInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faBook, faSchool, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../../helpers/DeconnectUser";

export default function DashboardTeacher() {
  const [info, setInfo] = useState({});
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.post('user');
        if (response.status === 200) {
          setUserId(response.data._id); // Set the user ID
        } else if (response.status === 401) {
          DeconnectUser();
          navigate("/");
        } else {
          console.error("Server Error", response);
        }
      } catch (error) {
        console.error("Fetch User Error", error);
      }
    };

    fetchUser();
  }, [navigate]);

  // useCallback to memoize fetchInfos function
  const fetchInfos = useCallback(async () => {
    try {
      if (!userId) return; // Return early if userId is not set

      const response = await api.get(`getTeacherDashboardInfo/${userId}`);
      if (response.status === 200) {
        setInfo(response.data);
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        console.error("Server Error", response);
      }
    } catch (error) {
      console.error("Fetch Info Error", error);
    }
  }, [userId, navigate]);

  // Fetch data when userId changes
  useEffect(() => {
    fetchInfos();
  }, [fetchInfos]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex">
        <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 h-screen bg-gray-100 md:w-4/5 w-full overflow-y-auto p-4 ">
          <div className="bg-white p-6 shadow mb-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-gray-800 uppercase">
                  Tableau de Bord
                </div>
                <div className="font-semibold text-gray-400">
                  Bienvenue sur votre tableau de bord
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            <CardInfo 
              title="Total étudiants" 
              number={info.totalClassStudents || 0} 
              color='bg-orange-400' 
              icon={<FontAwesomeIcon icon={faChalkboardTeacher} className="text-white text-4xl" />} 
            />
            <CardInfo 
              title="Total Modules" 
              number={info.totalSubjects || 0} 
              color='bg-red-400' 
              icon={<FontAwesomeIcon icon={faBook} className="text-white text-4xl" />} 
            />
            <CardInfo 
              title="Total Classes" 
              number={info.totalClasses || 0} 
              color='bg-blue-400' 
              icon={<FontAwesomeIcon icon={faSchool} className="text-white text-4xl" />} 
            />
            <CardInfo 
              title="Total Présence Heures ce Mois" 
              number={info.totalPresentHoursThisMonth || 0} 
              color='bg-purple-400' 
              icon={<FontAwesomeIcon icon={faHourglassHalf} className="text-white text-4xl" />} 
            />
          </div>
          <div className="bg-white p-6 shadow rounded-sm">
            <h2>Additional Content</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
