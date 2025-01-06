import React from 'react'
import logo from '../img/logo.png'

const Loader = () => {
    return (
        <>
             <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <div className="flex items-center justify-center">
                    <img
                        src={logo}
                        alt="Logo Loader"
                        className="h-16 w-16 animate-spin animate-pulse opacity-70"
                    />
                </div>
            </div>


        </>
    )
}

export default Loader
