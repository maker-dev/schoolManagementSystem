import React, { useState, useEffect } from 'react';
import { error } from "../../../../helpers/Alerts";
import { useNavigate } from 'react-router-dom';
import DeconnectUser from '../../../../helpers/DeconnectUser';
import api from '../../../../api/apiToken';
import ShowCard from '../../../overflow/ShowCard';

export default function ShowStudents({ type, apiIndex }) {

    // Functionalities:
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState('hidden');



    // DataHandler:
    const [data, setData] = useState([]);
    const [id, setId] = useState("");

    // Fetch data:
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiIndex);
                if (response.status === 401) {
                    DeconnectUser();
                    navigate("/");
                    error("error authorization");
                } else if (response.status === 200) {
                    setData(response.data);
                    console.log(response.data)
                } else {
                    error("Error: Une erreur est survenue!");
                }
            } catch (err) {
                console.error("Error: Une erreur est survenue!");
            }
        }
        fetchData();
    }, [show, navigate, apiIndex]);

    // Handling show event:
    const showEvent = (value, item) => {
        setShow('block');
        setId(value);

    }

    // Filtering data based on search term and filter:
    const filteredData = data.filter(item => {
        return (item.firstName + " " + item.lastName).toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Handling hide event:
    const hideEvent = () => {
        setShow('hidden');
        setId("");
    }

    return (
        <div className="container mx-auto p-6 shadow-lg bg-white rounded-lg">
            <div className='mb-6'>
                <h3 className='text-gray-600 font-bold text-xl bg-gray-100 p-2'>Gestion {type}</h3>
            </div>
            <div className="mb-4 flex flex-col md:flex-row justify-between">
                <input
                    type="text"
                    className="w-full md:w-1/2 p-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
                    placeholder="Recherche item..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-auto">
                {filteredData.map(item => (
                    <div
                        key={item._id}
                        className="p-4 border border-gray-300 bg-white rounded-lg flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-full md:w-3/4 mb-2 md:mb-0 md:pr-4">
                            <h3 className="font-semibold text-gray-800">{item.firstName} {item.lastName}</h3>
                            <p className="text-gray-500 text-sm">{item.email}</p>
                            <p className="text-gray-500 text-sm"></p>
                        </div>
                        <div className="flex w-full md:w-1/4 justify-end">
                            <button
                                onClick={() => showEvent(item._id, item)}
                                className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300`}
                            >
                                Voir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ShowCard
                eventHide={hideEvent}
                display={show}
                cardName={"Etudiant"}
                apiArray={apiIndex}
                id={id}
            />
        </div>
    );
};
