export default function CardInfo({title, number, color, icon}){
   
    return(

    <div className="flex items-center bg-white border rounded-sm w-full shadow">
        <div className={'h-full p-4 '+color}>
            <img src={icon}  alt=""   />
        </div>
        <div className="px-4 text-gray-700 w-3/4">
            <h3 className="text-sm ">{title}</h3>
            <p className="text-2xl">{number}</p>
        </div>
    </div>

    )
}