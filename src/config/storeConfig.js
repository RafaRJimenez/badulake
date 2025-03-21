import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../redux/reducers";
import { rootSaga } from "../redux/rootSaga";


export const createAppAsyncStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
        devTools: process.env.NODE_ENV !== "production",
    });

    // We init the Watcher Saga
    sagaMiddleware.run(rootSaga);
    
    return store;
}