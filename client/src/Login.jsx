import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from "react";
import axios from "axios";
import DisplayUsers from './DisplayUsers';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: false,
        password: false
    });
    const [loginError, setLoginError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (storedUser) {
            setUsername(storedUser.username || ''); // Use an empty string if undefined
            setPassword(storedUser.password || ''); // Use an empty string if undefined
        }
    }, []);

    const handleValidation = () => {
        let isValid = true;
        let newErrors = {
            username: false,
            password: false
        };

        if (!username.trim()) {
            newErrors.username = true;
            isValid = false;
        }

        if (password.length < 6) {
            newErrors.password = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!handleValidation()) {
            console.log("Validation failed, errors set:", errors);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userData', JSON.stringify({ username }));
                console.log("Login successful");
                alert("Login successful!");
                setIsLoggedIn(true);
                navigate('/display-users');
            }
        } catch (error) {
            setLoginError("Invalid username or password");
            console.error("Login error:", error);
        }
    };
    

    if (isLoggedIn) {
        return <DisplayUsers />;
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-yellow-200">
            <form action="" className="min-w-96 border-2 border-indigo-200-400 rounded-lg overflow-hidden p-4 bg-white">
                <div className="title text-3xl text-center text-neutral-800 bg-gray-200 font-bold mb-10 p-4 rounded-md">
                    <h2>Login</h2>
                </div>
                <div className="content">
                    <div className="username mb-4">
                        <label htmlFor="username" className="text-xl tracking-wider text-neutral-600">
                            Username <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            id="username"
                            value={username || ''} // Ensure value is always a string
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.username ? 'border-red-400' : ''}`}
                        />
                        {errors.username && (
                            <p className="flex items-center justify-start text-red-400">
                                <ExclamationCircleIcon className="w-5 h-5 mt-1 mr-1" />Username is required
                            </p>
                        )}
                    </div>
                    <div className="password mb-4">
                        <label htmlFor="password" className="text-xl tracking-wider text-neutral-600">
                            Password <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            id="password"
                            value={password || ''} // Ensure value is always a string
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.password ? 'border-red-400' : ''}`}
                        />
                        {errors.password && (
                            <p className="flex items-center justify-start text-red-400">
                                <ExclamationCircleIcon className="w-5 h-5 mt-1 mr-1" />Password must be at least 6 characters
                            </p>
                        )}
                    </div>
                    {loginError && (
                        <div className="text-center text-red-500 mb-4">{loginError}</div>
                    )}
                    <div className="para mb-4">
                        <p className="text-neutral-600">Don't have an account?
                            <span className="text-blue-500 ml-1 hover:underline">
                                <Link to="/register">Sign up</Link>
                            </span>
                        </p>
                        <p className="text-blue-500 mt-1">
                            <Link to="/forgot-password" className="hover:underline">Forgot password?</Link>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-green-400 p-2 rounded-md text-white text-1xl font-mono font-semibold hover:outline outline-offset-1 outline-green-200"
                    >
                        Log in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
