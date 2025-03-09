import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../redux/reducers";
import { watcherSaga } from "../redux/sagas";


export const createAppAsyncStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
        devTools: process.env.NODE_ENV !== "production",
    });

    // We init the Watcher Saga
    sagaMiddleware.run(watcherSaga);
    
    return store;
}