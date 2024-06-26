import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from "../../../api/apiToken";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { useNavigate } from "react-router-dom";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ShowAbscenceBySubject({ id }) {
    // State variables for attendance data
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const navigate = useNavigate();

    // Define a function to generate colors cyclically
    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = (i * (360 / numColors)) % 360;
            colors.push(`hsl(${hue}, 80%, 70%)`);
        }
        return colors;
    };

    // Fetching attendance data by subject
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                if (id !== "") {
                    const response = await api.get(`calculateStudentSubjectAttendance/${id}`);
                    if (response.status === 401) {
                        DeconnectUser();
                        navigate("/");
                    } else if (response.status === 200) {
                        setSubjectAttendance(response.data);
                    } else {
                        console.log("Error fetching data");
                    }
                }
            } catch (error) {
                console.error('Error fetching attendance data', error);
            }
        };

        fetchAttendance();

        // Clear subjectAttendance on component unmount or ID change
        return () => {
            setSubjectAttendance([]);
        };
    }, [id, navigate]);

    // Generate colors based on the number of subjects
    const colors = generateColors(subjectAttendance.length);

    // Preparing data for the chart
    const data = {
        labels: subjectAttendance.map(record => record.subject),
        datasets: [
            {       
                label: 'Présence (%)',
                data: subjectAttendance.map(record => record.presentPercent),
                backgroundColor: colors,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + "%";
                    },
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + context.raw + '%';
                    },
                },
            },
            legend: {
                display: true,
                labels: {
                    generateLabels: function(chart) {
                        return chart.data.labels.map((label, index) => ({
                            text: label,
                            fillStyle: chart.data.datasets[0].backgroundColor[index],
                        }));
                    }
                }
            }
        },
    };

    return (
        <div className="col-span-2">
            <label htmlFor="attendance" className="block mb-2 text-sm font-medium text-gray-900 text-left">Abscence par Modules</label>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
