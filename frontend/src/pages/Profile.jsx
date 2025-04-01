import Navbar from "../components/navbar";
import { IoPersonSharp } from "react-icons/io5";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import emailjs from 'emailjs-com';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profile() {
    const name = window.localStorage.getItem('name');
    const email = window.localStorage.getItem('username');
    const [chartSubdata, setChartSubdata] = useState({});
    const [attendancelist, setAttendancelist] = useState([]);
    const [lowattendance, setLowattendance] = useState([]);
    const [selectedSub, setSelectedSub] = useState("MP");
    const [selectedHour, setSelectedHour] = useState("1");
    const [notifiedStudents, setNotifiedStudents] = useState([]);
    const role = window.localStorage.getItem('role');

    async function fetchAdminData(){
        const response = await axios.post('http://localhost:5000/api/auth/profile/admin', {
            sub : selectedSub,
            hour : selectedHour
        })
        console.log(response.data.data)
        setLowattendance(response.data.data)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/profile', {
                    name: name,
                });
                setChartSubdata(response.data.data);
            } catch (e) {
                console.log(e);
            }
        }
        async function fetchData2() {
            const response = await axios.post('http://localhost:5000/api/auth/profile/recent', {
                name: name,
            })
            setAttendancelist(response.data.data)
        }
        
        fetchData2()
        fetchData()
    }, [])

    const chartData = {
        labels: ["MP", "OS", "MATHS", "UHV", "DCN", "DBMS"],
        datasets: [
            {
                data: [chartSubdata.MP, chartSubdata.OS, chartSubdata.MATHS, chartSubdata.UHV, chartSubdata.DCN, chartSubdata.DBMS],
                backgroundColor: [
                    '#8B5CF6',
                    '#EC4899',
                    '#FBBF24',
                    '#10B981',
                    '#3B82F6',
                    '#EF4444',
                ],
                borderColor: [
                    '#6D28D9',
                    '#DB2777',
                    '#F59E0B',
                    '#16A34A',
                    '#2563EB',
                    '#DC2626',
                ],
                borderWidth: 1,
            },
        ],
    };

    function HandleNotify(email, studname) {
        const serviceID = "service_ji02837";
        const templateID = "template_e0yotq3";
        const userID = "ZbKzwUS3rswC5qNzD";
    
        emailjs.send(serviceID, templateID, {
            to_email: email,
            name: "From " + name,
            message: `Dear ${studname}, your attendance is low for ${selectedSub}. Please improve your attendance.`,
        }, userID)
        .then(response => {
            console.log("Email sent successfully:", response);
            alert("Notification sent successfully!");
            setNotifiedStudents(prev => [...prev, email]);
        })
        .catch(error => {
            console.error("Error sending email:", error);
        });
    }

    return (
        <>
            <div className="absolute top-0 w-screen">
                <Navbar />
            </div>
            <div className="flex items-start gap-4 px-4 text-center pt-52 h-screen">
                <div className="flex flex-col justify-between h-auto w-4/10 items-center px-4">
                    <div className="rounded-xl shadow-lg bg-white w-full">
                        <div className="h-24 w-full bg-red-600 rounded-xl"></div>
                        <div className="top-16 z-10 flex items-center flex-col gap-4 px-5 py-5">
                            <div className="-mt-15">
                                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <IoPersonSharp size={40} color="black" />
                                </div>
                            </div>
                            <div className="text-4xl text-black font-medium">{name.toUpperCase()}</div>
                            <div className="text-lg text-gray-500">{email}</div>
                        </div>
                    </div>
                    {role === "Student" ? <div className="mt-6 flex flex-col ">
                        <h2 className="text-2xl font-medium mb-4 text-white text-center">Attendance</h2>
                        <div className="bg-transparent p-4 rounded-lg shadow-lg">
                            <Doughnut
                                data={chartData}
                                options={{
                                    cutout: '70%',
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div> : <div className="mt-6 flex flex-col gap-5">
                    <h2 className="text-2xl font-medium mb-4 text-white text-center">Choose Subject</h2>
                    <select onChange={(e) => setSelectedSub(e.target.value)} name="" id="" className="focus:outline-none font-light text-gray-600 border border-gray-300 p-2 rounded-md w-full sm:w-auto bg-white">
                            <option value="" disabled>Select Sub</option>
                            <option value="MP">MP</option>
                            <option value="OS">OS</option>
                            <option value="MATHS">MATHS</option>
                            <option value="UHV">UHV</option>
                            <option value="DCN">DCN</option>
                            <option value="DBMS">DBMS</option>
                    </select>
                    <div className="flex gap-2">
                    <input type="number" onChange={(e)=>setSelectedHour(e.target.value)} className="focus:outline-none font-light text-gray-600 border border-gray-300 p-2 rounded-md w-full sm:w-auto bg-white" placeholder="total hours completed"/>
                    <CiSearch size={40} className="cursor-pointer" onClick={()=>fetchAdminData()}/>
                    </div>
                    </div>
                    }
                </div>

                {role === "Student" ? <div className="w-full">
                    <p className="text-2xl font-medium mb-5">Recent Attendance</p>
                    <div className="overflow-x-auto max-h-72 shadow-lg shadow-gray-500 rounded-lg w-full">

                        {attendancelist && attendancelist.length > 0 ? (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-900">
                                        <th className="p-3 text-center font-light">Name</th>
                                        <th className="p-3 text-center font-light">Time</th>
                                        <th className="p-3 text-center font-light">Date</th>
                                        <th className="p-3 text-center font-light">Subject</th>
                                        <th className="p-3 text-center font-light">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendancelist.map((attendence, index) => (
                                        <tr className="border-b border-gray-300 bg-gray-300" key={index}>
                                            <td className="p-3 text-gray-600">{(attendence.name).toUpperCase()}</td>
                                            <td className="p-3 text-gray-600">{(attendence.time).slice(0, 5)}</td>
                                            <td className="p-3 text-gray-600">{attendence.date}</td>
                                            <td className="p-3 text-gray-600">{attendence.sub}</td>
                                            <td className={`p-3 font-light ${attendence.por === 'Present' ? "text-green-600" : "text-red-600"}`}>
                                                {attendence.por}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-white text-center mt-10 text-2xl mb-10">No Data Found</div>
                        )}
                    </div>
                </div> : <div className="w-full">
                    <p className="text-2xl font-medium mb-5">Students with low attendance</p>
                    <div className="overflow-x-auto max-h-72 shadow-lg shadow-gray-500 rounded-lg w-full bg-white">

                        {lowattendance && lowattendance.length > 0 ? (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-900">
                                        <th className="p-3 text-center font-light">Name</th>
                                        <th className="p-3 text-center font-light">Subject</th>
                                        <th className="p-3 text-center font-light">Notify</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowattendance.map((attendence, index) => (
                                        <tr className={`border-b border-gray-300 ${notifiedStudents.includes(attendence.email) ? "bg-green-300" : "bg-gray-300"}`} key={index}>
                                            <td className="p-3 text-gray-600">{(attendence.name).toUpperCase()}</td>
                                            <td className="p-3 text-gray-600">{attendence.sub}</td>
                                            <td className="p-3 text-gray-600">
                                                <button className="cursor-pointer bg-black p-2 rounded-lg text-white hover:scale-105 transition-all duration-300"
                                                    onClick={() => HandleNotify(attendence.email, attendence.name)}>
                                                    Notify
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-black text-center mt-10 text-2xl mb-10">No Data Found</div>
                        )}
                    </div>
                </div>}

            </div>
        </>
    );
}
