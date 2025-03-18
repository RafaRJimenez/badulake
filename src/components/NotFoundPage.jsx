import React from 'react';
import { toast } from 'react-toastify';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
    const handleToast = () => {
        toast.error('Página no encontrada. Por favor, verifica la URL.', {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-orange-600 text-white">
            <div className="text-center">
                <FaExclamationTriangle className="text-6xl mb-4" />
                <h1 className="text-4xl font-bold mb-2">404 - Página No Encontrada</h1>
                <p className="text-lg mb-6">Lo sentimos, la página que buscas no existe.</p>
                <button
                    onClick={handleToast}
                    className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                >
                    Mostrar Toast
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;