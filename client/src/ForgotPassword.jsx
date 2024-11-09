import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [message, setMessage] = useState('');

    const handleValidation = () => {
        let isValid = true;
        let newErrors = {
            email: false,
            password: false,
            confirmPassword: false,
        };

        if (!email.trim()) {
            newErrors.email = true;
            isValid = false;
        }
        if (password.length < 6) {
            newErrors.password = true;
            isValid = false;
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!handleValidation()) {
            return; // Prevent submission if validation fails
        }

        try {
            const response = await axios.post('http://localhost:5000/api/forgot-password', { email, newPassword: password });
            setMessage('Password updated successfully!');
            console.log('Password update response:', response.data);
            // Redirect to login page after successful password update
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage('User not found with this email.');
            } else {
                setMessage('Failed to update password. Please try again.');
            }
            console.error('Password update error:', error);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-yellow-200">
            <form className="min-w-96 border-2 border-indigo-200 rounded-lg overflow-hidden p-4 bg-white">
                <div className="title text-3xl text-center text-neutral-800 bg-gray-200 font-bold mb-10 p-4 rounded-md">
                    <h2>Forgot Password</h2>
                </div>
                <div className="content">
                    <div className="email mb-4">
                        <label htmlFor="email" className="text-xl tracking-wider text-neutral-600">
                            Email <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.email ? 'border-red-400' : ''}`}
                        />
                        {errors.email && (
                            <p className="flex items-center justify-start text-red-400 mt-1">
                                <ExclamationCircleIcon className="w-5 h-5 mt-1 mr-1" />Email is required
                            </p>
                        )}
                    </div>
                    <div className="password mb-4">
                        <label htmlFor="password" className="text-xl tracking-wider text-neutral-600">
                            Password <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.password ? 'border-red-400' : ''}`}
                        />
                        {errors.password && (
                            <p className="flex items-center justify-start text-red-400 mt-1">
                                <ExclamationCircleIcon className="w-5 h-5 mt-1 mr-1" />Password must be at least 6 characters
                            </p>
                        )}
                    </div>
                    <div className="password mb-4">
                        <label htmlFor="confirmPassword" className="text-xl tracking-wider text-neutral-600">
                            Re-enter Password <span style={{ color: "tomato" }}>*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full border rounded mt-1 p-2 focus:outline-dashed outline-offset-1 outline-slate-300 ${errors.confirmPassword ? 'border-red-400' : ''}`}
                        />
                        {errors.confirmPassword && (
                            <p className="flex items-center justify-start text-red-400 mt-1">
                                <ExclamationCircleIcon className="w-5 h-5 mt-1 mr-1" />Passwords do not match
                            </p>
                        )}
                    </div>
                    {message && (
                        <div className={`text-center mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-green-400 p-2 rounded-md text-white text-1xl font-mono font-semibold hover:outline outline-offset-1 outline-green-200"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
