import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const isAuth = JSON.parse(localStorage.getItem('Auth') || "false");
    const role = window.localStorage.getItem('role');
    function HandleLogOut(e) {
        e.preventDefault()
        localStorage.removeItem('Auth'); 
        localStorage.removeItem('username')
        navigate('/home')
        window.location.reload()
    }
    return (
        <div className="relative">
            <nav className="bg-light px-4 py-4 tracking-wider mx-4 flex flex-wrap justify-between items-center transition-transform duration-300 hover:-translate-y-1">
                <Link className="text-2xl md:text-3xl text-red-600 font-bold" to="/">CheckInSync</Link>
                {!isAuth ? <Link to="/login">
                    <button className="border border-transparent hover:border-gray-300 hover:shadow-md cursor-pointer p-2 rounded-lg transition-all duration-300">
                        Login
                    </button>
                </Link> :
                    <div className='flex gap-2'>
                        <Link to="/profile">
                            <button className="border border-transparent hover:border-gray-300 hover:shadow-md cursor-pointer p-2 rounded-lg transition-all duration-300">
                                Profile
                            </button>
                        </Link>
                        <button className="border border-transparent hover:border-gray-300 hover:shadow-md cursor-pointer p-2 rounded-lg transition-all duration-300" onClick={(e)=>HandleLogOut(e)}>
                            logout
                        </button>
                    </div>
                }
            </nav>

            <div className="flex flex-wrap gap-3 md:gap-5 px-4 bg-gray-200 text-black py-2 transition-transform duration-300 hover:-translate-y-1 md:justify-start justify-center">
                <Link className="hover:bg-black hover:text-white transition-all duration-500 rounded-lg px-3 py-1 text-sm md:text-base" to="/attendencelist">Attendance List</Link>
                <Link className="hover:bg-black hover:text-white transition-all duration-500 rounded-lg px-3 py-1 text-sm md:text-base" to="/individual">Individual List</Link>
                {/* {role === "Admin" ? <Link className="hover:bg-black hover:text-white transition-all duration-500 rounded-lg px-3 py-1 text-sm md:text-base" to="/admin">Admin</Link> : ""} */}
            </div>
        </div>
    )
}
