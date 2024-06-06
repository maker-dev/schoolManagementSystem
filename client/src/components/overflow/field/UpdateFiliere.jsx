import { useState, useEffect, useMemo, useCallback } from "react";
import api from "../../../api/apiToken";
import ShowList from "../../ui/ShowList";
import UpdateButton from "../../buttons/UpdateButton";
import { error } from "../../../helpers/Alerts";

export default function UpdateFiliere({ fieldId, setValidateCredentials, setLoading, eventHide }) {
    // State for the new field name
    const [newFieldName, setNewFieldName] = useState("");

    // State for bac options and selected bac
    const [bacOptions, setBacOptions] = useState([]);
    const [typeBac, setTypeBac] = useState([]);

    // State for subject options and selected subjects
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    // Fetch field data
    useEffect(() => {
        const fetchField = async () => {
            try {
                if (fieldId !== "") {
                    const response = await api.get(`showField/${fieldId}`);
                    setBacOptions(response.data.bacRequired || []);
                    setNewFieldName(response.data.fieldName);
                    setSubjectOptions(response.data.subjects);
                }
            } catch (error) {
                error('Error fetching field data', error);
            }
        };

        fetchField();
    }, [fieldId]);

    // Fetch bac type data
    useEffect(() => {
        const fetchBacType = async () => {
            try {
                const response = await api.get('typesOfBac');
                setTypeBac(response.data);
            } catch (error) {
                error('Error fetching bac types', error);
            }
        };

        fetchBacType();
    }, []);

    // Fetch subject type data
    useEffect(() => {
        const fetchSubjectType = async () => {
            try {
                const response = await api.get('showSubjects');
                setSubjectList(response.data);
            } catch (error) {
                error('Error fetching subjects', error);
            }
        };

        fetchSubjectType();
    }, []);

    // Handle bac selection
    const handleSelectedBac = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const newOption = { _id: selectedOption.value, typeName: selectedOption.text };
        if (newOption._id === "") {
            return;
        }
        setBacOptions((prevOptions) => {
            const foundIndex = prevOptions.findIndex(bac => bac._id === selectedOption.value);
            if (foundIndex === -1) {
                return [...prevOptions, newOption];
            }
            return prevOptions;
        });
    };

    // Handle subject selection
    const handleSelectedSubject = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const newOption = { _id: selectedOption.value, subName: selectedOption.text };
        console.log(newOption);
        if (newOption._id === "") {
            return;
        }
        setSubjectOptions((prevOptions) => {
            const foundIndex = prevOptions.findIndex(sub => sub._id === selectedOption.value);
            if (foundIndex === -1) {
                return [...prevOptions, newOption];
            }
            return prevOptions;
        });
    };

    // Handle deleting bac from the list
    const handleDeletedBac = useCallback((value) => {
        setBacOptions((prevItems) => prevItems.filter(item => item._id !== value));
    }, []);

    // Handle deleting subject from the list
    const handleDeletedSubject = useCallback((value) => {
        setSubjectOptions((prevItems) => prevItems.filter(item => item._id !== value));
    }, []);

    // Memoize allData to prevent re-renders
    const allData = useMemo(() => ({
        fieldId: fieldId,
        newBacRequired: bacOptions.map(bac => bac._id),
        newFieldName: newFieldName,
        newSubjects: subjectOptions.map(sub => sub._id),
    }), [fieldId, bacOptions, newFieldName, subjectOptions]);

    return (
        <>
            <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom Filière</label>
                <input type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    name="name"
                    id="name"
                    autoComplete="on"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nom Filière"
                    required />
            </div>
            <div className="col-span-2">
                <span  className="block mb-2 text-sm font-medium text-gray-900 text-left">Type de Bac</span>
                <select
                    onChange={handleSelectedBac}
                    name="bacA"
                    required={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                    <option value="">Sélectionner type du Bac</option>
                    {typeBac.length !== 0 &&
                        typeBac.map(typesOfBacSelect => {
                            return <option key={typesOfBacSelect._id} value={typesOfBacSelect._id}>{typesOfBacSelect.typeName}</option>
                        })
                    }
                </select>
            </div>
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Bac Sélectionné</span>
                <ShowList array={bacOptions} deleteEvent={handleDeletedBac}></ShowList>
            </div>
            <div className="col-span-2">
                <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Modules</span>
                <select
                    onChange={handleSelectedSubject}
                    required={true}
                    name="module"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                    <option value="">Sélectionner Module</option>
                    {subjectList.length !== 0 &&
                        subjectList.map(subjectSelect => {
                            return <option key={subjectSelect._id} value={subjectSelect._id}>{subjectSelect.subName}</option>
                        })
                    }
                </select>
            </div>
            <div className="col-span-2">
                <span  className="block mb-2 text-sm font-medium text-gray-900 text-left">Module Sélectionné</span>
                <ShowList array={subjectOptions} deleteEvent={handleDeletedSubject}></ShowList>
            </div>
            <div className="col-span-2">
                <UpdateButton 
                    eventHide={eventHide} 
                    updateApi="updateField"
                    title="Filière" 
                    arrayData={allData} 
                    setValidateCredentials={setValidateCredentials} 
                    setLoading={setLoading}>
                </UpdateButton>
            </div>
        </>
    );
}
