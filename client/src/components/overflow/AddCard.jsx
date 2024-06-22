import { useState } from "react";
import Loader from "../ui/Loader";
import AddFiliere from "./field/AddFIliere";
import AddBac from "./bac/AddBac";
import AddSubject from "./subject/AddSubject";
import AddClass from "./class/AddClass";
import AddTeacher from "./professeur/AddTeacher";
import AddAbscence from "./abscence/AddAbscence";

export default function AddCard({ display, eventHide, id, cardName, type, idClass }) {
    const [loading, setLoading] = useState(false);
    const [validateCredentials, setValidateCredentials] = useState([]);

    return (
        <div
            aria-hidden="true"
            className={`${display} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur`}
        >
            <div className="relative w-full max-w-md p-4">
                <div className="relative bg-white rounded-lg shadow max-h-[calc(100vh-1rem)] flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Ajouter {cardName}
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

                    <div className="overflow-y-auto p-4">
                        <form>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {validateCredentials.length !== 0 && (
                                    <div className="col-span-2 bg-red-300 text-red-900 p-4">
                                        <ul className="list-disc pl-20 pr-20">
                                            {validateCredentials.map((item) => (
                                                <li key={item.key}>{item.msg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {cardName === "Filière" && (
                                    <AddFiliere
                                        fieldId={id}
                                        setValidateCredentials={setValidateCredentials}
                                        setLoading={setLoading}
                                        eventHide={eventHide}
                                    />
                                )}
                                {cardName === "Bac" && (
                                    <AddBac
                                        setValidateCredentials={setValidateCredentials}
                                        setLoading={setLoading}
                                        eventHide={eventHide}
                                    />
                                )}
                                {cardName === "Module" && (
                                    <AddSubject
                                        setValidateCredentials={setValidateCredentials}
                                        setLoading={setLoading}
                                        eventHide={eventHide}
                                    />
                                )}
                                {cardName === "Classe" && (
                                    <AddClass
                                        setValidateCredentials={setValidateCredentials}
                                        setLoading={setLoading}
                                        eventHide={eventHide}
                                    />
                                )}
                                {cardName === "Professeur" && (
                                    <AddTeacher
                                        setValidateCredentials={setValidateCredentials}
                                        setLoading={setLoading}
                                        eventHide={eventHide}
                                    />
                                )}
                                {cardName === "Abscence" && (
                                    <AddAbscence
                                        id={id}
                                        idClass={idClass}
                                        type={type}
                                        setValidateCredentials={setValidateCredentials}
                                        setLoading={setLoading}
                                        eventHide={eventHide}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    );
}
