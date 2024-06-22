import { useState, useMemo } from "react";
import AddButton from "../../buttons/AddButton";

export default function AddAbscence({ setValidateCredentials, setLoading, eventHide, id, type }) {
  // collecting data:
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");

  // Memorize allData to prevent re-renders
  const allData = useMemo(() => ({
    status: status,
    date: date,
    lessonHours: hours,
  }), [status, date, hours]);

  return (
    <>
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
          <option value="absent">Abscent</option>
          <option value="present">Présent</option>
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
        <label htmlFor="hours" className="block mb-2 text-sm font-medium text-gray-900 text-left">Heures</label>
        <input
          min={0}
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          name="hours"
          id="hours"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Heures"
          required
        />
      </div>
      <div className="col-span-2">
        {type === "Professeurs" && 
          <AddButton
            setInputs={[setStatus, setDate, setHours]}
            setLoading={setLoading}
            addApi={`addTeacherAttendance/${id}`}
            arrayData={allData}
            setValidateCredentials={setValidateCredentials}
            title="Abscence"
            eventHide={eventHide}
          />
        }
        {type === "Etudiants" && 
          <AddButton
            setInputs={[setStatus, setDate, setHours]}
            setLoading={setLoading}
            addApi={`addStudentAttendance/${id}`}
            arrayData={allData}
            setValidateCredentials={setValidateCredentials}
            title="Abscence"
            eventHide={eventHide}
          />
        }
      </div>
    </>
  );
}
