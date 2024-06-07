import { useEffect, useState } from "react";
import DataHandlerButton from "../buttons/DataHandlerButton";

export default function DataHandler({arrayData, title, svgType, color, apiUsed, id, setLoading}){

    //searching data:
    const [search, setSearch] = useState("");
    const [searchedData, setSearchedData] = useState([]);

    //controlling checked data:
    const [checkedArray, setCheckedArray] = useState([]);

    //fill in data:
    useEffect(()=>{
        setSearchedData(arrayData);
    },[arrayData])
    
    // Search event
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        setSearchedData(arrayData.filter((data) => {
            const datas =  (data["firstName"] + " " + data["lastName"]).toLowerCase().includes(query.toLowerCase());
            return datas;
        }));
    }

    // Handle checked checkbox solo
    const handleChange = (e, idItem) => {
        if (checkedArray.includes(idItem) && e.target.checked === false) {
            setCheckedArray(checkedArray.filter((dataId) => {
                return dataId !== idItem;
            }));
        } else if (!checkedArray.includes(idItem) && e.target.checked === true) {
            setCheckedArray([...checkedArray, idItem]);
        }
    }
    
    return(
<div className="w-full bg-white ">
    <div className="">
      <span  className="sr-only">Search</span>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 :text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        </div>
        <input type="text"
         id="input-group-search" 
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" 
         onChange={handleSearch}
         value={search}
         autoComplete="on"
         placeholder="Recherche element"/>
      </div>
    </div>
    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 text-left " aria-labelledby="dropdownSearchButton">
          
         {searchedData.length !== 0 &&
            searchedData.map( item => {
                return(
            <li className="p-3 sm:pb-4 border-t" key={item[Object.keys(item)[0]]}>
                <div className="flex items-center space-x-4 ">
                    <div className="flex-shrink-0">
                        <input 
                        id="checkbox-item-11"
                        type="checkbox" 
                        checked={checkedArray.includes(item[Object.keys(item)[0]])}
                        value={item[Object.keys(item)[0]]}
                        onChange={(e) => handleChange(e, item[Object.keys(item)[0]])}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 :focus:ring-blue-600 :ring-offset-gray-700 :focus:ring-offset-gray-700 focus:ring-2 :bg-gray-600 :border-gray-500"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate ">
                        {item["firstName"]}  {item["lastName"]} 
                        </p>
                        <p className="text-sm text-gray-500 truncate ">
                            {item["email"]}
                        </p>
                    </div>
                </div>
            </li>
    )})
        }
        {searchedData.length === 0  &&
            <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 :hover:bg-gray-600">
                    <span  
                    className="w-full ms-2 text-sm font-medium text-red-700 rounded :text-gray-300">
                        Vide
                    </span>
                </div>
            </li>
        }
    </ul>
    <div>

    </div>
    <div className="w-full">
        <DataHandlerButton title={title} 
        svgType={svgType} 
        color={color} 
        apiUsed={apiUsed} 
        id={id} 
        setData={setCheckedArray}
        setLoading={setLoading}
        data={checkedArray}/>
    </div>
        
    </div> 
    )
    
}