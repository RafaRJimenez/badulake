import { SET_PAGE, API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE, API_CALL_REQUEST_CATEGORIES, 
    API_CALL_SUCCESS_CATEGORIES, API_CALL_FAILURE_CATEGORIES  } from './productActions';



const initialState = {
    fetching: false,
    products: [],
    categories: [],
    error: null,
    filters: {},
    sort: {},
    page: 1,
    total: 0,
    limit: 6,
    pages: 0
};


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };
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
        case API_CALL_REQUEST_CATEGORIES:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case API_CALL_SUCCESS_CATEGORIES:
            return {
                ...state,
                fetching: false,
                categories: action.payload,
                error: null,
            };
        case API_CALL_FAILURE_CATEGORIES:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}