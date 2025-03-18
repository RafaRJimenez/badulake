import React from 'react';
import { toast } from 'react-toastify';
import { FaInfoCircle } from 'react-icons/fa';

const AboutPage = () => {
    const handleToast = () => {
        toast.info('Esta es la página About. ¡Gracias por visitarnos!', {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600 text-white">
            <div className="text-center">
                <FaInfoCircle className="text-6xl mb-4" />
                <h1 className="text-4xl font-bold mb-2">About Page</h1>
                <p className="text-lg mb-6">Conoce más sobre nuestra aplicación y equipo.</p>
                <button
                    onClick={handleToast}
                    className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                >
                    Mostrar Toast
                </button>
            </div>
        </div>
    );
};

export default AboutPage;