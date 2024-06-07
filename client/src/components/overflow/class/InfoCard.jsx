import { useEffect, useState } from "react";
import api from "../../../api/apiToken";

export default function InfoCard({ title, id }) {
  // Controlling data
  const [informations, setInformations] = useState({});

  // Fetching information about the following class data
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (id !== "") {
          const response = await api.get(`getClassInfo/${id}`);
          setInformations(response.data);
        }
      } catch (error) {
            console.error('Error fetching class information!');
      }
    };

    fetchInfo();
  }, [id]);  

  return (
    <main className="flex flex-col items-center justify-center shadow-md bg-white">
      <div className="container px-4 py-12 mx-auto">
        <h1 className="font-bold text-gray-600 text-xl w-full mb-8 text-center">{title}</h1>
        <table className="min-w-full bg-white">
          <tbody>
            <tr className="odd:bg-gray-200">
              <td className="w-1/2 text-right px-6 py-4 font-bold text-gray-600">Nom Classe :</td>
              <td className="w-1/2 text-left px-6 py-4 text-gray-600 font-bold">{informations.className}</td>
            </tr>
            <tr className="odd:bg-gray-200">
              <td className="w-1/2 text-right px-6 py-4 font-bold text-gray-600">Nom Filière :</td>
              <td className="w-1/2 text-left px-6 py-4 text-gray-600 font-bold">{informations.field}</td>
            </tr>
            <tr className="odd:bg-gray-200">
              <td className="w-1/2 text-right px-6 py-4 font-bold text-gray-600">Nombre des étudiants :</td>
              <td className="w-1/2 text-left px-6 py-4 text-gray-600 font-bold">{informations.numberOfStudents}</td>
            </tr>
            <tr className="odd:bg-gray-200">
              <td className="w-1/2 text-right px-6 py-4 font-bold text-gray-600">Nombre des professeurs :</td>
              <td className="w-1/2 text-left px-6 py-4 text-gray-600 font-bold">{informations.numberOfTeachers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
