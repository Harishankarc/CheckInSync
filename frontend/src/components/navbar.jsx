import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="relative">
            <nav className="bg-light px-4 py-4 tracking-wider mx-4 flex flex-wrap justify-between items-center transition-transform duration-300 hover:-translate-y-1">
                <Link className="text-2xl md:text-3xl text-red-600 font-bold" to="/">CheckInSync</Link>
                <Link to="/">
                    <button className="border border-transparent hover:border-gray-300 hover:shadow-md cursor-pointer p-2 rounded-lg transition-all duration-300">
                        Login
                    </button>
                </Link>
            </nav>

            <div className="flex flex-wrap gap-3 md:gap-5 px-4 bg-gray-200 text-black py-2 transition-transform duration-300 hover:-translate-y-1 md:justify-start justify-center">
                <Link className="hover:bg-black hover:text-white transition-all duration-500 rounded-lg px-3 py-1 text-sm md:text-base" to="/attendencelist">Attendance List</Link>
                <Link className="hover:bg-black hover:text-white transition-all duration-500 rounded-lg px-3 py-1 text-sm md:text-base" to="/attendencelist">CheckIn</Link>
            </div>
        </div>
    )
}
