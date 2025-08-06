import { takeLatest, call, put, all} from 'redux-saga/effects';
import axios from 'axios';
import { API_CALL_REQUEST, API_CALL_REQUEST_CATEGORIES, API_CALL_REQUEST_BY_CATEGORY, API_CALL_FEATURED, API_CALL_PEOPLE_ALSO_BUY } from './productActions';



export function* watcherProductsSaga() {
    //listens the action and starts a worker saga
    yield takeLatest(API_CALL_REQUEST, workerSaga); 
    yield takeLatest(API_CALL_REQUEST_CATEGORIES, workerSaga);
    yield takeLatest(API_CALL_REQUEST_BY_CATEGORY, workerSaga);
    yield takeLatest(API_CALL_FEATURED, workerSaga);
    yield takeLatest(API_CALL_PEOPLE_ALSO_BUY, fetchPeopleAlsoBuySaga);
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


export function* fetchPeopleAlsoBuySaga(action) {
  try {
    const responses = yield all(
      action.payload.requests.map(req => call(axios, req))
    );
    const products = responses.map(res => res.data.products[0]);
    yield put({ type: action.payload.okAction, payload: products });
  } catch (error) {
    yield put({ type: action.payload.failAction, payload: error.message });
  }
}