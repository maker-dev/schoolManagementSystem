import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from "../../../api/apiToken";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ShowAbscence({ id, type }) {
    // State variables for attendance data
    const [monthlyAttendance, setMonthlyAttendance] = useState([]);
    const [totalAttendance, setTotalAttendance] = useState([]);
    

    // Fetching attendance data
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                if (id !== "") {
                    if(type === "Professeurs"){
                        const response = await api.get(`calculateTeacherMonthlyAttendance/${id}`);
                        setMonthlyAttendance(response.data);
                    }else {
                        const response = await api.get(`calculateStudentMonthlyAttendance/${id}`);
                        setMonthlyAttendance(response.data);
                    }
                    
                }
            } catch (error) {
                console.error('Error fetching attendance data', error);
            }
        };

        fetchAttendance();
    }, [id, type]);

    // Fetching attendance data
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                if (id !== "") {
                    if(type === "Professeurs"){
                        const response = await api.get(`calculateTeacherTotalAttendance/${id}`);
                        setTotalAttendance(response.data);
                    }else {
                        const response = await api.get(`calculateStudentTotalAttendance/${id}`);
                        setTotalAttendance(response.data);
                    }
                    
                    
                }
            } catch (error) {
                console.error('Error fetching attendance data', error);
            }
        };

        fetchAttendance();
    }, [id, type]);

    

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
