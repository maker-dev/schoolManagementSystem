import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import api from '../../api/apiToken';
import Loader from "../ui/Loader";
import { error, success } from "../../helpers/Alerts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams(); // Retrieve token from URL parameters

  

  // Handling reset password:
  const handleChangePassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.put(`resetPassword/${resetToken}`, { newPassword });
      if (response.status === 401) {
        error(response.data.message);
        navigate("/userChoice");
      } else if (response.status === 400) {
        for (let i = 0; i < response.data.errors.length; i++) {
          error(response.data.errors[i].msg);
        }
      } else if (response.status === 200) {
        success("Votre mot de passe a été changé!");
        setTimeout(() => navigate("/userChoice"), 2000);
      } else {
        error("Erreur!");
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }

  // Handling password visibility:
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="bg-gray-50 w-full h-screen pt-20">
      <div className="max-w-md mx-auto border mt-20">
        <form className="bg-white shadow-md rounded px-8 py-6">
          <div className="mb-6">
            <span className="block text-gray-700 text-lg font-bold mb-4">Changer votre Mot de passe :</span>
            <span className="block text-gray-700 text-lg text-left font-bold">Mot de passe</span>
            <input 
              className="shadow bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="verify"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
            />
            <div className="mt-2 flex items-center">
              <input 
                type="checkbox" 
                id="show" 
                className="form-checkbox h-4 w-4 text-teal-600" 
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label htmlFor="show" className="ml-2 text-gray-700">Afficher le mot de passe</label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={handleChangePassword}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Changer mot de passe
            </button>
          </div>
          {loading && <Loader />}
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
