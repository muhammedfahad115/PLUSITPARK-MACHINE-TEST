import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('email:', email);
        console.log('Password:', password);
        try {
            const response = await axiosInstance.post('/api/login', { email, password });
            const token = response.data.token;
            if (response.status === 200) {
                localStorage.setItem('Token', token);
                navigate('/home');
                console.log('login successful');
            }

            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('User not found');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form className="bg-white sm:w-[40%] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl mb-4 text-center">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 flex justify-center text-sm mb-4">{error}</p>}
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <p className='flex justify-center'>Don't have an account? <Link to={'/register'}><span className='underline cursor-pointer'>Register</span></Link></p>
                </form>
            </div>
        </>
    );
}

export default Login;
