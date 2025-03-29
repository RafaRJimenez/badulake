import React, {useEffect, useState} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { db } from '../firebase/index.js';
import { collection, addDoc } from 'firebase/firestore';
import { addBasket, getBasket, editBasket, deleteBasket } from '../firebase/basketController.js'; // Importa la función addBasket


const Basket = ({ cartItems, onRemove }) => {
    const [product, setProduct] = useState({ name: 'champu', price: 15 });
    const [basket, setBasket] = useState([]);
    const newBasket = {
        name: product.name,
        price: product.price,
    };

    const createNewBasket = async () => {
        console.log(newBasket);
        await addBasket(newBasket);
        getNewBasket();
    }

    const getNewBasket = async () => {
        const data = await getBasket();
        console.log(data);
        console.log("la está trayendo")
        setBasket(data);
    }

    const editNewBasket = async (id) => {
        const newBasket = {
            name: 'champu5',
            price: 50,
        };
        await editBasket(id, newBasket);
        getNewBasket();
    }

    const deleteNewBasket = async (id) => {
        await deleteBasket(id);
        getNewBasket();
    }

    useEffect(() => {
       getNewBasket()
    }, []);


  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Carrito</h2>
        <FaShoppingCart className="text-2xl text-gray-600" />
      </div>
      {/* {cartItems.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price}€</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )} */}
    <button className='' onClick={createNewBasket}>Add to db</button>
    <button className='' onClick={getNewBasket}>GET BASKET</button>
    <div className=''>
        {basket.map((item, index) => (
            <div key={index} className='mb-4 p-4 bg-white rounded-lg shadow-sm'>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <button className="" onClick={() => editNewBasket(item.id)}>Edit </button> <br></br>
                <button className="" onClick={() => deleteNewBasket(item.id)}>Delete </button>
                <br></br>
            </div>
            
        ))}
    </div>
    </div>
  );
};

export default Basket;