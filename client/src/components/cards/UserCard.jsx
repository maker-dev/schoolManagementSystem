import { Link } from "react-router-dom";

export default function UserCard({ icon, user, desc, link }) {
    return (
        <div className="p-6 max-w-sm">
            <div className="flex rounded-lg h-full bg-gray-800 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-12 h-12 mr-3 inline-flex items-center justify-center rounded-full bg-teal-500 text-white flex-shrink-0">
                        <div className="text-xl">
                            {icon}
                        </div>
                    </div>
                    <h2 className="text-white text-lg font-medium">{user}</h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                    <p className="leading-relaxed text-base text-white">
                        {desc}
                    </p>
                    <Link to={link} className="mt-3 text-white cursor-pointer hover:text-teal-600 inline-flex items-center">
                        Se connecter
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
