export default function MenuItem({icon , content, link}){
    
    return (

        <li className='p-4 my-2 hover:bg-gray-300'>
            <a href={link} className='flex text-gray-600 space-x-6 font-bold'
            ><img src={icon} alt="icon" /> <span>{content}</span>
            </a>
        </li>

        )
}