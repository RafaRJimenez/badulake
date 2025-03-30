import React, { useState, useEffect } from 'react';


const Basket2 = ({callGetBasket, basket}) => {

    const getNewBasket = async () => {
        callGetBasket()
    }

useEffect(() => {
    getNewBasket()
}
, [])


    return (
        <div>

        <h2>HOLA SOY UN CARRITO</h2>
            {basket.map((item, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">${item.price}</p>
                </div>
            ))}
            
        </div>
    );
}

export default Basket2;
