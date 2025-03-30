import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const MainPage = ({products, total, pages, fetching, page, setPage, fetchProducts, authFirebase}) => {

  const loadProducts = async (page) => {
    await fetchProducts(page);
     setPage(page)
  };

  console.log(authFirebase)

useEffect(() => {
  loadProducts(page); 
}, []);


    return (
        <div>
     <div>{authFirebase?.user?.email || 'No user logged in'}</div>
            <h1>Main Page</h1>
            <p onClick={() => fetchProducts(6)}>get products</p>
            <div className="bg-gray-100 font-sans">
         <div className="max-w-4xl mx-auto p-4">
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold text-gray-700">BEJAMAS_</div>
          <div className="text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18M3 3l2 18h14l2-18M3 3h18M9 21h6"
              ></path>
            </svg>
          </div>
        </header>

        {/* Título del producto */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">SAMURAI KING RESTING</h1>

        {/* Botón Add to Cart */}
        <button className="bg-black text-white px-6 py-2 mb-6 hover:bg-gray-800 transition">
          ADD TO CART
        </button>

        {/* Imagen principal */}
        <div className="mb-6">
          <img
            alt="Samurai King Resting"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Sección de información */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Photo of the day */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Photo of the day</h2>
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              About the Samurai King Resting
            </h3>
            <p className="text-gray-600 text-sm">
              So how did the classical Latin become so incoherent? According to McClintock, a
              15th century typesetter likely scrambled part of Cicero's De Finibus in order to
              provide placeholder text to mockup various fonts for a type specimen book. So how
              did the classical Latin become so incoherent? According to McClintock, a 15th
              century typesetter likely scrambled part of Cicero's De Finibus in order to provide
              placeholder text to mockup various fonts for a type specimen book.
            </p>
          </div>

          {/* People also buy */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">People also buy</h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <img
                  alt="Food Egg Basket"
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600">Food Egg Basket</p>
                <p className="text-sm font-semibold text-gray-800">$29.89</p>
              </div>
              <div>
                <img
                  alt="Food Egg Balloon"
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600">Food Egg Balloon</p>
                <p className="text-sm font-semibold text-gray-800">$29.89</p>
              </div>
              <div>
                <img
                  alt="Food Egg Balloon"
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600">Food Egg Balloon</p>
                <p className="text-sm font-semibold text-gray-800">$29.89</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <footer className="mt-8 flex justify-between items-center border-t pt-4">
          <div className="text-gray-600 text-sm">PHOTOGRAPHY / PREMIUM PHOTOS</div>
          <div className="text-gray-600 text-sm">
            Sort By <span className="font-semibold">Price</span> ▼
          </div>
        </footer>
         </div>
        </div>
        <div className="bg-gray-100 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold text-gray-800">
            PHOTOGRAPHY / PREMIUM PHOTOS
          </h1>
          <div className="text-gray-600 text-sm">
            Sort By <span className="font-semibold">Price</span> ▼
          </div>
        </header>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filtros (columna izquierda) */}
          <div className="col-span-1">
            <h2 className="text-md font-semibold text-gray-800 mb-4">Category</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-gray-600">People</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-gray-600">Premium</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-gray-600">Pets</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-gray-600">Food</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-gray-600">Landmarks</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Cities</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Nature</span>
              </label>
            </div>
          </div>

        <div>Total : {total} {pages} {page}</div>
           <div className="col-span-1 md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products && products.map((product) => (
                <div key={product.id} className="relative">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-auto object-cover mb-2"
                  />
                  <h3 className="text-sm font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-sm text-gray-600">{product.price}€</p>
                  <button className='border-4'>ADD TO CART</button>
                </div>
            ))}
            </div>
          </div>
        </div>

        {/* Paginación */}
        <footer className="mt-8 flex justify-center items-center space-x-2">
          <button onClick={() =>
          { if (
            page > 1
          ) 
          loadProducts(page -1)}}
           className="text-gray-600">{'<'}</button>
          {[...Array(pages)].map((_, index) => (
            <button key={index} onClick={() => loadProducts(index +1)} className="text-gray-600">{index + 1}</button>
          ))}
          <button onClick={() =>
          { if (
            page < 17
          ) 
          loadProducts(page -1)}} className="text-gray-600">{'>'}</button>
        </footer>
      </div>
    </div>
        </div>
    );
}

export default MainPage;
