import  { useEffect, useState } from 'react';
import axiosInstance from '../axios/axiosInstance';
import { Outlet, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

function AuthGuard() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await axiosInstance.get('/api/protected');
                if (response.status === 200) {
                    setIsAuthorized(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthorization();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        console.error('Error checking authorization:', error);
        return <div>An error occurred. Please try again later.</div>;
    }

    if (!isAuthorized) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

export default AuthGuard;
