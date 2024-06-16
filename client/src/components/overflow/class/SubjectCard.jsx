import React, { useEffect, useMemo, useState } from 'react';
import api from '../../../api/apiToken';
import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { success, error } from "../../../helpers/Alerts";
import Loader from '../../ui/Loader';

export default function SubjectCard({ id }) {
  // Data:
  const [subjectInClass, setSubjectInClass] = useState([]);
  const [subjectWithTeachers, setSubjectWithTeachers] = useState([]);
  const [filterSubjectsWithTeachers, setFilterSubjectsWithTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);

  //functionalities:
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetching subjects in class:
  useEffect(() => {
    const fetchSubjectsInClass = async () => {
      try {
        if (id !== "") {
          const response = await api.get(`showAllSubjectsInClass/${id}`);
          setSubjectInClass(response.data);
        }
      } catch (error) {
        console.error('Error fetching subjects in class:', error);
      }
    };

    fetchSubjectsInClass();
  }, [id,loading]);

  // Fetching subjects with teachers:
  useEffect(() => {
    const fetchSubjectsWithTeachers = async () => {
      try {
        if (id !== "") {
          const response = await api.get(`showSubjectTeacherInClass/${id}`);
          setSubjectWithTeachers(response.data);
        }
      } catch (error) {
        console.error('Error fetching subjects with teachers:', error);
      }
    };

    fetchSubjectsWithTeachers();
  }, [id,loading]);

  // Fetching teachers:
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        if (id !== "") {
          const response = await api.get(`showClassTeachers/${id}`);
          setTeachers(response.data);
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, [id]);

  // Merge subjectsInClass and subjectWithTeachers based on _id
  useMemo(() => {
    const mergedSubjects = subjectInClass.map(subject => {
      const subjectTeacher = subjectWithTeachers.find(st => st.subjects.some(s => s._id === subject._id)) || {};
      const teacher = subjectTeacher.teacher ? subjectTeacher.teacher : null;
      return {
        ...subject,
        teacher
      };
    });

    setFilterSubjectsWithTeachers(mergedSubjects);
    
  }, [subjectInClass, subjectWithTeachers]);

  //hadndling dettache subject with teacher:
  const attacheTeacherSubject = async (e,subjectId) => {

    setLoading(true);
    e.preventDefault();
    
  
    try{
        const teacherId = e.target.value;
        if(teacherId === ""){
          setLoading(false);
          return;
        } 
        const response = await api.post("attachSubjectToTeacherInClass", JSON.stringify({classId:id,teacherId,subjectId}));
        if(response.status === 401){
            
            DeconnectUser();
            navigate("/");
            console.log("error autorization");

        }else if(response.status === 400){
          error("Ce Professeur ne possède pas ce module!");

        }
         else if (response.status === 200) {
           success("Attachement affectueé!"); 
        }else{
            error("une erreur est survenue");
            
        }
        setLoading(false);
      }catch(e){
        console.error("Error!");
        setLoading(false);
      }
  }

  //hadndling dettache subject with teacher:
  const dettacheTeacherSubject = async (e,subjectId,teacherId) => {

    setLoading(true);
    e.preventDefault();
    
  
    try{
        
        
        const response = await api.post("detachSubjectFromTeacherInClass", JSON.stringify({classId:id,teacherId,subjectId}));
        if(response.status === 401){
            
            DeconnectUser();
            navigate("/");
            console.log("error autorization");

        }else if(response.status === 400){
          error("Erreur");

        }
         else if (response.status === 200) {
           success("Dettachement affectueé!"); 
        }else{
            error("une erreur est survenue");
            
        }
        setLoading(false);
      }catch(e){
        console.error("Error!");
        setLoading(false);
      }
  }
  return (
    <div className="overflow-x-auto p-6 bg-white shadow">
      <h1 className="font-black text-gray-600 text-xl w-full mb-8 text-center bg-gray-100 p-2">Modules en classe</h1>
      <table className="min-w-full bg-teal-50 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="w-1/3 py-3 px-4 text-left">Nom Module</th>
            <th className="w-1/3 py-3 px-4 text-left">Facteur</th>
            <th className="w-1/3 py-3 px-4 text-left">Nom d'Enseignant</th>
          </tr>
        </thead>
        <tbody>
          {filterSubjectsWithTeachers.map((item) => (
            <tr key={item._id} className="hover:bg-teal-100">
              <td className="py-3 px-4 border-b border-teal-200 text-left">{item.subName}</td>
              <td className="py-3 px-4 border-b border-teal-200 text-left">{item.labs}</td>
              <td className="py-3 px-4 border-b border-teal-200 text-left flex space-x-2 items-center">
                {item.teacher ? (
                  <>
                    <span className='w-3/4'>{item.teacher.firstName + " " + item.teacher.lastName}</span>
                    <button 
                    onClick={(e)=>dettacheTeacherSubject(e,item._id,item.teacher._id)}
                    className="text-teal-600 hover:text-teal-800 focus:outline-none">
                      ✕ 
                    </button>
                  </>
                ) : (
                  <select
                    name="teachers"
                    id="teachers"
                    onChange={(e)=>attacheTeacherSubject(e,item._id)}
                    className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    <option value="">none</option>
                    {teachers.length !== 0 && teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>{teacher.firstName} {teacher.lastName}</option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <Loader/>}
    </div>
  );
}
