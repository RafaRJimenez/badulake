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
  return (
    <div className="App">
     <ToastContainer />
    <Router>
    <aside className="w-full bg-gray-800 text-white p-4">
            <nav className="flex justify-center space-x-8">
              <Link 
                to="/" 
                className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              >
                Home
              </Link>
              <Link 
                to="/login" 
                className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              >
                Login
              </Link>
              <Link 
                to="/login2" 
                className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              >
                Login2
              </Link>
              <Link 
                to="/register" 
                className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              >
                Register
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-semibold hover:text-blue-400 transition duration-300"
              >
                About
              </Link>
              <Link 
                to="/faqs" 
                className="text-lg font-semibold hover:text-blue-400 transition duration-300"
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
