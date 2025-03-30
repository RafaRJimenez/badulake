import { all } from 'redux-saga/effects';
import { watcherProductsSaga } from './productSagas';
import { watcherSaga } from './sagas';
import { watchSignIn, watchSignOut } from './firebaseSagas';
import { watchBasketSagas } from './basketSagas'; // Asegúrate de importar tu watcher de carrito

export function* rootSaga() {
    yield all([
        watcherProductsSaga(),
        watcherSaga(),
        watchSignIn(),
        watchSignOut(),
        watchBasketSagas()
    ]);
}