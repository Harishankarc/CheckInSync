import Navbar from "../components/navbar";

export default function AttendenceList() {
    return (
        <>
            <div className="absolute top-0 w-screen">
                <Navbar />
            </div>
            <div className="flex justify-center items-center min-h-screen font-light px-2 pt-25 md:pt-0">
                <div className="w-full sm:w-[90%] md:w-[70%] bg-white rounded-xl shadow-lg shadow-gray-700 md:mt-10 text-black p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                        <p className="font-light text-lg sm:text-xl">Attendance List</p>
                        <input 
                            type="date" 
                            className="focus:outline-none font-light text-gray-600 border border-gray-300 p-2 rounded-md w-full sm:w-auto"
                        />
                    </div>
                    
                    <hr className="border-gray-400 mb-4"/>

                    <div className="flex flex-col sm:flex-row gap-5 items-center mb-5 p-4 bg-gray-100 rounded-lg shadow-md ">
                        <div className="w-full sm:w-auto text-center sm:text-left md:border-r-1 md:border-gray-400 md:pr-5 border-b-1 md:border-b-0 border-gray-400 pb-4">
                            <p className="font-light text-gray-600 text-lg">Total Attendance</p>
                            <p className="font-light text-2xl">82%</p>
                        </div>
                        <div className="w-full sm:w-auto text-center sm:text-left md:border-r-1 md:border-gray-400 md:pr-5">
                            <p className="font-light text-gray-600 text-lg">Today's Attendance</p>
                            <p className="font-light text-2xl">90%</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto max-h-72 shadow-xl shadow-gray-200 rounded-lg">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-gray-900">
                                    <th className="p-3 text-left font-light">Roll No</th>
                                    <th className="p-3 text-left font-light">Name</th>
                                    <th className="p-3 text-left font-light">Time</th>
                                    <th className="p-3 text-left font-light">Date</th>
                                    <th className="p-3 text-left font-light">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="p-3 text-gray-600">1</td>
                                    <td className="p-3 text-gray-600">Harishankar</td>
                                    <td className="p-3 text-gray-600">12:00 PM</td>
                                    <td className="p-3 text-gray-600">01/01/2023</td>
                                    <td className="p-3 text-green-600 font-light">Present</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-3 text-gray-600">2</td>
                                    <td className="p-3 text-gray-600">Arjun</td>
                                    <td className="p-3 text-gray-600">12:30 PM</td>
                                    <td className="p-3 text-gray-600">01/01/2023</td>
                                    <td className="p-3 text-red-600 font-light">Absent</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
