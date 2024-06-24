import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../../../ui/SideBar';
import NavBar from '../../../ui/NavBar';
import TitleCard from '../../../cards/TitleCard';
import api from '../../../../api/apiToken';
import DeconnectUser from '../../../../helpers/DeconnectUser';
import { ToastContainer } from "react-toastify";
import { success, error } from '../../../../helpers/Alerts';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentsMarksPage() {

  //functionalities:
  const location = useLocation();
  const navigate = useNavigate();

  // data from TeaacherGradesPage:
  const { state } = location;
  const { classId, className, subjectId, subjectName, numberOfExams } = state || {};

  // data:
  const [studentMarks, setStudentMarks] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState({}); // Loading state for each student

  // Check if classId exists or not
  useEffect(() => {
    if (!classId) {
      navigate('/');
    }
  }, [classId, navigate]);

  // Fetch students for the selected classId
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`showClassStudents/${classId}`);
        if (response.status === 401) {
          DeconnectUser();
          navigate("/");
          error("Erreur d'autorisation");
        } else if (response.status === 200) {
          const studentsData = response.data.map(student => {
            const subjectResults = student.examResults.find(result => result.subject === subjectId);
            const marks = subjectResults ? subjectResults.exams.map(exam => exam.marksObtained) : Array(numberOfExams).fill(0);
            return {
              _id: student._id,
              firstName: student.firstName,
              lastName: student.lastName,
              marks
            };
          });
          setStudents(studentsData);
          // Initialize student marks based on fetched students
          initializeStudentMarks(studentsData); 
        } else {
          error("Une erreur est survenue lors de la récupération des étudiants!");
        }
      } catch (err) {
        error("Une erreur est survenue lors de la récupération des étudiants!");
      }
    };

    if (classId) {
      fetchStudents();
    }
  }, [classId, navigate, numberOfExams, subjectId]);

  // Initialize student marks based on fetched students
  const initializeStudentMarks = (studentsData) => {
    const initialMarks = {};
    studentsData.forEach(student => {
      initialMarks[student._id] = {
        name: `${student.firstName} ${student.lastName}`,
        marks: student.marks
      };
    });
    setStudentMarks(initialMarks);
  };

  // Function to handle marks submission
  const submitMarks = async (studentId) => {
    setLoading(prevLoading => ({ ...prevLoading, [studentId]: true }));
    try {
      const marksData = studentMarks[studentId].marks.map((marksObtained, index) => ({
        // Current date in YYYY-MM-DD format
        date: new Date().toISOString().split('T')[0], 
        marksObtained
      }));
      const payload = {
        subject: subjectId,
        arrOfExams: marksData
      };
      const response = await api.post(`addExamMarks/${studentId}`, payload);
      if (response.status === 200) {
        success('Les notes enregistrées avec succès');
      } else if (response.status === 400) {
        error('La note doit être entre 0 et 20');
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        error('Échec de la soumission des notes');
      }
    } catch (err) {
      error('Erreur lors de la soumission des notes');
      console.error('Erreur lors de la soumission des notes:', err);
    } finally {
      setTimeout(() => {
        setLoading(prevLoading => ({ ...prevLoading, [studentId]: false }));
      }, 2000); 
    }
  };

  // Function to update marks for a student and exam number
  const handleMarksChange = (studentId, examIndex, value) => {
    
    // Ensure the input value is within the range of 0 to 20
    const parsedValue = value === '' ? '' : Math.min(20, Math.max(0, parseInt(value, 10)));
    setStudentMarks(prevMarks => ({
      ...prevMarks,
      [studentId]: {
        ...prevMarks[studentId],
        marks: prevMarks[studentId].marks.map((mark, index) =>
          index === examIndex ? (isNaN(parsedValue) ? 0 : parsedValue) : mark
        )
      }
    }));
  };

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
              <div className="mb-6">
                <h3 className="text-gray-600 font-bold text-xl bg-gray-100 p-2">
                  <span className="mr-2">Module:</span>{subjectName} <span className="mx-4">|</span> 
                  <span className="ml-2">Classe:</span> {className}
                </h3>
              </div>
              <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/4 px-4 py-2">Prénom</th>
                      <th className="w-1/4 px-4 py-2">Nom</th>
                      {[...Array(numberOfExams)].map((_, index) => (
                        <th key={`exam-${index}`} className="px-4 py-2">Note {index + 1}</th>
                      ))}
                      <th className="w-1/4 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {students.map(student => (
                      <tr key={student._id}>
                        <td className="border px-4 py-2">{student.firstName}</td>
                        <td className="border px-4 py-2">{student.lastName}</td>
                        {studentMarks[student._id].marks.map((mark, index) => (
                          <td key={`marks-${student._id}-${index}`} className="border px-4 py-2">
                            <input
                              type="number"
                              value={mark === '' ? '' : parseInt(mark, 10)}
                              onChange={(e) => handleMarksChange(student._id, index, e.target.value)}
                              className="w-20 p-2 border border-gray-300 rounded-md text-center"
                              placeholder={`Note ${index + 1}`}
                              min="0"
                              max="20"
                            />
                          </td>
                        ))}
                        <td className="border px-4 py-2 text-center">
                          <button
                            onClick={() => submitMarks(student._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
                            disabled={loading[student._id]}
                          >
                            {loading[student._id] ? (
                              <FontAwesomeIcon icon={faSpinner} spin />
                            ) : (
                              'Soumettre'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
