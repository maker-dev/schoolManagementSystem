import { useState } from "react"

export default function SignUp(){

    
    const [isTeacher, setIsTeacher] = useState(false);
    const [roleTitle, setRoleTitle] = useState(isTeacher?"Professeur":"Etudiant");
    const [showPassword, setShowPassword] = useState(false);

    const handleVisiblePassword = () =>{
        setShowPassword(showPassword?false:true);
    }
    
    const handleChange = (e) => {
        if(e.target.value == "professeur"){
            setIsTeacher(true);
            setRoleTitle("Professeur");
        }
        else{
            setIsTeacher(false);
            setRoleTitle("Etudiant");
        } 
    }
    return(
        <section className="bg-gray-50 h-full p-8">
        
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 my-4">
        <a href="/" className="flex text-teal-600  items-center mb-6 text-3xl font-semibold text-gray-900 ">
            Logo  
        </a>
        <div className="w-full  bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                     {roleTitle}
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="role" className="block mb-2 text-left text-sm font-medium text-gray-900">Etes vous ?</label>
                        <select name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5 :bg-gray-700" onChange={handleChange} required="">
                            <option value="">Selectionner votre situation</option>
                            <option value="professeur" defaultValue={isTeacher} >Professeur</option>
                            <option value="etudiant" defaultValue={!isTeacher}>Etudiant</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nom" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Nom</label>
                        <input type="text" name="nom" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="nom" required=""/>
                    </div>
                    <div>
                        <label htmlFor="prenom" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Prénom</label>
                        <input type="text" name="prenom" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="prenom" required=""/>
                    </div>
                    {!isTeacher && 
                    // Etudiant Info form
                    <>
                    <div>
                        <label htmlFor="tel" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Numero de téléphone</label>
                        <input type="text" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="0612345678" required=""/>
                    </div>
                    <div>
                        <label htmlFor="filiere" className="block mb-2 text-left text-sm font-medium text-gray-900">Filière</label>
                        <select name="filiere" id="filiere" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5 :bg-gray-700" onChange={handleChange} required="">
                            <option value="">Selectionner votre filière</option>
                            <option value="professeur">Professeur</option>
                            <option value="etudiant" >Etudiant</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bac" className="block mb-2 text-left text-sm font-medium text-gray-900">Type de bac</label>
                        <select name="bac" id="bac" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5 :bg-gray-700" onChange={handleChange} required="">
                            <option value="">Selectionner type de bac</option>
                            <option value="professeur">Professeur</option>
                            <option value="etudiant" >Etudiant</option>
                        </select>
                    </div>
                    </>
                    
                    }
                    
                    <div>
                        <label htmlFor="email" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="nom@domain.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-left text-sm font-medium text-gray-900 ">Password</label>
                        <input type={showPassword?"text":"password"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 " required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="showpassword" aria-describedby="showpassword" onChange={handleVisiblePassword}  type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 " />
                            </div>
                            <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-16 sm:flex-row ml-3 text-sm">
                                <label htmlFor="showpassword" className="text-gray-500 ">Afficher mot de passe</label>
                                <a href="#" className="text-sm font-medium text-teal-600 hover:underline ">Mot de passe oublier ?</a>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Se connecter</button>
                    <p className="text-sm font-light text-gray-500 ">
                       Avez vous un compte ? <a href="/userChoice" className="font-medium text-primary-600 hover:underline">Connectez vous!</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
    </section>
    )
}