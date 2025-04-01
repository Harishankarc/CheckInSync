import Navbar from "../components/navbar";
import { IoPersonSharp } from "react-icons/io5";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profile() {
    const name = window.localStorage.getItem('name');
    const email = window.localStorage.getItem('username');
    const [chartSubdata, setChartSubdata] = useState({});

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await axios.post('http://localhost:5000/api/auth/profile',{
                    name: name,
                    
                });
                setChartSubdata(response.data.data);
            }catch(e){
                console.log(e);
            }
        }
        fetchData()
    },[])

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
    

    return (
        <>
            <div className="absolute top-0 w-screen">
                <Navbar />
            </div>
            <div className="flex flex-col items-start gap-4 px-4 text-center pt-52 h-screen">
                <div className="flex flex-col justify-between h-screen w-4/10 items-center px-4">
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
                    <div className="mt-6 flex flex-col ">
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
                    </div>
                </div>
            </div>
        </>
    );
}
