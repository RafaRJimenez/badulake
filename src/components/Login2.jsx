
import React, {useState} from 'react';
import { getAuth,  signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    const signInWithEmail = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            toast.success('Usuario logeado con éxito');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={signInWithEmail}>
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}


export default Login;