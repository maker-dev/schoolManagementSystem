import { ToastContainer } from "react-toastify";
import Loader from "../../ui/Loader";
import TitleCard from "../../cards/TitleCard";
import SideBar from "../../ui/SideBar";
import NavBar from "../../ui/NavBar";

export default function AdminProfile(){

    return(
        <div className="flex flex-col h-screen">
            <div className="">
                <NavBar />
            </div>
            <div className="flex">
                <div className="h-screen w-1/5 shadow-md hidden md:block overflow-y-auto">
                    <SideBar />
                </div>
                <div className="flex flex-col gap-4 h-screen bg-gray-100 md:w-4/5 w-full overflow-y-auto">
                    <div className="mx-0 md:mx-6 mt-6">
                        <TitleCard title={"Profile Admin"}></TitleCard>
                    </div>
                    <div className="mx-0 md:mx-6 mt-6 flex justify-center items-center  bg-gray-100 my-6 ">
                    <div className=" w-full bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl text-gray-600 bg-gray-100 p-4 font-bold mb-6">General information</h2>
                        <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">First Name</span>
                            <input type="text" className="mt-1 block w-full p-2 border bg-gray-100  border-gray-300 rounded-md" placeholder="Bonnie" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Last Name</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Green" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Country</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="United States" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">City</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. San Francisco" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Address</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. California" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Email</span>
                            <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="example@company.com" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Phone Number</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. +(12)3456 789" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Birthday</span>
                            <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Organization</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Company Name" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Role</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="React Developer" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700">Department</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Development" />
                            </div>
                            <div>
                            <span className="block text-sm font-medium text-gray-700 text-left">Zip/postal code</span>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="123456" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Save all</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            {/* {loading && <Loader />} */}
            <ToastContainer />
        </div>
    )
}