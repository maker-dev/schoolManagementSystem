import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from "../../api/apiToken";
import Loader from "../ui/Loader";
import { error, info } from "../../helpers/Alerts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPasswordPage() {
  const location = useLocation();
  const { email, role } = location.state || {}; // Destructure email and role from location.state
  const [newEmail, setNewEmail] = useState(email);
  const [loading, setLoading] = useState(false);

  const handleReasendEmail = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post("forgotPassword", { email:newEmail , role });
      if (response.status === 200) {
        info("Email renvoyé, verifier votre boite email!");
      }else if (response.status === 400 || response.status === 404){
        error("Aucun utilisateur n'a été trouvé");
      }else{
        error("Erreur!");
      }
    } catch (e) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 w-full h-screen pt-20">
      <div className="max-w-md mx-auto border mt-20">
        <form className="bg-white shadow-md rounded px-8 py-6">
          <div className="mb-6">
            <span className="block text-gray-700 text-lg font-bold mb-4" >Mot de passe oublier, {role === "Student" && <span>Etudiant</span>} {role === "Teacher" && <span>Professeur</span>} {role === "Admin" && <span>Admin</span>}:</span>
            <span className="block text-gray-700 text-lg text-left font-bold " >Email</span>
            <input 
              className="shadow bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newEmail}
              onChange={(e)=>setNewEmail(e.target.value)}
              autoComplete='on'
              id="verify"
              type="text"
              placeholder="Entrer votre e-mail"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={handleReasendEmail}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Renvoyer l'email
            </button>
          </div>
          {loading && <Loader />}
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
