import React, {useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';


const auth = getAuth();


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    console.log(user);
    toast.success('Usuario registrado con éxito');
    setEmail('');
    setPassword('');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
  });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createUser();
    }
    return (
        <div>
            <h1>Regístrate para tener acceso</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Regístrate</button>
            </form>
        </div>
    );
}

export default Register;
