import { takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import { API_CALL_REQUEST, API_CALL_REQUEST_CATEGORIES } from './productActions';



export function* watcherProductsSaga() {
    //listens the action and starts a worker saga
    yield takeLatest(API_CALL_REQUEST, workerSaga); 
    yield takeLatest(API_CALL_REQUEST_CATEGORIES, workerSaga);
}

export function* workerSaga(action) {
    try {
        const response = yield call(fetchHttp(action.payload.request))
        yield put({
            type: action.payload.okAction,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: action.payload.failAction,
            payload: {
                error: error
            }
        });
    }
}


function fetchHttp(request) {
    return function(){
        return(axios(request))
    }
}