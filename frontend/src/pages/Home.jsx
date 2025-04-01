import Navbar from "../components/navbar";

export default function Home() {
    return (
        <>
            <div className="absolute top-0 w-screen">
                <Navbar />
            </div>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen px-4 text-center">
                <h1 className="text-5xl sm:text-3xl md:text-5xl lg:text-7xl leading-tight">
                    MANAGE YOUR
                </h1>
                <h1 className="text-5xl sm:text-3xl md:text-5xl lg:text-7xl leading-tight text-red-600">
                    ATTENDANCE
                </h1>
                <h1 className="text-5xl sm:text-3xl md:text-5xl lg:text-7xl leading-tight">
                    WITH <span className="outline-text">CHECKINSYNC</span>
                </h1>
                <p className="text-xl sm:text-sm md:text-lg lg:text-2xl leading-relaxed">
                    Manage the attendance of students, teachers, and staff <br className="hidden md:block" />
                    easily with one simple website <span className="text-red-600 cursor-pointer">CheckInSync</span>
                </p>
            </div>
        </>
    );
}
