import { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../../api/apiToken";
import ShowList from "../../ui/ShowList";
import AddButton from "../../buttons/AddButton";
import { error } from "../../../helpers/Alerts";
import { generateStrongPassword } from "../../../helpers/HelpersFunctions";


export default function AddTeacher({ setValidateCredentials, setLoading, eventHide }) {
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
        firstName: nom,
        lastName: prenom,
        salary: salaire,
        email: email,
        password: generateStrongPassword(),
        teacherSubject: subjectOptions.map(subject => subject._id)
    }), [nom, prenom, salaire, email, subjectOptions]);

    return (
        <>
            <div className="col-span-2 flex flex-col md:flex-row gap-2">
                {/* Teacher firstName */}
                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom</span>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        autoComplete="on"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                        onChange={(e) => setPrenom(e.target.value)}
                        autoComplete="on"
                        name="lastname"
                        id="lastname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Prénom"
                        required
                    />
                </div>
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
            {/* Email */}
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">E-mail</span>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Email"
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
                <AddButton
                    setInputs={[setNom, setPrenom, setSalaire, setEmail, setSubjectOptions]}
                    setLoading={setLoading}
                    addApi="insertTeacher"
                    arrayData={allData}
                    setValidateCredentials={setValidateCredentials}
                    title="Professeur"
                    eventHide={eventHide}
                ></AddButton>
            </div>
        </>
    );
}
