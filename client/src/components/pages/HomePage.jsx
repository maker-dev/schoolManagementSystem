import { Link } from 'react-router-dom';
import background from '../../assets/images/backgroundss.jpg';

export default function HomePage(){

  return(
    <div className="relative h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenue Dans Notre Ecole.</h1>
        <p className="text-lg text-gray-600 mb-4">Application Web Pour Simplifiée La Gestion Scolaire.</p>
        <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-10 '>
          <Link to="/userChoice" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded">Se connecter</Link>
          <Link to="/signUp" className="bg-transparent border-teal-700 border border-2 hover:text-teal-900 hover:border-teal-800 text-teal-700 font-bold py-2 px-4 rounded">Inscription</Link>
        </div>
        
      </div>
    </div>
  );
}
