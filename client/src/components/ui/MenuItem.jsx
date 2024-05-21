import { Link } from "react-router-dom";

export default function MenuItem({icon , content, link}){
    
    return (

        <li className='py-4 px-2 my-2 hover:bg-gray-300'>
            <Link to={link} className='flex text-gray-600 space-x-4 font-bold lg:text-md md:text-sm text-xs'>
                <img src={icon} className="w-6" alt="icon" /> <span>{content}</span>
            </Link>
        </li>

        )
}