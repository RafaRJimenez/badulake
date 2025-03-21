import { all } from 'redux-saga/effects';
import { watcherProductsSaga } from './productSagas';
import { watcherSaga } from './sagas';

export function* rootSaga() {
    yield all([
        watcherProductsSaga(),
        watcherSaga()
    ]);
}