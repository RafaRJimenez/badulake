import React, { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import { groupedBasket } from './services/BasketService';
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";


const Basket2 = ({ callGetBasket, basket, callDeleteBasket, callDeleteFullBasket, callAddBasket, callDeleteWholeProduct  }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [newBasket, setNewBasket] = useState([]); // Estado para almacenar el nuevo carrito

 
    const getNewBasket = async () => {
    
    setIsOpen(true); // Abre el desplegable cuando se recibe un nuevo producto
    // setTimeout(() => setIsOpen(false), 3000); // Cierra automáticamente después de 3 segundos
  };

  const closeBasket = () => {
    setIsOpen(false); // Cierra el desplegable
  }

  // const callDeleteWholeProduct = async (item) => {
  //   console.log('Antes de eliminar:', basket);
  //   await callDeleteBasket(item.id);
  //   await Promise.all(item.ids.map((id) => callDeleteBasket(id)));
  //   console.log('Después de eliminar:', basket);
  // }

  useEffect(() => {
    callGetBasket();
    
  }, []); // Ejecuta cada vez que `basket` cambia


//   useEffect(() => {
//     getNewBasket();
//   }
// , [basket]); // Ejecuta cada vez que `basket` cambia

useEffect(() => { 
  const mainTask = async () => {
    await getNewBasket(); // Llama a la función para obtener el carrito
  const grouped = groupedBasket(basket); 
  setNewBasket(grouped);
  console.log("this is new basket", newBasket) }
  console.log("this is basket", basket)
  mainTask(); // Llama a la función principal
}, [basket]);


  return (
    <div className="fixed top-44 right-10">
      <div
        className={`transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } bg-white shadow-lg rounded-lg p-4 w-80`}
      >
        <div className='fixed right-1 top-1'>
          <IoIosClose size={32} className="text-gray-800 hover:text-red-500 transition duration-300" onClick={closeBasket} />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Carrito</h2>
        {basket.length === 0 ? (
          <p className="text-gray-600">El carrito está vacío.</p>
        ) : (
          newBasket.map((item, index) => (
            <div
              key={index}
              className="p-1"
            >   <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-800 relative text-left">{item.name}</h2>
              <p className="text-gray-600 text-left">${item.price}</p>
              <h4 className="text-sm font-semibold text-gray-800 relative text-left cursor-pointer">
              <div className="flex items-center">Quantity: <h3 className='bold p-1' onClick={() => callDeleteBasket(item.id)}><FiMinusCircle />
</h3> {item.quantity} <h3 className='bold p-1' onClick={() => callAddBasket({ name: item.name, price: item.price, image: item.image})}><FiPlusCircle />
</h3></div>
              </h4>
              <h4 className="text-sm font-semibold text-red-500 relative text-left cursor-pointer" onClick={() => callDeleteWholeProduct(item.ids)}>Eliminar producto</h4>
            </div>
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mt-2" />
              </div>
              <hr></hr>
            </div>
          ))
        )}
        
        <button className='border p-1 border-gray-600' onClick={callDeleteFullBasket}>CLEAR</button>
        <button className='border p-1 border-gray-600' onClick={() => groupedBasket(basket)}>BASKET-SERVICE</button>
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
