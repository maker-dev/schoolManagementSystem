import { useState, useEffect, useMemo, useCallback } from "react";
import api from "../../../api/apiToken";
import ShowList from "../../ui/ShowList";
import UpdateButton from "../../buttons/UpdateButton";

export default function UpdateFiliere({ fieldId, setValidateCredentials, setLoading, eventHide }) {
    //functionalities
    const [newFieldName, setNewFieldName] = useState("");
    
    //bac data collectors:
    const [bacOptions, setBacOptions] = useState([]);
    const [typeBac, setTypeBac] = useState([]);

    // Fetching field data
    useEffect(() => {
        const fetchField = async () => {
            try {
                if (fieldId !== "") {
                    const response = await api.get(`showField/${fieldId}`);
                    setBacOptions(response.data.bacRequired || []);
                    setNewFieldName(response.data.fieldName);
                }
            } catch (error) {
                console.error('Error');
            }
        };

        fetchField();
    }, [fieldId]);

    // Fetching bac type data
    useEffect(() => {
        const fetchBacType = async () => {
            try {
                const response = await api.get('typesOfBac');
                setTypeBac(response.data);
            } catch (error) {
                console.error('Error');
            }
        };

        fetchBacType();
    }, []);

    // Handling bac select in show list
    const handleSelectedBac = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const newOption = { _id: selectedOption.value, typeName: selectedOption.text };

        setBacOptions((prevOptions) => {
            const foundIndex = prevOptions.findIndex(bac => bac._id === selectedOption.value);
            if (foundIndex === -1) {
                return [...prevOptions, newOption];
            }
            return prevOptions;
        });
    };

    // Handling deleting bac from show list
    const handleDeletedBac = useCallback((value) => {
        setBacOptions((prevItems) => prevItems.filter(item => item._id !== value));
    }, []);

    // Memoize allData to prevent re-renders
    const allData = useMemo(() => ({
        fieldId:fieldId,
        newBacRequired: bacOptions.map(bac => bac._id),
        newFieldName:newFieldName
    }), [fieldId, bacOptions, newFieldName]);
    

    return (
        <>
            <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Nom Filière</label>
                <input type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nom Filière"
                    required />
            </div>
            <div className="col-span-2">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 text-left">Type de Bac</label>
                <select
                    onChange={handleSelectedBac}
                    required={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                    <option selected disabled>Seletionner type du Bac</option>
                    {typeBac.length !== 0 &&
                        typeBac.map(typesOfBacSelect => {
                            return <option key={typesOfBacSelect._id} value={typesOfBacSelect._id}>{typesOfBacSelect.typeName}</option>
                        })
                    }
                </select>
            </div>
            <div className="col-span-2">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 text-left">Bac Selectionner</label>
                <ShowList array={bacOptions} deleteEvent={handleDeletedBac}></ShowList>
            </div>
            <div className="col-span-2">
            <UpdateButton eventHide={eventHide} updateApi="updateField" title="Filière" arrayData={allData} setValidateCredentials={setValidateCredentials} setLoading={setLoading}></UpdateButton>
            </div>
            
        </>
    );
}
