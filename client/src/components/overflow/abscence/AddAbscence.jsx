import { useState, useMemo, useEffect, useCallback } from "react";
import AddButton from "../../buttons/AddButton";
import api from "../../../api/apiToken";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { useNavigate } from "react-router-dom";

export default function AddAbscence({ setValidateCredentials, setLoading, eventHide, id, type, idClass }) {
  // collecting data:
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [idTeacher, setIdTeacher] = useState("");
  const [subject, setSubject] = useState("");

  // functionalities:
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post('user');
      if (response.status === 200) {
        setIdTeacher(response.data._id);
      } else if (response.status === 401) {
        DeconnectUser();
        navigate("/");
      } else {
        console.error("Server Error");
      }
    } catch (e) {
      console.error("Server Error", e);
    }
    setLoading(false);
  }, [navigate, setLoading]);

  // Fetch data when userId changes
  useEffect(() => {
    if(type === "Etudiants"){
      fetchUser();
    }
  }, [fetchUser, type]);

  // fetching for subject(module) data:
  useEffect(() => {
    if (type === "Etudiants" && idTeacher) {
      const fetchSubject = async () => {
        try {
          const response = await api.get(`showFieldSubjects/${idClass}?teacherId=${idTeacher}`);
          setSubjects(response.data.subjects);
        } catch (error) {
          console.error('Error fetching subjects', error);
        }
      };

      fetchSubject();
    }
  }, [type, idClass, idTeacher]);

  // Memorize allData to prevent re-renders
  const allData = useMemo(() => {
    if (type === "Etudiants") {
      return {
        status: status,
        date: date,
        lessonHours: hours,
        subject: subject,
      };
    } else {
      return {
        status: status,
        date: date,
        lessonHours: hours,
      };
    }
  }, [status, date, hours, subject, type]);

  return (
    <>
      {type === "Etudiants" && (
        <div className="col-span-2">
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 text-left">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            name="subject"
            id="subject"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          >
            <option value="" disabled>Selectionner Module</option>
            {subjects.map((subj) => (
              <option key={subj._id} value={subj._id}>{subj.subName}</option>
            ))}
          </select>
        </div>
      )}
      <div className="col-span-2">
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 text-left">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          name="status"
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        >
          <option value="" disabled>Select status</option>
          <option value="absent">Absent</option>
          <option value="present">Present</option>
        </select>
      </div>
      <div className="col-span-2">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 text-left">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          name="date"
          id="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="hours" className="block mb-2 text-sm font-medium text-gray-900 text-left">Hours</label>
        <input
          min={0}
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          name="hours"
          id="hours"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Hours"
          required
        />
      </div>
      <div className="col-span-2">
        {type === "Professeurs" && 
          <AddButton
            setInputs={[setStatus, setDate, setHours, setSubject]}
            setLoading={setLoading}
            addApi={`addTeacherAttendance/${id}`}
            arrayData={allData}
            setValidateCredentials={setValidateCredentials}
            title="Absence"
            eventHide={eventHide}
          />
        }
        {type === "Etudiants" && 
          <AddButton
            setInputs={[setStatus, setDate, setHours, setSubject]}
            setLoading={setLoading}
            addApi={`addStudentAttendance/${id}`}
            arrayData={allData}
            setValidateCredentials={setValidateCredentials}
            title="Absence"
            eventHide={eventHide}
          />
        }
      </div>
    </>
  );
}
