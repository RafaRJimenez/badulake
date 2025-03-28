import { put, call, takeLatest } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast } from 'react-toastify'; // Asumiendo que usas react-toastify
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './firebaseActions';
import { LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from './firebaseActions';


function* signInSaga(action) {
  try {
    const { email, password } = action.payload;
    const auth = getAuth();
    // Llamada a Firebase para autenticar
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );

    const user = userCredential.user;
    // Disparar acción de éxito
    yield put({
      type: SIGN_IN_SUCCESS,
      payload:  {
        user: {
          email: user.email,
          uid: user.uid
        }
      }
    });
    toast.success('Usuario logeado con éxito');
  } catch (error) {
    // Manejo de errores
    yield put({
      type: SIGN_IN_FAILURE,
      payload: {
        errorCode: error.code,
        errorMessage: error.message
      }
    });
    
    console.log(error.code, error.message);
  }
}

// Watcher saga
export function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signInSaga);
}


function* signOutSaga() {
  try {
    const auth = getAuth();
    // Llamada a Firebase para cerrar sesión
    yield call(signOut, auth);
    // Disparar acción de éxito
    yield put({ type: LOG_OUT_SUCCESS });
    toast.success('Usuario deslogeado con éxito');
  } catch (error) {
    // Manejo de errores
    yield put({
      type: LOG_OUT_FAILURE,
      payload: {
        errorCode: error.code,
        errorMessage: error.message
      }
    });
    
    console.log(error.code, error.message);
  }
}


export function* watchSignOut() {
  yield takeLatest(LOG_OUT_REQUEST, signOutSaga);
}