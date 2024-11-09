import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DisplayUsers() {
    const [latestUser, setLatestUser] = useState(null);
    const [shouldShowUser, setShouldShowUser] = useState(false);
    const navigate = useNavigate(); // Initialize navigate for redirection

    useEffect(() => {
        const fetchLatestUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users'); // Ensure this endpoint exists and returns registered users only
                const data = await response.json();
                
                if (data.length > 0) {
                    const fetchedUser = data[data.length - 1]; // Assuming the last user in the list is the most recently registered
                    setLatestUser(fetchedUser);
                    setShouldShowUser(true);
                } else {
                    setShouldShowUser(false); // No users to display
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchLatestUser();
    }, []);

    // Logout function to clear user data and navigate to the login page
    const handleLogout = () => {
        localStorage.removeItem('lastRegisteredUser'); // Clear user data from localStorage
        alert('You have been logged out.');
        navigate('/login'); // Redirect to the login page
    };

    return (
        shouldShowUser && latestUser ? (
            <div className='w-screen h-screen bg-amber-50'>
                <div className="w-screen h-20 header flex items-center justify-between bg-neutral-700 text-white px-6 py-6">
                    <h2 className='text-3xl font-bold'>Registered User</h2>
                    <button 
                        type="button" 
                        onClick={handleLogout} // Call the logout function on button click
                        className='w-32 tracking-wide bg-red-400 hover:outline hover:outline-red-200 font-mono p-3 rounded-md'
                    >
                        Logout
                    </button>
                </div>
                <div className='flex items-center justify-center' style={{width: '100%', height: '90%'}}>
                    <div className="user-name mb-2">
                        <h1 className='text-6xl text-center text-neutral-900 font-bold mb-4'>Welcome!!</h1>
                        <p className='font-mono text-2xl text-yellow-400 bg-yellow-100 p-2 rounded-md text-center'>{latestUser.username}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="text-center text-red-500">
                No registered users to display.
            </div>
        )
    );
}

export default DisplayUsers;
