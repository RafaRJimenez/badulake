import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { productsReducer } from "./productsReducer";
import { authReducer } from "./firebaseReducer";


export const rootReducer = combineReducers({
    userState: userReducer,
    products: productsReducer,
    authFirebase: authReducer
});