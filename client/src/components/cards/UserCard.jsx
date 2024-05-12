export default function UserCard({icon , user, desc, link}){
    return(
        <div className="p-4 max-w-sm">
        <div className="flex rounded-lg h-full bg-gray-800  p-8 flex-col">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 mr-3 fill-white inline-flex items-center justify-center rounded-full  bg-indigo-500 text-white flex-shrink-0">
                    <img  alt="" src={icon} />
                </div>
                <h2 className="text-white dark:text-white text-lg font-medium">{user}</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-white dark:text-gray-300">
                {desc}
                </p>
                <a href={link} className="mt-3 text-white cursor-pointer hover:text-blue-600 inline-flex items-center">Se connecter
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    )
}