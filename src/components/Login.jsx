import {SiFirebase} from 'react-icons/si';
import {FaReact} from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase/index';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

 const Login = () => {
    const doLogin = () => {
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(token, user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode, errorMessage, email, credential);
  });
}

    return (
        <div>
            <h1 className='text-xl font-semibold text-sky-700'>React Redux Firebase</h1>
            <button onClick={() => doLogin() }>Login with Google</button>
            <SiFirebase />
            <FaReact />
        </div>
    )
}


export default Login