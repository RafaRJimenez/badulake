//Initial State for userState

import { API_CALL_REQUEST_USER, API_CALL_SUCCESS_USER, API_CALL_FAILURE_USER } from './actions';

const initialState = {
    fetching: false,
    token: null,
    error: null,
    loged: false,
};

export const userReducer = (state = initialState, action) => {  
    switch (action.type) {
        case API_CALL_REQUEST_USER:
            return {
                ...state,
                fetching: true,
                error: null,
                loged:false
            };
        case API_CALL_SUCCESS_USER:
            return {
                ...state,
                fetching: false,
                token: action.payload.token,
                error: null,
                loged: true,
            };
        case API_CALL_FAILURE_USER:
            return {
                ...state,
                fetching: false,
                token: null,
                error: action.payload.error,
                loged: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                fetching: false,
                token: null,
                loged: false,
            };
        default:
            return state;
    }
}

