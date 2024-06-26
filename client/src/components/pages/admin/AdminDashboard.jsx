import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";
import CardInfo from "../../cards/CardInfo";
import ShowCard from "../../overflow/ShowCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noNotificationsImage from "../../../assets/icons/void.svg";
import CountUp from "react-countup";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faBook,
  faSchool,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import DeconnectUser from "../../../helpers/DeconnectUser";
import api from "../../../api/apiToken";
import CountNum from "../../ui/CountNum";

export default function AdminDashboard() {
  const totalRequests = 200;
  const notificationsList =
    // null;
    [
      {
        title: "New Enrollment",
        fname: "John",
        lname: "Doe",
        date: "21 Aug 2024",
      },
      {
        title: "Assignment Submitted",
        fname: "Jane",
        lname: "Smith",
        date: "22 Aug 2024",
      },
      {
        title: "New Message",
        fname: "Alice",
        lname: "Johnson",
        date: "23 Aug 2024",
      },
      {
        title: "Grade Updated",
        fname: "Michael",
        lname: "Brown",
        date: "24 Aug 2024",
      },
      {
        title: "Course Completed",
        fname: "Emily",
        lname: "Davis",
        date: "25 Aug 2024",
      },
      {
        title: "New Enrollment",
        fname: "William",
        lname: "Martinez",
        date: "26 Aug 2024",
      },
      {
        title: "Assignment Submitted",
        fname: "Elizabeth",
        lname: "Garcia",
        date: "27 Aug 2024",
      },
      {
        title: "New Message",
        fname: "David",
        lname: "Rodriguez",
        date: "28 Aug 2024",
      },
      {
        title: "Grade Updated",
        fname: "Sophia",
        lname: "Wilson",
        date: "29 Aug 2024",
      },
      {
        title: "Course Completed",
        fname: "James",
        lname: "Anderson",
        date: "30 Aug 2024",
      },
    ];

  const [id, setId] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [cardName, setCardName] = useState("");
  const [info, setInfo] = useState({});
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const navigate = useNavigate();

  const fetchInfos = useCallback(async () => {
    try {
      const response = await api.get("getDashboardInfo");
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

  const handleShowNotif = () => {
    setShowAllNotifications(!showAllNotifications);
  };

  const showInfoPage = (notif, cardName) => {
    setId(notif.id);
    setCardName(cardName);
    setShowInfo(true);
  };

  const hideInfoPage = () => {
    setId("");
    setCardName("");
    setShowInfo(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex">
        <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 h-screen bg-gray-100 md:w-4/5 w-full overflow-y-auto p-4">
          <div className="flex justify-between items-center p-2 gap-2">
            <div>
              <div className="text-2xl font-bold text-gray-800 uppercase">
                Dashboard
              </div>
              <div className="font-semibold text-gray-400">
                Bienvenue sur votre dashboard
              </div>
            </div>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm p-3 font-bold rounded-md flex items-center"
              onClick={handleShowNotif}
            >
              {showAllNotifications
                ? "Hide Notifications"
                : "Show All Notifications"}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            <CardInfo
              title="Total Etudiants"
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
              title="Total Professeures"
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
              title="Nombre Filières"
              number={info.totalFields}
              color="bg-red-400"
              icon={
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-white text-3xl"
                />
              }
            />
            <CardInfo
              title="Total Classes"
              number={info.totalClasses}
              color="bg-red-500"
              icon={
                <FontAwesomeIcon
                  icon={faSchool}
                  className="text-white text-3xl"
                />
              }
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 ">
            <div className="flex-1 bg-white md:p-6 shadow rounded-lg overflow-x-auto overflow-y-auto">
              <div className=" font-bold text-gray-600 md:p-0 pt-4 pl-4 ">
                {showAllNotifications ? "All" : "Latest"} Notifications
              </div>
              {!notificationsList || notificationsList.length === 0 ? (
                <div className="my-5 text-center font-semibold text-xl">
                  <img
                    src={noNotificationsImage}
                    alt="No notifications"
                    className="mx-auto mb-4 w-1/3"
                  />
                  No notifications at the moment. Check back later!
                </div>
              ) : (
                <table className="my-5 min-w-full bg-white ">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/6 text-left py-3 md:px-4 px-2 uppercase font-semibold text-sm">
                        Full Name
                      </th>
                      <th className="w-2/6 text-left py-3 md:px-4 px-2 uppercase font-semibold text-sm">
                        Title
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
                      ? notificationsList
                      : notificationsList.slice(0, 4)
                    ).map((notif, index) => (
                      <tr key={index} className="border-b-2">
                        <td className="w-1/6 text-left py-3 md:px-4 px-2">{`${notif.fname} ${notif.lname}`}</td>
                        <td className="w-2/6 text-left py-3 md:px-4 px-2">
                          {notif.title}
                        </td>
                        <td className="w-1/6 text-left py-3 md:px-4 px-2">
                          {notif.date}
                        </td>
                        <td className="w-1/6 text-left py-3 md:px-4 px-2 ">
                          <button
                            onClick={() => showInfoPage(notif, "Notification")}
                            className="font-bold text-gray-800 hover:underine hover:text-red-400 transition duration-300 ease-in-out"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="md:mr-6 mr-4"
                            />
                          </button>
                          <button className="font-bold text-red-500 hover:underline hover:text-red-400 transition duration-300 ease-in-out">
                            <FontAwesomeIcon icon={faTrash} className="" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="bg-white p-6 shadow rounded-lg flex-shrink-0 lg:max-h-[200px] overflow-auto">
              <div className="font-bold text-gray-600">Total Requests</div>
              <div className="font-semibold text-gray-800 py-4 text-5xl px-2">
                <CountNum number={totalRequests} />
              </div>
              <div className="text-gray-400 p-2">
                Here is your total requests ratio in the year
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInfo && (
        <ShowCard
          display="block"
          eventHide={hideInfoPage}
          id={id}
          cardName={cardName}
        />
      )}
    </div>
  );
}
