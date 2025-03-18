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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Regístrate</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="example@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                    Regístrate
                </button>
            </form>
        </div>
    </div>
        // <div>
        //     <h1>Regístrate para tener acceso</h1>
        //     <form onSubmit={handleSubmit}>
        //         <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        //         <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        //         <button type="submit">Regístrate</button>
        //     </form>
        // </div>
    );
}

export default Register;
