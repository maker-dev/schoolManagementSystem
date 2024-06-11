import React, { useState, useEffect } from 'react';
import { error } from "../../../../helpers/Alerts";
import { useNavigate } from 'react-router-dom';
import DeconnectUser from '../../../../helpers/DeconnectUser';
import api from '../../../../api/apiToken';
import FileCard from '../../../overflow/file_crud/FileCard';

export default function ShowPlainning({type, apiIndex}) {

    // Functionalities:
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('tous');
    const [show, setShow] = useState('hidden');
    const [isFileExists, setIsFileExists] = useState(false);

    //here we have api of (delete upload and download file) that we will pass [0:upload,1:download,2:delete]
    const [apiArray,setApiArray] = useState([]);
    
    // DataHandler:
    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");

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
                } else {
                    error("Error: Une erreur est survenue!");
                }
            } catch (err) {
                error("Error: Une erreur est survenue!");
            }
        }
        fetchData();
    }, [show, navigate, apiIndex]);

    // Handling show event:
    const showEvent = (value, item) =>{
        setShow('block');
        setIsFileExists((item.schedule === undefined || item.schedule === null)?false:true);
        console.log(isFileExists);
        setId(value);
        if (type === "Professeurs") {
            setName(`${item.firstName} ${item.lastName}`);
            setApiArray(["uploadTeacherSchedule","downloadTeacherSchedule","deleteTeacherSchedule"]);
        } else if (type === "Classes") {
            setName(item.className);
            setApiArray(["uploadClassSchedule","downloadClassSchedule","deleteClassSchedule"]);
        }
    }

    // Handling hide event:
    const hideEvent = () =>{
        setShow('hidden');
        setId("");
        setName("");
        setIsFileExists(false);
    }

    // Filtering data based on search term and filter:
    const filteredData = data.filter(item => {
        if (type === "Professeurs") {
            return (item.firstName + " " + item.lastName).toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filter === 'tous' || (filter === 'vide' && !item.schedule) || (filter === 'Plein' && item.schedule))
        } else if (type === "Classes") {
            return item.className.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filter === 'tous' || (filter === 'vide' && !item.schedule) || (filter === 'Plein' && item.schedule))
        } else {
            return null;
        }
    });

    return (
        <div className="container mx-auto p-8 shadow-md bg-white rounded-lg">
            <div className='mb-6'>
                <h3 className='text-gray-600 font-bold text-xl bg-gray-100 p-2'>Emploi du temps {type}</h3>
            </div>
            <div className="mb-4 flex flex-col md:flex-row justify-between">
                <input
                    type="text"
                    className="w-full md:w-1/2 p-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
                    placeholder="Recherche item..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="flex flex-col md:flex-row items-center space-x-0 space-y-3 md:space-y-0 md:space-x-4">
                    <button
                        className={`px-4 py-1 ${filter === 'tous' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded hover:bg-blue-600 transition-colors duration-300`}
                        onClick={() => setFilter('tous')}
                    >
                        Tous
                    </button>
                    <button
                        className={`px-4 py-1 ${filter === 'vide' ? 'bg-red-500' : 'bg-gray-300'} text-white rounded hover:bg-red-600 transition-colors duration-300`}
                        onClick={() => setFilter('vide')}
                    >
                        Vide
                    </button>
                    <button
                        className={`px-4 py-1 ${filter === 'Plein' ? 'bg-green-500' : 'bg-gray-300'} text-white rounded hover:bg-green-600 transition-colors duration-300`}
                        onClick={() => setFilter('Plein')}
                    >
                        Plein
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-auto">
                {filteredData.map(item => (
                    <div
                        key={item._id}
                        className={`p-4 border ${!item.schedule ? 'border-red-300 bg-red-100' : 'border-green-300 bg-green-100'} rounded-lg flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300`}
                    >
                        {type === "Professeurs" && 
                            <div className="w-full md:w-3/4 mb-2 md:mb-0 md:pr-4">
                                <h3 className="font-semibold text-gray-800">{item.firstName} {item.lastName}</h3>
                                <p className="text-gray-500 text-sm">{item.email}</p>
                                {!item.schedule 
                                    ? <span className="text-red-500 text-xs">Vide</span> 
                                    : <span className="text-green-500 text-xs">Plein</span>
                                }
                            </div>
                        }
                        {type === "Classes" && 
                            <div className="w-full md:w-3/4 mb-2 md:mb-0 md:pr-4">
                                <h3 className="font-semibold text-gray-800">{item.className}</h3>
                                <p className="text-gray-500 text-sm">{item.field.fieldName}</p>
                                {!item.schedule 
                                    ? <span className="text-red-500 text-xs">Vide</span> 
                                    : <span className="text-green-500 text-xs">Plein</span>
                                }
                            </div>
                        }
                        <div className="flex w-full md:w-1/4 justify-end">
                            <button
                            onClick={() => showEvent(item._id, item)}
                            className={`px-4 py-1 ${!item.schedule ? 'bg-red-500' : 'bg-green-500'} text-white rounded hover:${!item.schedule ? 'bg-red-600' : 'bg-green-600'} transition-colors duration-300`}>
                            {!item.schedule ? 'Vide' : 'Fichier'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <FileCard eventHide={hideEvent}
            display={show}
            isFileExists={isFileExists} 
            cardName={type} 
            name={name} 
            apiArray={apiArray}
            id={id}/>
        </div>
    );
};
