import React, { useState, useEffect, useRef } from 'react';
import { IoIosClose } from "react-icons/io";
import { groupedBasket } from './services/BasketService';
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";


const Basket2 = ({ callGetBasket, basket, callDeleteBasket, authFirebase, callDeleteFullBasket, callAddBasket, callDeleteWholeProduct  }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [newBasket, setNewBasket] = useState([]); // Estado para almacenar el nuevo carrito
   const [userProducts, setUserProducts] = useState([]);

   const prevBasketLength = useRef();

     const [isFirstLoad, setIsFirstLoad] = useState(true);
 
    const getNewBasket = async () => {
    setIsOpen(true); // Abre el desplegable cuando se recibe un nuevo producto
     setTimeout(() => setIsOpen(false), 3000); // Cierra automáticamente después de 3 segundos
  };

  const closeBasket = () => {
    setIsOpen(false); // Cierra el desplegable
  }

const prevTotalQuantity = useRef(null);

useEffect(() => {
  // Calcula el total de productos del usuario actual
  let userCart;
  if (authFirebase?.user?.uid) {
    userCart = basket.find(cart => cart.id === authFirebase.user.uid);
  } else {
    userCart = basket.find(cart => cart.id === "guest");
  }
  const totalQuantity = (userCart?.products || []).reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Si es la primera carga, solo inicializa el ref
  if (prevTotalQuantity.current === null) {
    prevTotalQuantity.current = totalQuantity;
    return;
  }

  // Si el total de productos aumenta, abre el carrito
  if (totalQuantity > prevTotalQuantity.current) {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  }
  prevTotalQuantity.current = totalQuantity;
}, [basket, authFirebase]);

  // const callDeleteWholeProduct = async (item) => {
  //   console.log('Antes de eliminar:', basket);
  //   await callDeleteBasket(item.id);
  //   await Promise.all(item.ids.map((id) => callDeleteBasket(id)));
  //   console.log('Después de eliminar:', basket);
  // }

   console.log("THIS IS THE USER", authFirebase)

  useEffect(() => {
    callGetBasket();
    
  }, []); // Ejecuta cada vez que `basket` cambia


//   useEffect(() => {
//     getNewBasket();
//   }
// , [basket]); // Ejecuta cada vez que `basket` cambia

// useEffect(() => { 
//   const mainTask = async () => {
//     await getNewBasket();  Llama a la función para obtener el carrito
//    const grouped = groupedBasket(basket); 
//   setNewBasket(basket);
//   console.log("this is new basket", newBasket) }
//   console.log("this is basket", basket)
//   mainTask();  Llama a la función principal
// }, [basket]);

  //  useEffect(() => {
  //   if (prevBasketLength.current !== undefined && basket.length > prevBasketLength.current) {
  //     setIsOpen(true);
  //     setTimeout(() => setIsOpen(false), 3000);
  //   }
  //   prevBasketLength.current = basket.length;
  // }, [basket]);



  useEffect(() => {
    let userCart;

    if (authFirebase?.user?.uid) {
      // Si hay usuario logueado, buscamos su carrito
      userCart = basket.find(cart => cart.id === authFirebase.user.uid);
    } else {
      // Si no hay usuario logueado, buscamos el carrito invitado
      userCart = basket.find(cart => cart.id === "guest");
    }

    setUserProducts(userCart?.products || []);
    console.log("this is user products NEW", userProducts);
    console.log("this is basket NEW", basket);

  }, [basket, authFirebase]);
  return (
    <div className="fixed z-10 top-44 right-10">
     <button
        className="fixed top-[4.25rem] right-2 md:top-24 md:right-10 bg-gray-800 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition duration-300 mb-2"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Abrir carrito"
      >
        <IoMdCart size={28} />
      </button>
      <div
        className={`transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
        } bg-white shadow-lg bg-slate-100 rounded-lg p-4 w-80 z-100`}
      >
        <div className='fixed right-1 top-1'
        >
          <IoIosClose size={32} className="text-gray-800 hover:text-red-500 transition duration-300" onClick={closeBasket} />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Carrito</h2>
        <hr></hr>
        <h3>el usuario es {authFirebase?.user?.uid || 'No user logged in'}</h3>
        {userProducts.length === 0 ? (
          <p className="text-gray-600">El carrito está vacío.</p>
        ) : (
          userProducts.map(
            (item, index) => (   
                        <div
              key={index}
              className="p-1"
            >   <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-800 relative text-left">{item.name}</h2>
              <p className="text-gray-600 text-left">${item.price}</p>
              <h4 className="text-sm font-semibold text-gray-800 relative text-left cursor-pointer">
              <div className="flex items-center">Quantity: <h3 className='bold p-1' onClick={() => callDeleteBasket(
{ user: authFirebase?.user?.uid || "guest", productId: item.id 
}
                )}><FiMinusCircle />
</h3> {item.quantity} <h3 className='bold p-1' onClick={() => callAddBasket({ 
user: authFirebase?.user?.uid || "guest", name: item.name, price: item.price, image: item.image, id: item.id
  })}><FiPlusCircle />
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
