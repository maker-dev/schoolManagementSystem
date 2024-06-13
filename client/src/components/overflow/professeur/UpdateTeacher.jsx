import { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../../api/apiToken";
import ShowList from "../../ui/ShowList";
import UpdateButton from "../../buttons/UpdateButton";
import { error } from "../../../helpers/Alerts";



export default function UpdateTeacher({ teacherId, setValidateCredentials, setLoading, eventHide }) {
    // Collecting data:
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [salaire, setSalaire] = useState(0);
    const [email, setEmail] = useState("");
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [subject, setSubject] = useState([]);

    // Fetching for subject(module) data:
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await api.get('showSubjects');
                if (response.status === 200) {
                    setSubject(response.data);
                } else {
                    error("Erreur!");
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchSubject();
    }, []);

    // Fetching data about the teacher:
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                if (teacherId !== "") {
                    const response = await api.get(`showTeacher/${teacherId}`);
                    if(response.status === 200){
                        setPrenom(response.data.firstName);
                        setNom(response.data.lastName);
                        setSalaire(response.data.salary);
                        setEmail(response.data.email);
                        setSubjectOptions(response.data.teacherSubject);

                    }else{
                        error("Erreur!");
                    }
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchTeacher();
    }, [teacherId]);

    // Handling deleting subject from show list
    const handleDeletedSubject = useCallback((value) => {
        setSubjectOptions((prevItems) => prevItems.filter(item => item._id !== value));
    }, []);

    // Handling subject select in show list
    const handleSelectedSubject = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const newOption = { _id: selectedOption.value, subName: selectedOption.text };
        if (newOption._id === "") {
            return;
        }
        setSubjectOptions((prevOptions) => {
            const foundIndex = prevOptions.findIndex(subject => subject._id === selectedOption.value);
            if (foundIndex === -1) {
                return [...prevOptions, newOption];
            }

            return prevOptions;
        });
    };

    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        teacherId:teacherId,
        newSalary: salaire,
        newTeacherSubject: subjectOptions.map(subject => subject._id)
    }), [salaire, subjectOptions, teacherId]);

    return (
        <>
            <div className="col-span-2 flex flex-col md:flex-row gap-2">
                {/* Teacher firstName */}
                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom</span>
                    <input
                        type="text"
                        value={nom}
                        readOnly
                        autoComplete="on"
                        name="name"
                        id="name"
                        className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom"
                        required
                    />
                </div>
                {/* Teacher LastName */}
                <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 text-left">Prénom</label>
                    <input
                        type="text"
                        value={prenom}
                        readOnly
                        autoComplete="on"
                        name="lastname"
                        id="lastname"
                        className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Prénom"
                        required
                    />
                </div>
            </div>
            
            {/* Email */}
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">E-mail</span>
                <input
                    type="text"
                    value={email}
                    readOnly
                    name="email"
                    id="email"
                    className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Email"
                    required
                />
            </div>

            {/* Salary per hour */}
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Salaire (Dhs/heure)</span>
                <input
                    type="number"
                    min="0"
                    value={salaire}
                    onChange={(e) => setSalaire(e.target.value)}
                    name="salaire"
                    id="salaire"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Salaire (dhs/heure)"
                    required
                />
            </div>
            {/* Inputs for subject select */}
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Type de Module</span>
                <select
                    onChange={handleSelectedSubject}
                    required={true}
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0"
                >
                    <option value="">Seletionner type du Module</option>
                    {subject.length !== 0 &&
                        subject.map(typesOfSubjectSelect => {
                            return <option key={typesOfSubjectSelect._id} value={typesOfSubjectSelect._id}>{typesOfSubjectSelect.subName}</option>;
                        })
                    }
                </select>
            </div>
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Module Selectionner</span>
                <ShowList array={subjectOptions} deleteEvent={handleDeletedSubject}></ShowList>
            </div>

            {/* Button for updating */}
            <div className="col-span-2">
                <UpdateButton 
                    eventHide={eventHide} 
                    updateApi="updateTeacher"
                    title="Professeur" 
                    arrayData={allData} 
                    setValidateCredentials={setValidateCredentials} 
                    setLoading={setLoading}>
                </UpdateButton>
            </div>
        </>
    );
}
