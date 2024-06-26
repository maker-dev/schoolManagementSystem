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

    //handle the visibility of password:
    const handleVisiblePassword = () =>{
        setShowPassword(showPassword?false:true);
    }
    //hanlding changing bac
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
        try{
            response = await api.post("studentRegister", JSON.stringify({ firstName, lastName, tel, typeOfBac, field, email, password }));
    
          if(response.status === 401){
            console.log(response.data.message);
          }
          if ( response.status === 400) {
            
            let arrErrors = [];
            for(let i = 0; i<response.data.errors.length; i++){
                arrErrors.push({key: i, msg: response.data.errors[i].msg});
            }
            setValidateCredentials(arrErrors);
            error("Erreur:Validation des champs!");

          } else if (response.status === 200) {
            info("Verifier votre compte!");
            setRequiresVerification(true);
          }else{
            error("Erreur!");
          }
        }catch(error){
            error(error);
            setLoading(false);
        }
        setLoading(false);
          
          
      }
    
      if(requiresVerification){
        return <VerifieAccount email={email} role="Student"/>;
      }


    return(
        <section className="bg-teal-600 min-h-dvh">
        
        <div className="flex flex-col items-center justify-center mx-auto py-8 px-6">
        <Link to="/" className="flex  text-white items-center mb-6 text-3xl font-semibold  ">
            UNIVERTECH  
        </Link>
        <div className="w-full bg-gray-800 rounded-lg shadow md:mt-0 sm:max-w-lg md:p-0 px-6 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                     Etudiant
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                        {ValidateCredentials.length !== 0 &&
                        <div className='border-red-500 border-4 rounded-md text-red-500 md:p-2 p-2 text-xl font-bold'>Please Correct the following :
                            <ul className='list-disc md:px-20 px-8 text-sm font-normal'>
                            { ValidateCredentials.map(item => (
                                
                                // Use the item's ID as the key for efficient rendering
                                <li key={item.key}>{item.msg}</li>
                            ))}
                            </ul>
                        </div>
                        }

                    <div>
                        <label htmlFor="nom" className="block mb-2  text-left text-sm font-medium text-white ">Nom</label>
                        <input type="text"
                        value={firstName} 
                        onChange={(e) => setNom(e.target.value)} 
                        name="nom" 
                        id="nom" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="nom" required=""/>
                    </div>
                    <div>
                        <label htmlFor="prenom" className="block mb-2  text-left text-sm font-medium text-white ">Prénom</label>
                        <input type="text" 
                        value={lastName} 
                        onChange={(e) => setPrenom(e.target.value)} 
                        name="prenom" 
                        id="prenom" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="prenom" required=""/>
                    </div>
                    
                    <div>
                        <label htmlFor="tel" className="block mb-2  text-left text-sm font-medium text-white ">Numero de téléphone</label>
                        <input type="text"
                        value={tel} 
                        onChange={(e) => setTel(e.target.value)} 
                        autoComplete="on"
                        name="tel" 
                        id="tel" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="0612345678" required=""/>
                    </div>
                    <div>
                        <label htmlFor="bac" className="block mb-2 text-left text-sm font-medium text-white">Type de bac</label>
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
                        <label htmlFor="filiere" className="block mb-2 text-left text-sm font-medium text-white ">Filière</label>
                        <select name="filiere" id="filiere" value={field} onChange={handleTypeFiliereChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5 :bg-gray-700" required="">
                            <option>Selectionner votre filière</option>
                            {filiereSelect.length !== 0 && 
                                filiereSelect.map(filiereSelect =>{
                                    return <option key={filiereSelect._id} value={filiereSelect._id}>{filiereSelect.fieldName}</option>
                                })
                            }
                        </select>
                    </div>
                    
                    
                    <div>
                        <label htmlFor="email" className="block mb-2  text-left text-sm font-medium text-white ">Email</label>
                        <input type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        name="email" 
                        autoComplete="on"
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="nom@domain.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-left text-sm font-medium text-white ">Password</label>
                        <input type={showPassword?"text":"password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        name="password" 
                        id="password" 
                        autoComplete="on"
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 " required=""/>
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
                    <button onClick={handleSubmit} className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Inscription</button>
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