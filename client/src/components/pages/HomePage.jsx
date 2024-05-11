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
        <a href="" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Se connecter</a>
      </div>
    </div>
  );
}
