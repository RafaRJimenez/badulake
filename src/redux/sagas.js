import { takeLatest, call, put} from 'redux-saga/effects';
import { API_CALL_REQUEST_USER, API_CALL_SUCCESS, API_CALL_FAILURE } from './actions';
import axios from 'axios';


// worker (watcher) Saga: will be fired on USER_FETCH_REQUESTED actions
// Listen the API_CALL_REQUEST actions (no lo escucha un reducer, lo va a escuchar un saga)

export function* watcherSaga() {
    //listens the action and starts a worker saga
    yield takeLatest(API_CALL_REQUEST_USER, workerSaga); 
}

//WORKER SAGA
// Is called from watcher Saga, does the login and Dispaches an action

export function* workerSaga(action) {
    try {
        const response = yield call(fetchHttp(action.payload.request))
        const token = response.data.token;
        yield put({
            type: action.payload.okAction, //es lo mismo que usar API_CALL_SUCCESS
            payload: {
                token: token // el reducer va a poder almacenar el token y gestionarlo
            }
        });
    } catch (error) {
        yield put({
            type: action.payload.failAction, //es lo mismo que usar API_CALL_FAILURE
            payload: {
                error: error //el reducer lo coge y lo guarda en el store de la aplicación para mostrarlo
            }
        });
    }
}



function fetchHttp(request) {
    return function(){
        return(axios(request))
    }
}
