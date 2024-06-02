export default function ShowList({array, deleteEvent}){

    
    return(
    <div className="border bg-gray-50  p-2">
        <ul>
            <li className="text-left text-md">Vous avez selectionner:</li>
            <div>
                {array.length !== 0 &&
                array.map( item => {
                    
                                return <li
                                        className="text-sm p-2 hover:bg-gray-100  cursor-pointer text-left"
                                        onDoubleClick={(deleteEvent!== undefined?()=>deleteEvent(item[Object.keys(item)[0]]):()=>{return})}
                                        key={item[Object.keys(item)[0]]}>{item[Object.keys(item)[1]]}</li>
                                 })
                                        
                }
                {
                    array.length === 0 &&
                    <li className="text-sm p-2 font-bold text-left text-red-600">Rien</li>
                }
            </div> 
        </ul>
    </div>
    )
}