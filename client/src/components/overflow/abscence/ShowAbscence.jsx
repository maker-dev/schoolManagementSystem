import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from "../../../api/apiToken";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { useNavigate } from "react-router-dom";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ShowAbscence({ id, type }) {

    // State variables for attendance data
    const [monthlyAttendance, setMonthlyAttendance] = useState([]);
    const [totalAttendance, setTotalAttendance] = useState([]);
    const navigate = useNavigate();

    // Fetching monthly attendance data
    useEffect(() => {
        const fetchMonthlyAttendance = async () => {
            try {
                if (id !== "") {
                    const endpoint = type === "Professeurs" ?
                        `calculateTeacherMonthlyAttendance/${id}` :
                        `calculateStudentMonthlyAttendance/${id}`;

                    const response = await api.get(endpoint);
                    if (response.status === 401) {
                        DeconnectUser();
                        navigate("/");
                    }else if ( response.status === 200){
                        setMonthlyAttendance(response.data);
                    }else{
                        console.log("error!");
                    }

                }
            } catch (error) {
                console.error('Error fetching monthly attendance data', error);
            } 
        };

        fetchMonthlyAttendance();

        // Clear monthlyAttendance on component unmount or ID/type change
        return () => {
            setMonthlyAttendance([]);
        };
    }, [id, type, navigate]);

    // Fetching total attendance data
    useEffect(() => {
        const fetchTotalAttendance = async () => {
            try {
                if (id !== "") {
                    const endpoint = type === "Professeurs" ?
                        `calculateTeacherTotalAttendance/${id}` :
                        `calculateStudentTotalAttendance/${id}`;

                    const response = await api.get(endpoint);
                    if (response.status === 401) {
                        DeconnectUser();
                        navigate("/");
                    }else if ( response.status === 200){
                        setTotalAttendance(response.data);
                    }else{
                        console.log("error!");
                    }

                }
            } catch (error) {
                console.error('Error fetching total attendance data', error);
            }
        };

        fetchTotalAttendance();

        // Clear totalAttendance on component unmount or ID/type change
        return () => {
            setTotalAttendance([]);
        };
    }, [id, type, navigate]);

    // Preparing data for the chart
    const data = {
        labels: monthlyAttendance.map(record => record.monthYear),
        datasets: [
            {
                label: 'Présences',
                data: monthlyAttendance.map(record => record.totalPresent),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Abscences',
                data: monthlyAttendance.map(record => record.totalAbsent),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="col-span-2">
            <label htmlFor="attendance" className="block mb-2 text-sm font-medium text-gray-900 text-left">Abscence (Heures/Mois)</label>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <Bar data={data} options={options} />
            </div>
            <div className="mt-4">
                <p className="font-medium">Total Présence: {totalAttendance.totalPresent}</p>
                <p className="font-medium">Total Absence: {totalAttendance.totalAbsent}</p>
            </div>
        </div>
    );
}
