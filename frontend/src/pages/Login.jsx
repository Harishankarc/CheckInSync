import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate()
    const [useName, setUseName] = useState('');
    const [password, setPassword] = useState('');
    async function HandleOnClick(e){
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/api/auth/login',{
            username : useName,
            password : password
        });
        if(response.data.status === 200){
            localStorage.setItem('username',response.data.token)
            localStorage.setItem('name',response.data.name)
            localStorage.setItem('Auth',true)
            navigate('/')
        }else{
            alert('Invalid username or password')
        }
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen mx-2 md:mx-0">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-white text-black rounded-2xl ">
                    <div className="mx-auto max-w-lg text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
                        <p className="mt-4 text-gray-600">
                        Manage the attendance of students, teachers, and staff <br className="hidden md:block" />
                        easily with one simple website
                        </p>
                    </div>

                    <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#">
                        <div>
                            <label className="sr-only" htmlFor="email">Email</label>
                            <div className="relative">
                                <input
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    id="email"
                                    type="email"
                                    onChange={(e) => setUseName(e.target.value)}
                                    value={useName}
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-6 w-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    placeholder="Enter your password"
                                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-6 w-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        ></path>
                                        <path
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                No account yet?
                                <Link to="/signup" className="underline">Create one</Link>
                            </p>
                            <button
                                className="inline-block rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white focus:outline-none cursor-pointer"
                                type="submit"
                                onClick={(e)=>HandleOnClick(e)}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}