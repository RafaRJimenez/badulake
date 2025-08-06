import { SET_PAGE, API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE, API_CALL_REQUEST_CATEGORIES, 
    API_CALL_SUCCESS_CATEGORIES, API_CALL_FAILURE_CATEGORIES,
    API_CALL_REQUEST_BY_CATEGORY, API_CALL_SUCCESS_BY_CATEGORY, API_CALL_FAILURE_BY_CATEGORY,
    API_CALL_FEATURED, API_CALL_SUCCESS_FEATURED, API_CALL_FAILURE_FEATURED,
    API_CALL_PEOPLE_ALSO_BUY, API_CALL_SUCCESS_PEOPLE_ALSO_BUY, API_CALL_FAILURE_PEOPLE_ALSO_BUY

  } from './productActions';



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
    pages: 0,
    featured: null,
    peopleAlsoBuy: [],
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
        case API_CALL_REQUEST_BY_CATEGORY:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case API_CALL_SUCCESS_BY_CATEGORY:
            return {
                ...state,
                fetching: false,
                products: action.payload, // Assuming the response has a 'products' field
                total: action.payload.total, // Assuming the response has a 'total' field
                limit: action.payload.limit, // Assuming the response has a 'limit' field
                pages: Math.ceil(action.payload.total / action.payload.limit), // Calculate total pages
                error: null,
            };
        case API_CALL_FAILURE_BY_CATEGORY:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
            };
        case API_CALL_FEATURED:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case API_CALL_SUCCESS_FEATURED:
            return {
                ...state,
                fetching: false,
                featured: action.payload.products[0], // Assuming the response has a 'products' field
                error: null,
            };
        case API_CALL_FAILURE_FEATURED:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
            };
        case API_CALL_PEOPLE_ALSO_BUY:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case API_CALL_SUCCESS_PEOPLE_ALSO_BUY:
            return {
                ...state,
                fetching: false,    
                peopleAlsoBuy: action.payload, // Assuming the response has a 'products' field
                error: null,
            };
        case API_CALL_FAILURE_PEOPLE_ALSO_BUY:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}