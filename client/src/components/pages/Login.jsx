import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../global/Auth.js';
export default function Login({title}){

    const navigate = useNavigate();
    const {setUser} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //validation errors states:
    const [validateEmail, setValidateEmail] = useState([]);
    const [validatePassword, setValidatePassword] = useState([]);
    const [validateCredentials, setValidateCredentials] = useState("");

    const loginUser = async (e) => {
        
        setValidateEmail([]);
        setValidatePassword([]);
        setValidateCredentials("");
        e.preventDefault();
        const response = await api.post("adminLogin", JSON.stringify({email, password}));
    
        if(response.status === 422){
          setValidateEmail(response.data.message.email || []);
          setValidatePassword(response.data.message.password || []);
        } else if (response.status === 401) {
          setValidateCredentials(response.data.message);
        } else if (response.status === 200) {
          setUser(response.data.data.user);
          window.localStorage.setItem("auth", JSON.stringify(true));
          navigate("/");
    
        }
        
      }

    return(
        <section className="bg-gray-50   h-svh pt-4">
        <div className="flex flex-col items-center justify-center px-8 py-10 mx-auto  lg:py-0 my-4">
            <a href="/" className="flex text-teal-600  items-center mb-6 text-3xl font-semibold text-gray-900 ">
                Logo  
            </a>
            <div className="w-full  bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {title}
                    </h1>
                    <form className="space-y-4 md:space-y-6" >
                        <div>
                            <label htmlFor="email" className="block mb-2  text-left text-sm font-medium text-gray-900 ">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-teal-600 block w-full p-2.5 :bg-gray-700 " placeholder="nom@domain.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-left text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 " required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 " required=""/>
                                </div>
                                <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-16 sm:flex-row ml-3 text-sm">
                                    <label htmlFor="showpassword" className="text-gray-500 ">Afficher mot de passe</label>
                                    <a href="#" className="text-sm font-medium text-teal-600 hover:underline ">Mot de passe oublier ?</a>
                                </div>
                            </div>
                        </div>
                        <button type="submit"  onClick={loginUser} className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Se connecter</button>
                        <p className="text-sm font-light text-gray-500 ">
                            Vous n'avez pas encore un compte ? <a href="/signUp" className="font-medium text-primary-600 hover:underline">Inscrivez vous!</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}