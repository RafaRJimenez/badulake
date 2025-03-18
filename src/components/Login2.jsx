
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
          <form onSubmit={signInWithEmail} className="space-y-4">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                  Iniciar Sesión
              </button>
          </form>
      </div>
  </div>
        // <div>
        //     <h1>Login</h1>
        //     <form onSubmit={signInWithEmail}>
        //     <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        //         <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
    );
}


export default Login;