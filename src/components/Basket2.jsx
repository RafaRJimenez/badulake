import React, { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";

const Basket2 = ({ callGetBasket, basket }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el desplegable está abierto

  const getNewBasket = async () => {
    
    setIsOpen(true); // Abre el desplegable cuando se recibe un nuevo producto
    // setTimeout(() => setIsOpen(false), 3000); // Cierra automáticamente después de 3 segundos
  };

  const closeBasket = () => {
    setIsOpen(false); // Cierra el desplegable
  }

  useEffect(() => {
    callGetBasket();
    
  }, []); // Ejecuta cada vez que `basket` cambia


  useEffect(() => {
    getNewBasket();
  }
, [basket]); // Ejecuta cada vez que `basket` cambia


  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } bg-white shadow-lg rounded-lg p-4 w-80`}
      >
      <div><IoIosClose /></div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Carrito</h2>
        {basket.length === 0 ? (
          <p className="text-gray-600">El carrito está vacío.</p>
        ) : (
          basket.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-md font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Basket2;


// import React, { useState, useEffect } from 'react';


// const Basket2 = ({callGetBasket, basket}) => {

//     const getNewBasket = async () => {
//         callGetBasket()
//     }

// useEffect(() => {
//     getNewBasket()
// }
// , [])


//     return (
//         <div>

//         <h2>HOLA SOY UN CARRITO</h2>
//             {basket.map((item, index) => (
//                 <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
//                     <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
//                     <p className="text-gray-600">${item.price}</p>
//                 </div>
//             ))}
            
//         </div>
//     );
// }

// export default Basket2;
