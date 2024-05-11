export default function CardInfo({title, number, color, icon}){
   
    return(

    <div className="flex items-center bg-white border rounded-sm  shadow">
        <div className={'p-4 '+color}>
            <img src={icon}  alt="" />
        </div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">{title}</h3>
            <p className="text-3xl">{number}</p>
        </div>
    </div>

    )
}