import React, { useState, useEffect } from 'react';
import { error } from '../../../helpers/Alerts';
import { useNavigate } from 'react-router-dom';
import DeconnectUser from '../../../helpers/DeconnectUser';
import api from '../../../api/apiToken';
import SideBar from '../../ui/SideBar';
import NavBar from '../../ui/NavBar';
import TitleCard from '../../cards/TitleCard';
import { ToastContainer } from 'react-toastify';
import Loader from '../../ui/Loader';

export default function StudentsAbscence() {
  // Functionalities:
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // DataHandler:
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch connected user:
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await api.post('user');
      if (response.status === 200) {
        setUser(response.data);
      } else if (response.status === 400) {
        setUser(null);
      } else if (response.status === 401) {
        DeconnectUser();
      } else {
        error("Erreur serveur");
      }
    } catch (e) {
      error("Erreur serveur");
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch data:
  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          const response = await api.get(`showTeacherClasses/${user._id}`);
          if (response.status === 401) {
            DeconnectUser();
            navigate("/");
            error("error authorization");
          } else if (response.status === 200) {
            setData(response.data);
          } else {
            error("Error: Une erreur est survenue!");
          }
        } catch (err) {
          error("Error: Une erreur est survenue!");
        }
      }
    };
    fetchData();
  }, [navigate, user]);

  // Handling navigate event:
  const navigatePageEvent = (id, className) => {
    navigate("/Teacher/abscenceClass", { state: { id, className } });
  };

  // Filtering data based on search term:
  const filteredData = data.filter(item => {
    return (item.className).toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <NavBar />
      </div>
      <div className="flex">
        <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 h-screen max-h-min bg-gray-100 md:w-4/5 w-full overflow-y-auto">
          <div className="mx-0 md:mx-6 mt-6">
            <TitleCard title="Abscence"></TitleCard>
          </div>
          <div className="mx-0 md:mx-6 mt-6">
          <div className="container mx-auto p-8 shadow-md bg-white rounded-lg">
            <div className='mb-6'>
              <h3 className='text-gray-600 font-bold text-xl bg-gray-100 p-2'>Absence Etudiants</h3>
            </div>
            <div className="mb-4 flex justify-between">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Recherche item..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-auto">
              {filteredData.map(item => (
                <div
                  key={item._id}
                  className="p-5 border border-gray-200 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.className}</h3>
                    <p className="text-gray-600">{item.field.fieldName}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigatePageEvent(item._id, item.className)}
                      className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Voire Etudiants
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
      <ToastContainer />
      {loading && <Loader/>}
    </div>
  );
}
