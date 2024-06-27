import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../ui/NavBar';
import SideBar from '../../ui/SideBar';
import TitleCard from '../../cards/TitleCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api/apiToken'; // Adjust the path according to your project structure
import DeconnectUser from '../../../helpers/DeconnectUser'; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';
import { error, success } from '../../../helpers/Alerts';

export default function ComplainsTeacherPage() {

    //data:
    const [userId, setUserId] = useState('');
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [role, ] = useState('Teacher'); 
    
    //functionalities:
    const navigate = useNavigate();

    //fetch user connected:
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

    //adding the complaints event:
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(`addComplain/${userId}`, {
                role,
                subject,
                details
            });

            if (response.status === 200) {
                success('Plainte soumise avec succès');
                setSubject('');
                setDetails('');
            } else {
                error('Erreur lors de la soumission de la plainte');
                console.error('Server Error', response);
            }
        } catch (error) {
            error('Erreur lors de la soumission de la plainte');
            console.error('Error submitting complaint', error);
        }
    };

    return (
        <div className="flex flex-col h-screen text-center">
            <div>
                <NavBar />
            </div>
            <div className="flex">
                <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                    <SideBar />
                </div>
                <div className="flex flex-col gap-4 h-screen max-h-min bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                    <div className="mx-0 md:mx-6 mt-6">
                        <TitleCard title="Absence" />
                    </div>
                    <div className="mx-0 md:mx-6">
                        {/* Form Section */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-gray-200 p-3">Formulaire de Plainte</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="sujet" className="block text-left text-gray-700 font-medium mb-2">Sujet</label>
                                    <input 
                                        type="text" 
                                        id="sujet" 
                                        name="sujet" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                        placeholder="Entrez le sujet"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="detail" className="block text-left text-gray-700 font-medium mb-2">Détail</label>
                                    <textarea 
                                        id="detail" 
                                        name="detail" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                        placeholder="Entrez les détails"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-200"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                                    Soumettre
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
