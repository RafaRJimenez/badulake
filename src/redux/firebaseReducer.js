// Reducer (en reducers/authReducer.js)
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './firebaseActions';
import { LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from './firebaseActions';

const initialState = {
    user: null,
    loading: false,
    error: null
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_IN_REQUEST:
        return { ...state, loading: true, error: null };
      case SIGN_IN_SUCCESS:
        return { ...state, loading: false, 
          user: {
            email: action.payload.user.email, // Solo almacena el email
            uid: action.payload.user.uid 
          } };
      case SIGN_IN_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: {
            code: action.payload.errorCode,
            message: action.payload.errorMessage
          }
        };
      case LOG_OUT_REQUEST:
        return { ...state, loading: true };
      case LOG_OUT_SUCCESS:
        return { ...state, loading: false, user: null };
      case LOG_OUT_FAILURE:
        return { ...state, loading: false, error: action.payload.error };
      default:
        return state;
    }
  };