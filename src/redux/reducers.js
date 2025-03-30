import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { productsReducer } from "./productsReducer";
import { authReducer } from "./firebaseReducer";
import { basketReducer } from "./basketReducer";


export const rootReducer = combineReducers({
    userState: userReducer,
    products: productsReducer,
    authFirebase: authReducer,
    basket: basketReducer
});