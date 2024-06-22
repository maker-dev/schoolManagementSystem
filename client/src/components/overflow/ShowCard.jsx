import ShowFiliere from "./field/ShowFiliere";
import ShowBac from "./bac/ShowBac";
import ShowSubject from "./subject/ShowSubject";
import ShowTeacher from "./professeur/ShowTeacher";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ShowStudent from "./student/ShowStudent";
import ShowAbscence from "./abscence/ShowAbscence";

export default function ShowCard({ display, eventHide, id, cardName, type }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (cardName === "Classe" && display !== "hidden") {
            navigate("/class/show", { state: { id } });
        }
    }, [cardName, display, navigate, id]);

    const modalWidthClass = cardName === "Abscence" ? "max-w-4xl" : "max-w-md";

    return (
        <>
            {cardName !== "Classe" && (
                <div
                    aria-hidden="true"
                    className={`${display} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur`}
                >
                    <div className={`relative w-full ${modalWidthClass} p-4`}>
                        <div className="relative bg-white rounded-lg shadow max-h-[calc(100vh-1rem)] flex flex-col">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Informations sur {cardName}
                                </h3>
                                <button
                                    onClick={eventHide}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-toggle="crud-modal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>

                            <div className="overflow-y-auto p-4 md:p-5">
                                <form>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        {cardName === "Filière" && (
                                            <ShowFiliere id={id} />
                                        )}
                                        {cardName === "Bac" && (
                                            <ShowBac id={id} />
                                        )}
                                        {cardName === "Module" && (
                                            <ShowSubject id={id} />
                                        )}
                                        {cardName === "Professeur" && (
                                            <ShowTeacher id={id} />
                                        )}
                                        {cardName === "Etudiant" && (
                                            <ShowStudent id={id} eventHide={eventHide}/>
                                        )}
                                        {cardName === "Abscence" && (
                                            <ShowAbscence id={id} eventHide={eventHide} type={type}/>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
