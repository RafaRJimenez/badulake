import './App.css';
import LoginFormContainer from './components/containers/LoginFormContainer';
import { app } from './firebase/index';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
       {/* <LoginFormContainer /> */}
      {/* <LoginForm></LoginForm> */}
      <Login></Login>
    </div>
  );
}

export default App;
