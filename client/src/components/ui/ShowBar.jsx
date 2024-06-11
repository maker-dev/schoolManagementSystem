export default function ShowBar({ page, setPage, arrayPagesName }) {
    const style = " p-2 font-bold hover:text-blue-700";
    const styleCondition = " underline decoration-2 decoration-blue-700 text-blue-700 underline-offset-8";
    const styleFalse = " text-gray-500";
    
    return (
        <div className="w-full bg-white p-4 shadow-md">
            {arrayPagesName.length !== 0 && 
                <div>
                    {arrayPagesName.map((pageName, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setPage(pageName)}
                                name={pageName}
                                id={pageName}
                                className={((page === pageName) ? styleCondition : styleFalse) + style}
                            >
                                {pageName}
                            </button>
                        );
                    })}
                </div>
            }
        </div>
    );
}
