import NavBar from "../../ui/NavBar";
import SideBar from "../../ui/SideBar";
import { useEffect, useState } from "react";
import api from "../../../api/apiToken";
import { useNavigate } from "react-router-dom";
import DeconnectUser from "../../../helpers/DeconnectUser";
import Loader from "../../ui/Loader";
import {success, error} from "../../../helpers/Alerts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateCard from "../../overflow/UpdateCard";
import AddCard from "../../overflow/AddCard";
import TitleCard from "../../cards/TitleCard";
import ShowCard from "../../overflow/ShowCard";




export default function CrudPage({columns,indexApi,deleteApi,idName,title,objectName}){
    //data:
    const [data, setData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);
    const [search, setSearch] = useState("");
    const [id, setId] = useState("");

    
    
    //functionalities
    const [showAdd, setShowAdd] = useState('hidden');
    const [showInfo,setShowInfo] = useState('hidden');
    const [showUpdate,setShowUpdate] = useState('hidden');
    const [checkedArr, setCheckedArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //collection field data:
    useEffect(()=>{
            const fetchDatas = async ()=>{
                const response = await api.get(indexApi);
                
                if(response.status === 401){
                
                    DeconnectUser();
                    navigate("/");
                    console.log("error autorization");
    
                }
                if(response.status === 200){
                    setData(response.data);
                    setSearchedData(response.data);
                    
                } else{
                    error("Error:Something's went wrong");
                } 
                
            }
            fetchDatas();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showAdd,loading,showUpdate]);
    

    //hadling the checkbox of all rows:
    const handleCheck = (e) => {
        if(e.target.checked === true){
            setCheckedArr(data.map((field)=>{
                    return field._id;
            }));
        }
        else{
            setCheckedArr([]);
        }
    } 

    
    //deleting field event:
    const deleteDatas = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        if (checkedArr.length === 0) {
            error(`Selecionnez une ${objectName}!`);
            setLoading(false);
            return;
        }
    
        try {
            
            const deletePromises = checkedArr.map(id =>
                api.delete(deleteApi, {
                    data: { [idName]: id }
                })
            );
    
            const responses = await Promise.all(deletePromises);
    
            let successCount = 0;
            let authError = false;
            let selectionError = false;
    
            responses.forEach(response => {
                if (response.status === 401) {
                    authError = true;
                } else if (response.status === 400) {
                    selectionError = true;
                } else if (response.status === 200) {
                    successCount++;
                }
            });
    
            if (authError) {
                DeconnectUser();
                navigate("/");
                console.log("error authorization");
                return;
            }
    
            if (selectionError) {
                error(`Error ${objectName}!`);
            } else if (successCount > 0) {
                
                success(`${successCount} supprimeès!` );
                setCheckedArr([]);
            } else {
                error("Error: somthings went wrong!");
            }
        } catch (e) {
            console.log("error", e);
            error("Error!");
        }
    
        setLoading(false);
    };
    
    //handling the show and hide add page:
    const showAddPage = () =>{
            setShowAdd('block');
    }

    const hideAddPage = () =>{
            setShowAdd('hidden');
    }
    //handling the show and hide show page:
    const showInfoPage = (id) =>{
            setId(id);
            setShowInfo('block');
    }

    const hideInfoPage = () =>{
            setId("");
            setShowInfo('hidden');
    }
    //handling the show and hide update page:
    const showUpdatePage = (id) =>{
            setId(id);
            setShowUpdate('block');
    }

    const hideUpdatePage = () =>{
            setId("");
            setShowUpdate('hidden');
    }
    //serach event:
    const handleSearch = (e) =>{
        
        const query = e.target.value;
        setSearch(query);
        setSearchedData(data.filter((data)=>{
            const fieldSearchBy = Object.keys(columns)[0];
            const datas = data[fieldSearchBy].toLowerCase().includes(query.toLowerCase());
            return datas; 
        }));

    }
    //handling checked checkbox solo:
    const handleChangeChild = (e,id) =>{
        if(checkedArr.includes(id) && e.target.checked === false ){
            setCheckedArr(checkedArr.filter((dataId)=>{
                return dataId !== id;
            }));
           

        }else if(!checkedArr.includes(id) && e.target.checked === true ){
            setCheckedArr([...checkedArr,id]);
           
        }
    } 
    
    return(
        <div className="flex flex-col h-screen">
        <div className="">
            <NavBar/>
        </div>
        <div className="flex">
            <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                <SideBar/>
            </div>
            <div className="flex flex-col gap-4 h-screen  bg-gray-100 md:w-4/5 w-full overflow-y-auto">
            <TitleCard title={title}></TitleCard>
            <div className="shadow-md  mx-0 md:mx-6 mt-6 p-6 bg-white ">
                <div className="mb-4 flex flex-col md:flex-row justify-between">
                    <input type="text"
                    onChange={handleSearch}
                    value={search}
                    className="block p-2 text-sm md:mb-0 mb-2 text-gray-900 border border-gray-300 rounded-lg   bg-gray-200 "
                    placeholder="Recherche des items"/>
                    <div>
                        <button 
                        onClick={showAddPage}
                        className="px-4 py-2 rounded bg-green-600  text-white font-black hover:bg-green-800">
                        Ajouter</button>
                        <button 
                        onClick={deleteDatas}
                        className="px-4 py-2 ml-2 rounded bg-red-600  text-white font-black hover:bg-red-800">
                        Supprimer</button>
                    </div>
                    
                </div>
                
                <div className="overflow-x-auto  overflow-y-auto rounded-lg">
                    <table className="w-full text-sm text-left   rtl:text-right text-white ">
                        <thead className=" text-white uppercase bg-teal-600 ">
                            {/* showing the columns of the page passsing propps */}
                            <tr>
                                {columns.length !== 0 &&
                                Object.keys(columns).map((key,index) => {
                                    return(
                                        <th key={index} scope="col" className="px-6 py-3 font-bold">
                                            {index === 0 &&
                                            <input type="checkbox" onChange={handleCheck} className="p-4 mr-2"/>
                                            }
                                            <label htmlFor="">{columns[key]}</label> 
                                        </th>
                                        )
                                    }
                                )
                                }
                                <th scope="col" className="px-6 py-3 font-bold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                            {/* showing the data from api based on the columns of the targeted page */}
                            {data.length !== 0 &&
                                <tbody>
                                { searchedData.map( field =>{
                                    return(
                                        <tr key={field._id} className="bg-teal-500 border-b text-white border-teal-400">
                                             {columns.length !== 0 &&
                                                Object.keys(columns).map((key,index) => {
                                                    return(
                                                    <td key={index} className="px-6 py-4  font-black text-white whitespace-nowrap ">
                                                            {index === 0 &&
                                                            <input type="checkbox"
                                                            className="p-4 mr-2"
                                                            checked={checkedArr.includes(field._id)? true : false}
                                                            onChange={(e)=>handleChangeChild(e,field._id)}
                                                            />
                                                            }
                                                            <label htmlFor="">{field[key]}</label> 
                                                    </td>
                                                    )
                                                
                                                })
                                        }
                                        {/* showing the actions ( modifier and voir) */}
                                            <td className="flex gap-4 px-6 py-4">
                                                <button
                                                onClick={()=>showInfoPage(field._id)}
                                                className="font-bold text-white hover:underline">Voir</button>
                                                <button onClick={()=>showUpdatePage(field._id)}
                                                className="font-bold text-white hover:underline">Modifier</button> 
                                            </td>
                                    
                                    </tr>  
                                    );
                                })
                                }
                            </tbody>
                            } 
                    </table>
                </div>
                <AddCard display={showAdd} eventHide={hideAddPage} cardName={objectName}/>
                <ShowCard display={showInfo} eventHide={hideInfoPage} id={id} cardName={objectName}/>
                <UpdateCard display={showUpdate} eventHide={hideUpdatePage} id={id} cardName={objectName}/>
            </div>
            </div>
        </div>
        {loading && <Loader/>}
         <ToastContainer />
        
    </div>
    )
}