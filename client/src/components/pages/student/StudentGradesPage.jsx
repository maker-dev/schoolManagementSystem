import { useEffect, useState } from "react";
import api from "../../../api/apiToken";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { ToastContainer } from "react-toastify";
import Loader from "../../ui/Loader";
import TitleCard from "../../cards/TitleCard";
import { error } from "../../../helpers/Alerts";
import NavBar from "../../ui/NavBar";
import SideBar from "../../ui/SideBar";

export default function StudentGradesPage() {

    // Functionalities:
    const [loading, setLoading] = useState(false);

    // Data:
    const [user, setUser] = useState(null);

    // Fetching connected user:
    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await api.post('user');
            if (response.status === 200) {
                setUser(response.data);
            } else if (response.status === 400) {
                setUser(null);
            } else if (response.status === 401) {
                DeconnectUser();
            } else {
                error("Erreur serveur");
            }
        } catch (e) {
            error("Erreur serveur");
            setUser(null);
            setLoading(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Helper function to render exam results:
    const renderExamResults = () => {
        if (!user || !user.examResults) return null;

        return user.examResults.map((result, index) => (
            <div key={index} className="bg-white p-6 my-2 rounded shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-center bg-gray-200 p-4">{result.subject.subName}</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-500">
                            <tr>
                                <th className="px-6 py-3 font-medium text-white uppercase tracking-wider">Exames</th>
                                <th className="px-6 py-3 font-medium text-white uppercase tracking-wider">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {result.exams.map((exam, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">Note {i + 1}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">{exam.marksObtained || '--'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="">
                <NavBar />
            </div>
            <div className="flex">
                <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                    <SideBar />
                </div>
                <div className="flex flex-col gap-4 h-screen bg-gray-100 md:w-4/5 w-full overflow-y-auto p-6">
                    <div className="mx-0 md:mx-6 mt-2">
                        <TitleCard title={"Page des Notes"}></TitleCard>
                    </div>
                    <div className="mx-0 md:mx-6 mt-2 flex justify-center items-center bg-gray-100 my-6">
                        <div className="w-full bg-white p-8 rounded-lg shadow-lg">
                            {/* Display Exam Results */}
                            {renderExamResults()}
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
            <ToastContainer />
        </div>
    );
}
