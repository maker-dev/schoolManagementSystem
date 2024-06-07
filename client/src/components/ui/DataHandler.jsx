import { useEffect, useState } from "react";

export default function DataHandler({array, event}){

    //searching data:
    const [search, setSearch] = useState("");
    const [searchedData, setSearchedData] = useState([]);

    //fill in data:
    useEffect(()=>{
        setSearchedData(array);
    },[array])
    
    // Search event
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        setSearchedData(array.filter((data) => {
            const datas =  data[Object.keys(data)[1]].toLowerCase().includes(query.toLowerCase());
            return datas;
        }));
    }
    
    return(
        <div className="w-full bg-white ">
            <div className="mb-4 flex flex-col md:flex-row justify-between">
                                <input type="text"
                                    id="search"
                                    onChange={handleSearch}
                                    value={search}
                                    autoComplete="on"
                                    className="block p-2 text-sm md:mb-0 mb-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-200"
                                    placeholder="Recherche des items" />
            </div>
            <div className="border bg-gray-50  p-2">
                <ul>
                {searchedData.length !== 0 &&
                searchedData.map( item => {
                    
                                return <li
                                        className="text-sm p-2 hover:bg-gray-100  cursor-pointer text-left"
                                        onDoubleClick={event}
                                        key={item[Object.keys(item)[0]]}>{item[Object.keys(item)[1]]}</li>
                                })
                                        
                }
                {
                    array.length === 0 &&
                    <li className="text-sm p-2 font-bold text-left text-gray-700">Vide</li>
                }
                </ul>
            </div>
        
    </div> 
    )
    
}