import React, { useState } from 'react';
import './App.css';
import LoginFormContainer from './components/containers/LoginFormContainer';
import { app } from './firebase/index';
import Login from './components/Login';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login2 from './components/Login2';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import AboutPage from './components/AboutPage';
import MainPageContainer from './components/containers/MainPageContainer';
import FirebaseAuthContainer from './components/containers/FirebaseAuthContainer';
import LogOutFirebaseContainer from './components/containers/LogOutFirebaseContainer';
import  Basket  from './components/Basket';
import BasketContainer from './components/containers/BasketContainer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <aside className="w-full bg-gray-800 text-white p-4 absolute top-0 left-0 z-20">
          {/* Botón hamburguesa */}
          <div className="flex justify-between items-center md:hidden">
            <span className="text-xl font-bold">Menu</span>
            <button 
            className="absolute top-4 right-4 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Menú navegación */}
          <nav className={`
            ${isMenuOpen ? 'flex' : 'hidden'}
            flex-col space-y-4 mt-4
            md:flex md:flex-row md:space-y-0 md:space-x-8 md:mt-0
            justify-center
          `}>
            <Link 
              to="/" 
              className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/login" 
              className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/login2" 
              className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login2
            </Link>
            <Link 
              to="/register" 
              className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/faqs" 
              className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
          </nav>
        </aside>
        <BasketContainer />
        <LogOutFirebaseContainer />
        <Basket />
        <Routes>
          {/* <LoginFormContainer /> */}
      {/* <LoginForm></LoginForm> */}
      {/* <Login></Login> */}
          <Route exact path="/" element={<MainPageContainer />} />
          {["/about", "/faqs"].map((path, index) => 
            <Route path={path} Component={AboutPage} key={index} />
          )}
          <Route path="/login" element={<FirebaseAuthContainer />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login2" element={<LoginFormContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;