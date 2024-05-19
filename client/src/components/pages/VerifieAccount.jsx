import api from "../../api/api";

export default function VerifieAccount({ email, role}){
    
   const handleReasendEmail = async (e) => {
            
            e.preventDefault();
            try{
                const response = await api.post("resendEmail",{email,role});
                if(response.status === 200){
                    alert("Email sent");
                }
            }
            catch(e){
                console.log("Error");
            }
   }
    
    return(
       <div className="bg-gray-50 w-full h-screen pt-20">
        <div className="max-w-md mx-auto   border mt-20">
                <form className="bg-white shadow-md rounded px-8 py-6">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-bold mb-4" htmlFor="verify">Verification du compte:</label>
                        <input className="shadow bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        readOnly
                        id="verify"
                        type="text"
                        placeholder="Entrer votre e-mail"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-red-700 text-xs font-bold mb-4" htmlFor="verify">Verifier votre boite e-mail, un mail de verification sera envoyer. (la duree d'expiration est: 20 mins)</label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                        onClick={handleReasendEmail}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        >
                            Renvoyer l'email
                        </button>
                    </div>
                </form>
        </div>
       </div>
        
        
    );
}