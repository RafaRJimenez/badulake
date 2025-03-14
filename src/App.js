import './App.css';
import LoginFormContainer from './components/containers/LoginFormContainer';
import { app } from './firebase/index';
import Login from './components/Login';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login2 from './components/Login2';

function App() {
  return (
    <div className="App">
      <ToastContainer />
       {/* <LoginFormContainer /> */}
      {/* <LoginForm></LoginForm> */}
      {/* <Login></Login> */}
       <Register></Register>
      <Login2></Login2>
    </div>
  );
}

export default App;
