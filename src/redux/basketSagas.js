import { put, call, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify'; // Asumiendo que usas react-toastify
import { ADD_BASKET, ADD_BASKET_SUCCESS, ADD_BASKET_FAILURE, GET_BASKET, GET_BASKET_SUCCESS, GET_BASKET_FAILURE, EDIT_BASKET, EDIT_BASKET_SUCCESS, 
    EDIT_BASKET_FAILURE, DELETE_BASKET, DELETE_BASKET_SUCCESS, DELETE_BASKET_FAILURE, DELETE_FULL_BASKET,
     DELETE_FULL_BASKET_SUCCESS, DELETE_FULL_BASKET_FAILURE, DELETE_WHOLE_PRODUCT, DELETE_WHOLE_PRODUCT_SUCCESS, DELETE_WHOLE_PRODUCT_FAILURE } from './basketActions';
import { collection, addDoc, getDocs, setDoc, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'; // Asegúrate de importar Firestore
import { db } from '../firebase/index.js'; // Asegúrate de importar tu configuración de Firebase


function* addBasketSaga(action) {
    // try {
    //     console.log("action en saga", action);
    //     const basket = action.payload;
    //     const user = action.payload.user;
    //     const docRef = yield call(addDoc, collection(db, 'basket'), basket);
    //     yield put({ type: ADD_BASKET_SUCCESS, payload: { id: docRef.id, ...basket } });
    //     // toast.success('Producto añadido al carrito con éxito');
    // } catch (error) {
    //     yield put({ type: ADD_BASKET_FAILURE, payload: error.message });
    //     toast.error('Error al añadir producto al carrito');
    // }
        try {
        const { user, name, price, image, id } = action.payload;
        if (!user) throw new Error("No hay usuario definido");

        // Referencia al documento del carrito del usuario
        const cartRef = doc(db, 'basket', user);

        // Obtener el carrito actual
        const cartSnap = yield call(getDoc, cartRef);
        let products = [];
            if (cartSnap.exists()) {
            products = cartSnap.data().products || [];
        }
        // let products = cartSnap.exists() ? cartSnap.data().products : [];

        // Buscar si el producto ya está en el carrito
        const existing = products.find(p => p.id === id);
        if (existing) {
            products = products.map(p =>
                p.id === id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
            );
        } else {
            products.push({ id, name, price, image, quantity: 1 });
        }

        // Actualizar el carrito en Firestore
        yield call(setDoc, cartRef, { products }, { merge: true });

        yield put({ type: ADD_BASKET_SUCCESS, payload: {id: user, products} });
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

// ...existing code...
function* deleteBasketSaga(action) {
    try {
        const { user, productId } = action.payload;
        const userId = user || "guest";
        const cartRef = doc(db, 'basket', userId);

        // Obtener el carrito actual
        const cartSnap = yield call(getDoc, cartRef);
        if (!cartSnap.exists()) {
            // Nada que hacer si no existe carrito
            yield put({ type: DELETE_BASKET_FAILURE, payload: 'Carrito no encontrado' });
            return;
        }

        let products = cartSnap.data().products || [];

        // Buscar el producto por id (coincide string/number)
        const existing = products.find(p => String(p.id) === String(productId));
        if (!existing) {
            yield put({ type: DELETE_BASKET_FAILURE, payload: 'Producto no encontrado en el carrito' });
            return;
        }

        // Decrementar cantidad o eliminar producto si llega a 0
        if ((existing.quantity || 1) > 1) {
            products = products.map(p =>
                String(p.id) === String(productId) ? { ...p, quantity: (p.quantity || 1) - 1 } : p
            );
            // Actualizar el documento con el array modificado
            yield call(setDoc, cartRef, { products }, { merge: true });
            yield put({ type: DELETE_BASKET_SUCCESS, payload: { id: userId, products } });
            toast.success('Cantidad reducida en 1');
        } else {
            // Eliminar el producto del array
            products = products.filter(p => String(p.id) !== String(productId));
            if (products.length === 0) {
                // Si ya no quedan productos, borrar el documento
                yield call(deleteDoc, cartRef);
                yield put({ type: DELETE_BASKET_SUCCESS, payload: { id: userId, products: [] } });
                toast.success('Producto eliminado y carrito vacío');
            } else {
                // Actualizar el documento con el array restante
                yield call(setDoc, cartRef, { products }, { merge: true });
                yield put({ type: DELETE_BASKET_SUCCESS, payload: { id: userId, products } });
                toast.success('Producto eliminado del carrito');
            }
        }
    } catch (error) {
        yield put({ type: DELETE_BASKET_FAILURE, payload: error.message });
        toast.error('Error al eliminar producto del carrito');
    }
}
// ...existing code...


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

function* deleteWholeProductSaga(action) {
    try {
      const ids = action.payload;
      
      // Validar que ids es un array y no está vacío
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("Se esperaba un array de IDs no vacío");
      }
  
      // Validar que todos los elementos del array son strings válidos
      if (!ids.every(id => typeof id === "string" && id)) {
        throw new Error("Todos los IDs deben ser strings válidos");
      }
  
      // Obtener todos los documentos de la colección 'basket'
      const querySnapshot = yield call(getDocs, collection(db, 'basket'));
  
      // Filtrar documentos cuyos IDs estén en el array de ids
      const docsToDelete = querySnapshot.docs.filter(doc => ids.includes(doc.id));
  
      // Si no se encuentran documentos para eliminar
      if (docsToDelete.length === 0) {
        throw new Error("Ningún producto encontrado en el carrito para los IDs proporcionados");
      }
  
      // Crear promesas de eliminación para los documentos filtrados
      const deletePromises = docsToDelete.map(doc => call(deleteDoc, doc.ref));
  
      // Ejecutar todas las eliminaciones en paralelo
      yield all(deletePromises);
  
      // Despachar acción de éxito
      yield put({ type: DELETE_WHOLE_PRODUCT_SUCCESS, payload: ids });
  
      // Mostrar notificación de éxito
      toast.success(`${docsToDelete.length} producto(s) eliminado(s) del carrito con éxito`);
    } catch (error) {
      // Despachar acción de fallo con el mensaje de error
      yield put({ type: DELETE_WHOLE_PRODUCT_FAILURE, payload: error.message });
  
      // Mostrar notificación de error
      toast.error(`Error al eliminar productos: ${error.message}`);
    }
  }

export function* watchBasketSagas() {
    yield takeLatest(ADD_BASKET, addBasketSaga);
    yield takeLatest(GET_BASKET, getBasketSaga);
    yield takeLatest(EDIT_BASKET, editBasketSaga);
    yield takeLatest(DELETE_BASKET, deleteBasketSaga);
    yield takeLatest(DELETE_FULL_BASKET, deleteFullBasketSaga);
    yield takeLatest(DELETE_WHOLE_PRODUCT, deleteWholeProductSaga);
}



