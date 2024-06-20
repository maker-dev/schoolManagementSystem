import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/apiToken';
import Cookies from 'js-cookie';
import VerifieAccount from './VerifieAccount';
import Loader from '../ui/Loader';

export default function Login({ title, apiName, role }) {
  const [loading, setLoading] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateCredentials, setValidateCredentials] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleVisiblePassword = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (e) => {
    setLoading(true);
    setValidateCredentials("");
    e.preventDefault();

    try {
      const response = await api.post(apiName, JSON.stringify({ email, password }));
      if (response.status === 401) {
        console.log("Error authorization");
      } else if (response.status === 400) {
        if (response.data.errors[0].msg === "User Not verified") {
          setRequiresVerification(true);
          return;
        }
        let arrErrors = [];
        for (let i = 0; i < response.data.errors.length; i++) {
          arrErrors.push({ key: i, msg: response.data.errors[i].msg });
        }
        setValidateCredentials(arrErrors);
      } else if (response.status === 200) {
        Cookies.set('token', response.data.token, { sameSite: 'Lax' });
        Cookies.set('userRole', role, { sameSite: 'Lax' });
        navigate(`/${role}/dashboard`);
      }
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
    }
  };

  if (requiresVerification && role === "Teacher") {
    return <VerifieAccount email={email} role={role} />;
  } else if (requiresVerification && role === "Student") {
    return <VerifieAccount email={email} role={role} />;
  }

  return (
    <section className="bg-gray-50 h-lvh">
      <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
        <Link to="/" className="flex mt-10 text-teal-600 items-center mb-6 text-3xl font-semibold text-gray-900">
          Logo
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {title}
            </h1>
            <form className="space-y-4 md:space-y-6">
              {validateCredentials.length !== 0 &&
                <div className='bg-red-300 text-red-900 p-4'>
                  <ul className='list-disc pl-20 pr-20'>
                    {validateCredentials.map(item => (
                      <li key={item.key}>{item.msg}</li>
                    ))}
                  </ul>
                </div>
              }

              <div>
                <label htmlFor="email" className="block mb-2 text-left text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete='on'
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-teal-600 block w-full p-2.5"
                  placeholder="nom@domain.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-left text-sm font-medium text-gray-900">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete='on'
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      onChange={handleVisiblePassword}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300"
                    />
                  </div>
                  <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-16 sm:flex-row ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">Afficher mot de passe</label>
                    <Link 
                      to="/forgetPassword"
                      state= {{email:email, role:role}}
                      className="text-sm font-medium text-teal-600 hover:underline"
                    >
                      Mot de passe oublier ?
                    </Link>
                  </div>
                </div>
              </div>
              <button
                onClick={loginUser}
                className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Se connecter
              </button>
              {role === "Student" && 
                    <p className="text-sm font-light text-gray-500">
                    Vous n'avez pas encore un compte ? <Link to="/signUp" className="font-medium text-primary-600 hover:underline">Inscrivez vous!</Link>
                    </p>
              }
              
            </form>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </section>
  );
}
