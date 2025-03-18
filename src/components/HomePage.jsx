import React from 'react';
import { toast } from 'react-toastify';
import { FaHome } from 'react-icons/fa';

const HomePage = () => {
    const handleToast = () => {
        toast.success('¡Bienvenido a la Home Page!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="text-center">
                <FaHome className="text-6xl mb-4" />
                <h1 className="text-4xl font-bold mb-2">Home Page</h1>
                <p className="text-lg mb-6">¡Bienvenido a nuestra aplicación!</p>
                <button
                    onClick={handleToast}
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                >
                    Mostrar Toast
                </button>
            </div>
        </div>
    );
};

export default HomePage;