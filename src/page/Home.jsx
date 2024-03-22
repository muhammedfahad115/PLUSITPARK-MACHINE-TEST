import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/axiosInstance';
import Header from '../components/Header';
import UpdateProfile from '../components/UpdateProfile';
import ItemsList from '../components/ItemsList';

function Home() {
    const [user, setUser] = useState('');
    const [welcome, setWelcome] = useState(true);
    const [showItems, setShowItems] = useState([]);
    const [displayItem, setDisplayItem] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosInstance.get('/api/users');
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        getUser();
        const getItems = async () => {
            try {
                const response = await axiosInstance.get('/api/items');
                console.log(response.data);
                setShowItems(response.data);
                setDisplayItem(true);
            } catch (error) {
                console.log('Error during when fetching items',error);
            }
        }
        getItems();
        console.log(showItems,';sdfjka;skdja')
    }, []);

    const handleClose = () => {
        setWelcome(false);
    };




    return (
        <>
            <div className="flex flex-col justify-center items-center">
         <Header user={user} />
                {
                    welcome && (<div className="max-w-md w-full bg-white shadow-md rounded-md p-6 mt-12">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl text-black-500">Welcome to home {user.name}</h1>
                            <button onClick={handleClose} className=" ml-3 text-red-500 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>)
                }
                {
                   displayItem  && (<ItemsList array={showItems}/>)
                }
            </div>  
        </>
    );
}

export default Home;
