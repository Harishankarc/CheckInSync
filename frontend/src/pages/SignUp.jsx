import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function HandleOnSubmit(e) {
        e.preventDefault(); 

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                name: name.toLowerCase(),
                username: userName,
                password: password
            });

            if (response.status === 200 || response.status === 201) { 
                navigate('/login');
            }else if (response.status === 400) {
                alert('User already exists');
            } else {
                console.error("Signup failed:", response.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-white text-black rounded-2xl shadow-lg">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Sign Up</h1>
                    <p className="mt-4 text-gray-600">
                        Manage the attendance of students, teachers, and staff <br className="hidden md:block" />
                        easily with one simple website.
                    </p>
                </div>

                <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={HandleOnSubmit}>
                    <div>
                        <label className="sr-only" htmlFor="name">Name</label>
                        <div className="relative">
                            <input
                                placeholder="Enter your name"
                                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                id="name"
                                type="text" 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="email">Email</label>
                        <div className="relative">
                            <input
                                placeholder="Enter your email"
                                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                id="email"
                                type="email"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                            />
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
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Have an account?
                            <Link to="/login" className="underline"> Login</Link>
                        </p>
                        <button
                            className="inline-block rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white focus:outline-none cursor-pointer"
                            type="submit"
                        >
                            Sign Up 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
