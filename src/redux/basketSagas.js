import { put, call, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify'; // Asumiendo que usas react-toastify
import { ADD_BASKET, ADD_BASKET_SUCCESS, ADD_BASKET_FAILURE, GET_BASKET, GET_BASKET_SUCCESS, GET_BASKET_FAILURE, EDIT_BASKET, EDIT_BASKET_SUCCESS, EDIT_BASKET_FAILURE, DELETE_BASKET, DELETE_BASKET_SUCCESS, DELETE_BASKET_FAILURE, DELETE_FULL_BASKET, DELETE_FULL_BASKET_SUCCESS, DELETE_FULL_BASKET_FAILURE } from './basketActions';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'; // Asegúrate de importar Firestore
import { db } from '../firebase/index.js'; // Asegúrate de importar tu configuración de Firebase


function* addBasketSaga(action) {
    try {
        const basket = action.payload;
        const docRef = yield call(addDoc, collection(db, 'basket'), basket);
        yield put({ type: ADD_BASKET_SUCCESS, payload: { id: docRef.id, ...basket } });
        // toast.success('Producto añadido al carrito con éxito');
    } catch (error) {
        yield put({ type: ADD_BASKET_FAILURE, payload: error.message });
        toast.error('Error al añadir producto al carrito');
    }
    }

function* getBasketSaga() {
    try {
        const querySnapshot = yield call(getDocs, collection(db, 'basket'));
        const basket = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        yield put({ type: GET_BASKET_SUCCESS, payload: basket });
    } catch (error) {
        yield put({ type: GET_BASKET_FAILURE, payload: error.message });
        toast.error('Error al obtener el carrito');
    }
}

function* editBasketSaga(action) {
    try {
        const { id, basket } = action.payload;
        const docRef = doc(db, 'basket', id);
        yield call(updateDoc, docRef, basket);
        yield put({ type: EDIT_BASKET_SUCCESS, payload: { id, ...basket } });
        toast.success('Producto editado con éxito');
    } catch (error) {
        yield put({ type: EDIT_BASKET_FAILURE, payload: error.message });
        toast.error('Error al editar producto');
    }
}   

function* deleteBasketSaga(action) {
    try {
        const id  = action.payload;
        const docRef = doc(db, 'basket', id);
        yield call(deleteDoc, docRef);
        yield put({ type: DELETE_BASKET_SUCCESS, payload: id });
        // toast.success('Producto eliminado del carrito con éxito');
    } catch (error) {
        yield put({ type: DELETE_BASKET_FAILURE, payload: error.message });
        toast.error('Error al eliminar producto del carrito');
    }
}   


function* deleteFullBasketSaga() {
    try {
        const querySnapshot = yield call(getDocs, collection(db, 'basket'));
        const deletePromises = querySnapshot.docs.map(doc => call(deleteDoc, doc.ref));
        yield all(deletePromises);
        yield put({ type: DELETE_FULL_BASKET_SUCCESS });
         toast.success('Carrito vaciado con éxito');
    } catch (error) {
        yield put({ type: DELETE_FULL_BASKET_FAILURE, payload: error.message });
        toast.error('Error al vaciar el carrito');
    }
}


export function* watchBasketSagas() {
    yield takeLatest(ADD_BASKET, addBasketSaga);
    yield takeLatest(GET_BASKET, getBasketSaga);
    yield takeLatest(EDIT_BASKET, editBasketSaga);
    yield takeLatest(DELETE_BASKET, deleteBasketSaga);
    yield takeLatest(DELETE_FULL_BASKET, deleteFullBasketSaga);
}



