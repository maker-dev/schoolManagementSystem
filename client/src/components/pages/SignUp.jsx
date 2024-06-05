import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import api from '../../api/apiToken';
import VerifieAccount from "./VerifieAccount";
import Loader from "../ui/Loader";
import { error, info } from "../../helpers/Alerts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(){


    //States inputs:
    const [lastName, setPrenom] = useState("");
    const [firstName, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tel, setTel] = useState("");
    const [typeOfBac , setBac] = useState("");
    const [field, setFiliere] = useState("");

    //Functionalities:
    const [loading, setLoading] = useState(false);
    const [typesOfBacSelect, setTypesOfBacSelect] = useState([]);
    const [filiereSelect, setFiliereSelect] = useState([]);
    const [roleUser, setRoleUser] = useState(false);
    const [roleTitle, setRoleTitle] = useState(roleUser?"Professeur":"Etudiant");
    const [showPassword, setShowPassword] = useState(false);
    const [ValidateCredentials,setValidateCredentials] = useState([]);
    const [requiresVerification, setRequiresVerification] = useState(false);


    useEffect(() => {
        const fetchBacType = async () => {
          try {
            const response = await api.get('typesOfBac');
            // setOptions(response.data);
            setTypesOfBacSelect(response.data);  
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchBacType();
      },[]);

      useEffect(() => {
        const fetchFiliere = async () => {
            
          try {

            if(typeOfBac !== ""){
                const response = await api.get(`getFields?typeId=${typeOfBac}`);
                setFiliereSelect(response.data);  
            }else{
                setFiliereSelect([]);
            }
            
          } catch (error) {
            console.error('Error fetching data:');
          }
        };
    
        fetchFiliere();
      },[typeOfBac]);
      
    const handleVisiblePassword = () =>{
        setShowPassword(showPassword?false:true);
    }
    
    const handleChange = (e) => {

        if(e.target.value === "Professeur"){
            setRoleUser("Professeur");
            setRoleTitle("Professeur");
        }
        else if(e.target.value === "Etudiant"){
            setRoleUser("Etudiant");
            setRoleTitle("Etudiant");
        }else{
            return;
        }
    }

    const handleTypeBacChange = (e) =>{
        setLoading(true);
        setBac(e.target.value);
        setLoading(false);
    }
    
    const handleTypeFiliereChange = (e) =>{
        setFiliere(e.target.value);
    }
    //Handling submit event function: 
    const handleSubmit = async (e) => {
        setLoading(true);
        setValidateCredentials([]);
        let response;
        e.preventDefault();
        if(roleUser === "Professeur"){
             response = await api.post("teacherRegister", JSON.stringify({ firstName, lastName, email, password }));
            
        } else if(roleUser === "Etudiant"){
             response = await api.post("studentRegister", JSON.stringify({ firstName, lastName, tel, typeOfBac, field, email, password }));
        }
    
        
          
          if(response.status === 401){
            console.log(response.data.message);
          }
          if ( response.status === 400) {
            
            let arrErrors = [];
            for(let i = 0; i<response.data.errors.length; i++){
                arrErrors.push({key: i, msg: response.data.errors[i].msg});
            }
            setValidateCredentials(arrErrors);
          } else if (response.status === 200) {
            info("Verifier votre compte!");
            setRequiresVerification(true);
          }else{
            error("Erreur!");
          }
          setLoading(false);
      }
    
      if (requiresVerification && roleUser === "Professeur") {
    
        return <VerifieAccount email={email} role="Teacher"/>;
      }else if(requiresVerification && roleUser === "Etudiant"){
        return <VerifieAccount email={email} role="Student"/>;
      }


    return(
        <section className="bg-gray-50 h-full p-8">
        
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 my-4">
        <Link to="/" className="flex  text-teal-600  items-center mb-6 text-3xl font-semibold text-gray-900 ">
            Logo  
        </Link>
        <div className="w-full  bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                     {roleTitle}
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                        {ValidateCredentials.length !== 0 &&
                        <div className=' bg-red-300 text-red-900 p-4'>
                            <ul className='list-disc pl-20 pr-20'>
                            { ValidateCredentials.map(item => (
                                
                                // Use the item's ID as the key for efficient rendering
                                <li key={item.key}>{item.msg}</li>
                            ))}
                            </ul>
                        </div>
                        }
                    <div>
                        <label htmlFor="role" className="block mb-2 text-left text-sm font-medium text-gray-900">Etes vous ?</label>
                        <select name="role" 
                        id="role" 
                        defaultValue="" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5 :bg-gray-700" 
                        onChange={handleChange} 
                        required>
                            <option value="" >Selectionner votre situation</option>
                            <option value="Professeur" >Professeur</option>
                            <option value="Etudiant" >Etudiant</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nom" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Nom</label>
                        <input type="text" value={firstName} onChange={(e) => setNom(e.target.value)} name="nom" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="nom" required=""/>
                    </div>
                    <div>
                        <label htmlFor="prenom" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Prénom</label>
                        <input type="text" value={lastName} onChange={(e) => setPrenom(e.target.value)} name="prenom" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="prenom" required=""/>
                    </div>
                    {roleUser === "Etudiant" && 
                    // Etudiant Info form
                    <>
                    <div>
                        <label htmlFor="tel" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Numero de téléphone</label>
                        <input type="text" value={tel} onChange={(e) => setTel(e.target.value)} name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="0612345678" required=""/>
                    </div>
                    <div>
                        <label htmlFor="bac" className="block mb-2 text-left text-sm font-medium text-gray-900">Type de bac</label>
                        <select name="bac" id="bac" value={typeOfBac} onChange={handleTypeBacChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5 :bg-gray-700"  required="">
                            <option value="">Selectionner type de bac</option>
                            {typesOfBacSelect.length !== 0 && 
                                typesOfBacSelect.map(typesOfBacSelect =>{
                                    return <option key={typesOfBacSelect._id} value={typesOfBacSelect._id}>{typesOfBacSelect.typeName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filiere" className="block mb-2 text-left text-sm font-medium text-gray-900">Filière</label>
                        <select name="filiere" id="filiere" value={field} onChange={handleTypeFiliereChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5 :bg-gray-700" required="">
                            <option>Selectionner votre filière</option>
                            {filiereSelect.length !== 0 && 
                                filiereSelect.map(filiereSelect =>{
                                    return <option key={filiereSelect._id} value={filiereSelect._id}>{filiereSelect.fieldName}</option>
                                })
                            }
                        </select>
                    </div>
                    
                    </>
                    
                    }
                    
                    <div>
                        <label htmlFor="email" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="nom@domain.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-left text-sm font-medium text-gray-900 ">Password</label>
                        <input type={showPassword?"text":"password"} value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 " required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="showpassword" aria-describedby="showpassword" onChange={handleVisiblePassword}  type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 " />
                            </div>
                            <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-16 sm:flex-row ml-3 text-sm">
                                <label htmlFor="showpassword" className="text-gray-500 ">Afficher mot de passe</label>
                                <Link to="#" className="text-sm font-medium text-teal-600 hover:underline ">Mot de passe oublier ?</Link>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Se connecter</button>
                    <p className="text-sm font-light text-gray-500 ">
                       Avez vous un compte ? <Link to="/userChoice" className="font-medium text-primary-600 hover:underline">Connectez vous!</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
    {loading && <Loader />}
    <ToastContainer/>
    </section>
    )
}