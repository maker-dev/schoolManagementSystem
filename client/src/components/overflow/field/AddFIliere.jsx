import { useState , useEffect } from "react";
import api from "../../../api/apiToken";
import ShowList from "../../ui/ShowList";
import AddButton from "../../buttons/AddButton";
import { useCallback, useMemo } from "react";


export default function AddFiliere({setValidateCredentials, setLoading, eventHide}){
    
    // collecting data :
    const [fieldName, setFieldName] = useState("");
    const [bacOptions, setBacOptions] = useState([]);
    const [typeBac, setTypeBac] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [subject, setSubject] = useState([]);

    //fetching for bac data:
    useEffect(() => {
        const fetchBacType = async () => {
          try {
            const response = await api.get('typesOfBac');
            // setOptions(response.data);
            setTypeBac(response.data);  
          } catch (error) {
            error('Error');
          }
        };
    
        fetchBacType();
      },[]);

    //fetching for subject(module) data:
    useEffect(() => {
        const fetchSubject = async () => {
          try {
            const response = await api.get('showSubjects');
            // setOptions(response.data);
            
            setSubject(response.data);  
          } catch (error) {
            error('Error');
          }
        };
    
        fetchSubject();
      },[]);
    
    // Handling bac select in show list
    const handleSelectedBac = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const newOption = { value: selectedOption.value, label: selectedOption.text };
        if(newOption.value === ""){
            return;
        }
        setBacOptions((prevOptions) => {
            const foundIndex = prevOptions.findIndex(bac => bac.value === selectedOption.value);
            if (foundIndex === -1) {
                return [...prevOptions, newOption];
            }
            return prevOptions;
        });
    };
    // Handling subject select in show list
    const handleSelectedSubject = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const newOption = { _id: selectedOption.value, subName: selectedOption.text };
        if(newOption._id === ""){
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
    
    // Handling deleting subject from show list
    const handleDeletedSubject = useCallback((value) => {
        setSubjectOptions((prevItems) => prevItems.filter(item => item._id !== value));
    }, []);
    // Handling deleting bac from show list
    const handleDeletedBac = useCallback((value) => {
        setBacOptions((prevItems) => prevItems.filter(item => item.value !== value));
    }, []);
    

    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        fieldName:fieldName,
        bacRequired: bacOptions.map(bac => bac.value),
        subjects: subjectOptions.map(subject => subject._id)
    }), [bacOptions, fieldName, subjectOptions]);

    return(
    <>

                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Filière</label>
                        <input type="text"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value) }
                        autoComplete="on"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Filière"
                        required/>
                    </div>
                    {/* INputs for bac select */}
                    <div className="col-span-2">
                        <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Type de Bac</span>
                        <select 
                        onChange={handleSelectedBac}
                        name="bacA"
                        required={true}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                            <option  value="" >Seletionner type du Bac</option>
                            {typeBac.length !== 0 && 
                                typeBac.map(typesOfBacSelect =>{
                                    return <option key={typesOfBacSelect._id} value={typesOfBacSelect._id}>{typesOfBacSelect.typeName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-span-2">
                        <span className="block mb-2 text-sm font-medium text-gray-900 text-left">Bac Selectionner</span>
                        <ShowList array={bacOptions} deleteEvent={handleDeletedBac}></ShowList>
                    </div>
                    {/* INputs for subject select */}
                    <div className="col-span-2">
                        <span
                        className="block mb-2 text-sm font-medium text-gray-900 text-left">Type de Module</span>
                        <select 
                        onChange={handleSelectedSubject}
                        required={true}
                        name="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                            <option  value="" >Seletionner type du Module</option>
                            {subject.length !== 0 && 
                                subject.map(typesOfSubjectSelect =>{
                                    return <option key={typesOfSubjectSelect._id} value={typesOfSubjectSelect._id}>{typesOfSubjectSelect.subName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-span-2">
                        <span  className="block mb-2 text-sm font-medium text-gray-900 text-left">Module Selectionner</span>
                        <ShowList array={subjectOptions} deleteEvent={handleDeletedSubject}></ShowList>
                    </div>
                    {/* Button of updating */}
                    <div className="col-span-2">
                        <AddButton 
                        setInputs={[setFieldName,setBacOptions,setSubjectOptions]}
                        setLoading={setLoading} 
                        addApi="insertField" 
                        arrayData={allData} 
                        setValidateCredentials={setValidateCredentials} 
                        title="Filière" 
                        eventHide={eventHide}></AddButton>
                    </div>


    </>
    );
}