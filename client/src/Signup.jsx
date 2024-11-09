import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

function Signup() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false
    });

    const handleValidation = () => {
        let isValid = true;
        let newErrors = {
            username: false,
            email: false,
            password: false
        };

        if (!username.trim()) {
            newErrors.username = true;
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = true;
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
        if (handleValidation()) {
            try {
                const response = await fetch('http://localhost:5000/api/signup', { // Ensure this matches the actual backend endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }), // Sending data to server
                });

                if (response.status === 409) {
                    const data = await response.json();
                    // Handle the error based on the response message
                    if (data.message.includes("Username")) {
                        alert("Username is already taken, please choose another one.");
                    } else if (data.message.includes("Email")) {
                        alert("Email is already registered. Please try another one or log in.");
                    }
                } else if (response.ok) {
                    console.log("User registered successfully");
                    alert("User registered successfully! Redirecting to login page...");
                    localStorage.setItem('lastRegisteredUser', JSON.stringify({ username, email })); // Save user info to localStorage
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setErrors({
                        username: false,
                        email: false,
                        password: false
                    });
                    navigate('/login'); // Navigate to the login page upon successful registration
                } else {
                    console.log("Error registering user");
                    alert("Error registering user. Please try again later.");
                }
            } catch (error) {
                console.log("An error occurred", error);
                alert("An error occurred while registering. Please try again.");
            }
        } else {
            console.log("Validation Failed");
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-yellow-200">
            <form className="min-w-96 border-2 border-indigo-200-400 rounded-lg overflow-hidden p-4 bg-white" method="post">
                <div className="title text-3xl text-neutral-800 text-center bg-gray-200 font-bold mb-10 p-4 rounded-md">
                    <h2>Register</h2>
                </div>
                <div className="content">
                    {/* Input fields */}
                    <div className="username mb-4">
                        <label htmlFor="userName" className="text-xl tracking-wider text-neutral-600">
                            Username <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            id="userName"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.username ? 'border-red-400' : ''}`}
                        />
                        {errors.username && (
                            <p className="flex items-center justify-start text-red-400">
                                <ExclamationCircleIcon className="size-5 mt-1 mr-1" />Invalid username
                            </p>
                        )}
                    </div>
                    {/* Email input */}
                    <div className="email mb-4">
                        <label htmlFor="userEmail" className="text-xl tracking-wider text-neutral-600">
                            Email <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            id="userEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.email ? 'border-red-400' : ''}`}
                        />
                        {errors.email && (
                            <p className="flex items-center justify-start text-red-400">
                                <ExclamationCircleIcon className="size-5 mt-1 mr-1" />Invalid email
                            </p>
                        )}
                    </div>
                    {/* Password input */}
                    <div className="password mb-4">
                        <label htmlFor="userPassword" className="text-xl tracking-wider text-neutral-600">
                            Password <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            id="userPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.password ? 'border-red-400' : ''}`}
                        />
                        {errors.password && (
                            <p className="flex items-center justify-start text-red-400">
                                <ExclamationCircleIcon className="size-5 mt-1 mr-1" />Password must be at least 6 characters
                            </p>
                        )}
                    </div>
                    <div className="para mb-4">
                        <p className="text-neutral-600">Already have an account?
                            <span className="text-blue-500 ml-1 hover:underline">
                                <Link to="/login">Login</Link>
                            </span>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-green-400 p-2 rounded-md text-white text-1xl font-mono font-semibold hover:outline outline-offset-1 outline-green-200"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
