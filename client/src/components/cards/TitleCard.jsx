export default function TitleCard({title}){
    return(
        <div className="flex justify-between p-2 text-left w-full bg-white p-6 shadow">
            <div>
              <div className="text-2xl font-bold text-gray-800 uppercase">{title}</div>
              <div className="font-semibold text-gray-400">Espace {title}</div>
            </div>
        </div>
    );
}