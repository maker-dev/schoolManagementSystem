import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from '../../../api/apiToken';
import DeconnectUser from '../../../helpers/DeconnectUser';
import { error } from '../../../helpers/Alerts';
import SideBar from '../../ui/SideBar';
import NavBar from '../../ui/NavBar';
import TitleCard from '../../cards/TitleCard';
import Loader from '../../ui/Loader';

export default function TeacherGradesPage() {

  //functionalities:
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  //data:
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch connected user:
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post('user');
      if (response.status === 200) {
        setUser(response.data);
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        error("Erreur serveur");
      }
    } catch (e) {
      error("Erreur serveur");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Fetch data:
  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        setLoading(true);
        try {
          const response = await api.get(`getTeacherSubjectInClasses/${user._id}`);
          if (response.status === 401) {
            DeconnectUser();
            navigate("/");
            error("Erreur d'autorisation");
          } else if (response.status === 200) {
            setData(response.data);
          } else {
            error("Erreur: Une erreur est survenue!");
          }
        } catch (err) {
          error("Erreur: Une erreur est survenue!");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [navigate, user]);

  // Handling navigate event:
  const navigatePageEvent = (classId, className, subjectId, subjectName, numberOfExams) => {
    navigate("/Teacher/notes/etudiants", {
      state: { classId, className, subjectId, subjectName, numberOfExams }
    });
  };

  // Filtering data based on search term:
  const filteredData = data.flatMap(item =>
    item.teachers.flatMap(teacher =>
      teacher.subjects.map(subject => ({
        classId: item._id,
        className: item.className,
        subjectId: subject._id,
        subjectName: subject.subName,
        numberOfExams: subject.numberOfExams 
      }))
    )
  ).filter(item =>
    item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex">
        <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 h-screen max-h-min bg-gray-100 md:w-4/5 w-full overflow-y-auto">
          <div className="mx-0 md:mx-6 mt-6">
            <TitleCard title="Gestion des Notes des Étudiants" />
          </div>
          <div className="mx-0 md:mx-6 mt-6">
            <div className="container mx-auto p-8 shadow-md bg-white rounded-lg">
              <div className='mb-6'>
                <h3 className='text-gray-600 font-bold text-xl bg-gray-100 p-2'>Gestion Notes</h3>
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
                    key={`${item.classId}-${item.subjectId}`}
                    className="p-5 border border-gray-200 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.subjectName}</h3>
                      <p className="text-gray-600">{item.className}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigatePageEvent(item.classId, item.className, item.subjectId, item.subjectName, item.numberOfExams)}
                        className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        Voir Etudiants
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
      {loading && <Loader />}
    </div>
  );
}
