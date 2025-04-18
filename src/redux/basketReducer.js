import { ADD_BASKET, ADD_BASKET_SUCCESS, 
    ADD_BASKET_FAILURE, GET_BASKET, GET_BASKET_SUCCESS, GET_BASKET_FAILURE, EDIT_BASKET, EDIT_BASKET_SUCCESS,
     EDIT_BASKET_FAILURE, DELETE_BASKET, DELETE_BASKET_SUCCESS, DELETE_BASKET_FAILURE,
    DELETE_FULL_BASKET, DELETE_FULL_BASKET_SUCCESS, DELETE_FULL_BASKET_FAILURE, DELETE_WHOLE_PRODUCT, DELETE_WHOLE_PRODUCT_SUCCESS, DELETE_WHOLE_PRODUCT_FAILURE } from "./basketActions";



const initialState = {
    basket: [],
    loading: false,
    error: null
};

export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BASKET:
            return { ...state, loading: true, error: null };
        case ADD_BASKET_SUCCESS:
            return { ...state, loading: false, basket: [...state.basket, action.payload] };
        case ADD_BASKET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case GET_BASKET:
            return { ...state, loading: true, error: null };
        case GET_BASKET_SUCCESS:
            return { ...state, loading: false, basket: action.payload };
        case GET_BASKET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_BASKET:
            return { ...state, loading: true, error: null };
        case EDIT_BASKET_SUCCESS:
            const updatedBasket = state.basket.map(item => item.id === action.payload.id ? action.payload : item);
            return { ...state, loading: false, basket: updatedBasket };
        case EDIT_BASKET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_BASKET:
            return { ...state, loading: true, error: null };
        case DELETE_BASKET_SUCCESS:
            const filteredBasket = state.basket.filter(item => item.id !== action.payload);
            return { ...state, loading: false, basket: filteredBasket };
        case DELETE_BASKET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_FULL_BASKET:
            return { ...state, loading: true, error: null };
        case DELETE_FULL_BASKET_SUCCESS:
            return { ...state, loading: false, basket: [] };
        case DELETE_FULL_BASKET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_WHOLE_PRODUCT:
            return { ...state, loading: true, error: null };
            case DELETE_WHOLE_PRODUCT_SUCCESS:
                const updatedBasketAfterDelete = state.basket.filter(item => !action.payload.includes(item.id));
                return { ...state, loading: false, basket: updatedBasketAfterDelete };
        case DELETE_WHOLE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
export default basketReducer;
