import { all } from 'redux-saga/effects';
import { watcherProductsSaga } from './productSagas';
import { watcherSaga } from './sagas';
import { watchSignIn, watchSignOut } from './firebaseSagas';

export function* rootSaga() {
    yield all([
        watcherProductsSaga(),
        watcherSaga(),
        watchSignIn(),
        watchSignOut()
    ]);
}