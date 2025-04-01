import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AttendenceList() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSub, setSelectedSub] = useState("MP");
    const [attendenceList, setAttendenceList] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/attendence/attendancelist', 
                    { date: selectedDate.toISOString().split('T')[0], sub: selectedSub }
                );
                console.log(response.data.data)
    
                if (Array.isArray(response.data.data)) {
                    setAttendenceList(response.data.data);
                } else {
                    setAttendenceList([]);
                }
            } catch (e) {
                console.log(e);
                setAttendenceList([]);
            }
        }
        fetchData();
    }, [selectedDate,selectedSub]);
    
    function genratePDF() {
        if (!selectedDate) {
            console.error("Selected date is not defined");
            return;
        }
        
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.text("Attendance Report", 14, 15);
        doc.setFontSize(12);
        doc.text(`Subject: ${attendenceList[0]?.sub || "N/A"}`, 14, 25);
        doc.setFontSize(10);
        doc.text(`Date: ${selectedDate.toISOString().split('T')[0]}`, 14, 35);
    
        const tableColumn = ["Roll No", "Name", "Time", "Date", "Status"];
        const tableRows = [];
    
        attendenceList.forEach((row, index) => {
            tableRows.push([
                index + 1,
                row.name,
                row.time?.slice(0, 5) || "N/A",
                row.date,
                row.por
            ]);
        });
    
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 45,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [52, 73, 94] },
        });
    
        doc.save(`Attendance_${selectedDate.toISOString().split('T')[0]}.pdf`);
    }
    
    
    
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
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            value={selectedDate.toISOString().split('T')[0]}
                        />
                        <select onChange={(e) => setSelectedSub(e.target.value)} name="" id="" className="focus:outline-none font-light text-gray-600 border border-gray-300 p-2 rounded-md w-full sm:w-auto">
                            <option value="" disabled>Select Sub</option>
                            <option value="MP">MP</option>
                            <option value="OS">OS</option>
                            <option value="MATHS">MATHS</option>
                            <option value="UHV">UHV</option>
                            <option value="DCN">DCN</option>
                            <option value="DBMS">DBMS</option>
                        </select>
                    </div>

                    <hr className="border-gray-400 mb-4" />

                    <div className="flex flex-col sm:flex-row gap-5 items-center mb-5 p-4 bg-gray-100 rounded-lg shadow-md ">
                        <div className="w-full sm:w-auto text-center sm:text-left md:border-r-1 md:border-gray-400 md:pr-5 border-b-1 md:border-b-0 border-gray-400 md:pb-0 pb-4">
                            <p className="font-light text-gray-600 text-lg">Total Attendance</p>
                            <p className="font-light text-2xl">100%</p>
                        </div>
                        <div className="w-full sm:w-auto text-center sm:text-left md:border-r-1 md:border-gray-400 md:pr-5">
                            <p className="font-light text-gray-600 text-lg">Today's Attendance</p>
                            <p className="font-light text-2xl">{(attendenceList.length/100) * 100}%</p>
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
                                {attendenceList.map((attendence) => {
                                    return (
                                        <tr className="border-b border-gray-300" key={attendence.id}>
                                            <td className="p-3 text-gray-600">{attendence.id}</td>
                                            <td className="p-3 text-gray-600">{attendence.name}</td>
                                            <td className="p-3 text-gray-600">{(attendence.time).slice(0,5)}</td>
                                            <td className="p-3 text-gray-600">{attendence.date}</td>
                                            <td className={`p-3 font-light ${attendence.por === 'Present' ? "text-green-600" : "text-red-600"}`}>
                                                {attendence.por}
                                            </td>
                                        </tr>
                                    );
                                })

                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-end">
                        <button className="border border-gray-400 hover:border-gray-300 hover:shadow-md cursor-pointer p-2 rounded-lg transition-all duration-300 mt-4" onClick={genratePDF}>Generate pdf</button>
                    </div>
                </div>
            </div>
        </>
    );
}
