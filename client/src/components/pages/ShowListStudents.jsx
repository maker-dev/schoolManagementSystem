import React, { useState, useEffect } from 'react';
import { error } from '../../helpers/Alerts';
import { useNavigate } from 'react-router-dom';
import DeconnectUser from '../../helpers/DeconnectUser';
import AddCard from '../overflow/AddCard';
import ShowCard from "../overflow/ShowCard";
import api from '../../api/apiToken';

export default function ShowListStudents({ className, role, id }) {
  // Functionalities:
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdd, setShowAdd] = useState('hidden');
  const [showDisplay, setShowDisplay] = useState('hidden');

  // DataHandler:
  const [data, setData] = useState([]);
  const [idStudent, setIdStudent] = useState("");

  // Fetch data:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`showClassStudents/${id}`);
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
    fetchData();
  }, [showAdd, id, navigate]);

  // Handling show event:
  const showEventAdd = (value) => {
    setShowAdd('block');
    setIdStudent(value);
  }

  // Handling hide event:
  const hideEventAdd = () => {
    setShowAdd('hidden');
    setIdStudent("");
  }
  // Handling show event:
  const showEventDisplay = (value) => {
    setShowDisplay('block');
    setIdStudent(value);
  }

  // Handling hide event:
  const hideEventDisplay = () => {
    setShowDisplay('hidden');
    setIdStudent("");
  }

  // Filtering data based on search term:
  const filteredData = data.filter(item => {
      return (item.firstName + " " + item.lastName).toLowerCase().includes(searchTerm.toLowerCase());    
  });

  return (
    <div className="container mx-auto p-8 shadow-md bg-white rounded-lg">
      <div className='mb-6'>
        <h3 className='text-gray-600 font-bold text-xl bg-gray-100 p-2'>Absence Etudiants: {className}</h3>
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

                <h3 className="text-lg font-semibold text-gray-800">{item.firstName} {item.lastName}</h3>
                <p className="text-gray-600">{item.email}</p>
            </div>
            
            <div className="flex space-x-2">
                <>
                    <button
                      onClick={() => showEventDisplay(item._id)}
                      className="flex-1 py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                    >
                      Voir
                    </button>
                    {role === "Etudiants" && 
                        <button
                        onClick={() => showEventAdd(item._id)}
                        className="flex-1 py-2 px-4 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors duration-300"
                      >
                        Abscence
                      </button>
                    }
                    
                </>
            </div>
          </div>
        ))}
        
        
           <>
            
            {role === "Etudiants" && 
              <AddCard display={showAdd}
              eventHide={hideEventAdd}
              type={role}
              cardName={"Abscence"}
              id={idStudent}
              />
            }
            <ShowCard display={showDisplay}
            type={role}
            eventHide={hideEventDisplay}
            cardName={"Abscence"}
            id={idStudent}/>
         </>
        
      </div>
    </div>
  );
}
