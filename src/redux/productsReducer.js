import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from './productActions';


const initialState = {
    fetching: false,
    products: [],
    error: null,
    filters: {},
    sort: {},
    page: 1,
    total: 0,
    limit: 6,
};


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case API_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                products: action.payload,
                error: null,
            };
        case API_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}