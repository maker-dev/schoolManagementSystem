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

    //fetching for bac data:
    useEffect(() => {
        const fetchBacType = async () => {
          try {
            const response = await api.get('typesOfBac');
            // setOptions(response.data);
            setTypeBac(response.data);  
          } catch (error) {
            console.error('Error');
          }
        };
    
        fetchBacType();
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
    
    // Handling deleting bac from show list
    const handleDeletedBac = useCallback((value) => {
        setBacOptions((prevItems) => prevItems.filter(item => item.value !== value));
    }, []);

    // Memorize allData to prevent re-renders
    const allData = useMemo(() => ({
        fieldName:fieldName,
        bacRequired: bacOptions.map(bac => bac.value)
    }), [bacOptions, fieldName]);

    return(
    <>

                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-left ">Nom Filière</label>
                        <input type="text"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value) }
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nom Filière"
                        required/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 text-left">Type de Bac</label>
                        <select 
                        onChange={handleSelectedBac}
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
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 text-left">Bac Selectionner</label>
                        <ShowList array={bacOptions} deleteEvent={handleDeletedBac}></ShowList>
                    </div>
                    <div className="col-span-2">
                        <AddButton 
                        setInputs={[setFieldName,setBacOptions]}
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