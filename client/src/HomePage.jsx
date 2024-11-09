import { Link } from "react-router-dom"

function HomePage() {

    return(
        <div className="w-screen h-screen flex items-center justify-center bg-slate-800">
            <div className="w-2/4 bg-gray-50 backdrop:blur p-4 rounded overflow-hidden">
                <h2 className="text-center text-2xl font-bold">Welcome to my MERN project</h2>
                <div className="w-full text-center mt-10 flex space-x-6 justify-center">
                    <Link to="/register">
                        <button type="button" className="min-w-24 font-mono font-semibold text-white bg-blue-400 p-2 rounded-md hover:outline outline-4 outline-offset-1 outline-blue-200">Sign up</button>
                    </Link>
                    <Link to="/login">
                        <button type="button" className="min-w-24 font-mono font-semibold text-white bg-green-400 p-2 rounded-md hover:outline outline-4 outline-offset-1 outline-green-200">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage