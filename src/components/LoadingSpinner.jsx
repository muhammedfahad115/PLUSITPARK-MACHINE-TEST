import React from 'react'

function LoadingSpinner() {
    return (
        <>
            <div className="h-screen w-screen bg-white flex justify-center items-center">
                <div>
                    <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
                </div>
            </div>
        </>
    )
}

export default LoadingSpinner