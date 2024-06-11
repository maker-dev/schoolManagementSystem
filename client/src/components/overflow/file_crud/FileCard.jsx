import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from "../../../api/apiToken";
import { error, success } from "../../../helpers/Alerts";
import DeconnectUser from "../../../helpers/DeconnectUser";
import { faUpload, faDownload, faTrash, faSpinner, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

export default function FileCard({ display, eventHide, id, name, cardName, isFileExists, apiArray }) {
    //functionallities:
    const [validateCredentials, setValidateCredentials] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();
    const downloadLinkRef = useRef(null);

    //data:
    const [file, setFile] = useState(null);

    //handling file change:
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        try {
            if (isFileExists) {
                setUpdating(true);
                setTimeout(() => {
                    setUpdating(false);
                }, 1500);
            } else {
                setUploading(true);
                setTimeout(() => {
                    setUploading(false);
                }, 1500);
            }
    
            if (file.type !== "application/pdf") {
                setValidateCredentials([{ key: 1, msg: "Select a PDF file." }]);
                return;
            } else if (file.size > 2 * 1024 * 1024) {
                setValidateCredentials([{ key: 2, msg: "File size should be less than 2MB." }]);
                return;
            }
    
            // Array to hold promises
            const promises = [];
    
            // If file exists, delete it
            if (isFileExists === true) {
                promises.push(api.delete(`${apiArray[2]}/${id}`));
            }
    
            // Upload new file
            const formData = new FormData();
            formData.append("file", file);
            promises.push(api.post(`${apiArray[0]}/${id}`, formData));
    
            // Execute promises concurrently
            const responses = await Promise.all(promises);
    
            // Handle response
            if (responses[responses.length-1].status === 401) {
                DeconnectUser();
                navigate("/");
                error("Error: Authorization error");
            } else if (responses[responses.length-1].status === 200) {
                success("Upload du fichier effectuée!");
                setValidateCredentials("");
                setFile(null);
                eventHide();
            } else {
                error("Error: Une erreur est survenue!");
            }
        } catch (err) {
            error("Error: Une erreur est survenue!");
        }
    };

    
    //handling download event:
    const handleDownload = async () => {
        setDownloading(true);
        setTimeout(() => {
            setDownloading(false);
        }, 1500);
        try {
            const response = await api.get(`${apiArray[1]}/${id}`, { responseType: 'blob' }); // Request file as blob
            if (response.status === 401) {
                DeconnectUser();
                navigate("/");
                error("Error: Authorization error");
            } else if (response.status === 200) {
                const blob = new Blob([response.data], { type: 'application/pdf' }); // Create a Blob from the response data
                const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
                downloadLinkRef.current.href = url; // Set the URL as the link's href
                downloadLinkRef.current.download = `Emploie_du_temps_${name}.pdf`; // Set the download attribute to specify filename
                downloadLinkRef.current.click(); // Programmatically click the link to trigger the download
                window.URL.revokeObjectURL(url); // Revoke the object URL to free up memory
                success("Téléchargement du fichier effectuée!");
            } else {
                error("Error: Une erreur est survenue!");
            }
        } catch (err) {
            error("Error: Une erreur est survenue!");
        }
    };

     

    //handle delete file event:
    const handleDelete = async () => {
        setDeleting(true);
        setTimeout(() => {
            setDeleting(false);
        }, 1500);
        try {
            const response = await api.delete(`${apiArray[2]}/${id}`);
            if (response.status === 401) {
                DeconnectUser();
                navigate("/");
                error("error authorization");
            } else if (response.status === 200) {
                success("Suppression du fichier effectuée!");
                setFile(null);
                eventHide();
            } else {
                error("Error: Une erreur est survenue!");
            }
        } catch (e) {
            error("Error: Une erreur est survenue!");
        }
    };

    return (
        <div aria-hidden="true" className={`${display} backdrop-blur fixed z-50 justify-center items-center w-full h-full inset-0 flex`}>
            <div className="flex flex-col justify-center items-center">
                <div className="relative bg-white rounded-lg shadow w-full max-w-lg">
                    <div className="flex items-center justify-between p-6 md:p-7 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                           Emploie du temps {cardName}
                        </h3>
                        <button
                            onClick={eventHide}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only"></span>
                        </button>
                    </div>
                    <form className="p-6 md:p-7">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <h1 className="font-bold text-lg text-gray-600 bg-gray-100 p-4">{name}</h1>
                            </div>
                            {validateCredentials.length !== 0 &&
                                <div className='col-span-2 bg-red-300 text-red-900 p-4'>
                                    <ul className='list-disc pl-20 pr-20'>
                                        {validateCredentials.map(item => (
                                            <li key={item.key}>{item.msg}</li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            <div className="col-span-2">
                                <span className="block text-sm font-medium text-gray-700 text-left">Gerer le fichier:</span>
                                <input type="file"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="col-span-2 flex flex-col md:flex-row space-y-2 justify-around">
                                {isFileExists === true &&
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleDownload}
                                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                                            disabled={downloading}
                                        >
                                            {downloading ? (
                                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                                            ) : (
                                                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                            )}
                                            {downloading ? "Downloading" : "Download"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleUpload}
                                            className={file ? "flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300" : "cursor-not-allowed flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg transition-colors duration-300"}
                                            disabled={!file || updating}
                                        >
                                            {updating ? (
                                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                                            ) : (
                                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                            )}
                                            {updating ? "Updating" : "Update"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className={"flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"}
                                            disabled={deleting}
                                        >
                                            {deleting ? (
                                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                                            ) : (
                                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                            )}
                                            {deleting ? "Deleting" : "Delete"}
                                        </button>
                                    </>
                                }
                                {isFileExists === false &&
                                    <button
                                        type="button"
                                        onClick={handleUpload}
                                        className={file ? "flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300" : "cursor-not-allowed flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300"}
                                        disabled={!file || uploading}
                                    >
                                        {uploading ? (
                                            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                                        ) : (
                                            <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                        )}
                                        {uploading ? "Uploading" : "Upload"}
                                    </button>
                                }
                            </div>
                        </div>
                    </form>
                    <div className="hidden">
                        <Link ref={downloadLinkRef} target="_blank">Download</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
