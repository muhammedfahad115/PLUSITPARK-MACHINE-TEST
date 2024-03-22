import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
    const navigate = useNavigate();

    const handleDeletion = async () => {
        const confirmDeletion = window.confirm('Are you sure you want to delete your account?');
    
        if (confirmDeletion) {
            try {
                await toast.promise(
                    axiosInstance.delete('/api/delete'),
                    {
                        pending: 'Deleting user...',
                        success: () => {
                            localStorage.removeItem('token');
                            navigate('/register');
                            return 'User deleted successfully!';
                        },
                        error: (error) => {
                            if (error.response && error.response.status === 400) {
                                return 'User has already been deleted';
                            } else {
                                return 'Error deleting user!';
                            }
                        }
                    }
                );
            } catch (error) {
                console.log('Error during deleting user:', error);
            }
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-10">
                <div>
                    <h1 className="text-lg font-bold bg-yellow-500 rounded-md px-3 py-1 cursor-pointer" onClick={scrollToTop}>Home</h1>
                </div>
                <div>
                    <Link to={'/updateprofile'}>
                        <button className="bg-gray-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none">
                            Update Profile
                        </button>
                    </Link>
                    <button onClick={handleDeletion} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
                        Delete Profile
                    </button>
                </div>
            </header>
        </>
    );
}

export default Header;
