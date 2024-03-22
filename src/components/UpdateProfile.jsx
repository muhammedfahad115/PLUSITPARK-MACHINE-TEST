import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';

function UpdateProfile() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [initialUser, setInitialUser] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const response = await axiosInstance.get('/api/users');
            setInitialUser(response.data);
            setName(response.data.name);
            setPassword(response.data.password);
        };
        getUser();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/api/update-user', { name, password });

            if (response.status === 200) {
                setMessage('Profile Updated successfully');
            } else {
                setError('Error during updating the profile')
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 w-[400px] p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Update Profile</h2>
                    <Link to={'/home'}>
                        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            className="w-full border rounded-md px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full border rounded-md px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-gray-700'>{message}</p>
                        <p className='text-red-500'>{error}</p>
                    </div>
                    <br />
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
