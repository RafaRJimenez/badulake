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
    const exists = state.basket.some(item => item.id === action.payload.id);
    const updatedBasket = exists
        ? state.basket.map(item => item.id === action.payload.id ? action.payload : item)
        : [...state.basket, action.payload];
    return { ...state, loading: false, basket: updatedBasket };
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
            const updatedBaskets = state.basket.map(item => item.id === action.payload.id ? action.payload : item);
            return { ...state, loading: false, basket: updatedBaskets };
        case EDIT_BASKET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_BASKET:
            return { ...state, loading: true, error: null };
        case DELETE_BASKET_SUCCESS:
           {
            // payload: { id: userId, productId }
            const { id, productId } = action.payload;
            const updatedBasket = state.basket.map(cart => {
                if (cart.id !== id) return cart;
                // Decrementa cantidad o elimina producto si llega a 0
                const updatedProducts = (cart.products || []).reduce((acc, prod) => {
                    if (String(prod.id) !== String(productId)) {
                        acc.push(prod);
                    } else if ((prod.quantity || 1) > 1) {
                        acc.push({ ...prod, quantity: (prod.quantity || 1) - 1 });
                    }
                    // Si quantity era 1, no lo añade (lo elimina)
                    return acc;
                }, []);
                return { ...cart, products: updatedProducts };
            }).filter(cart => !(cart.id === id && cart.products.length === 0)); // elimina carrito si queda vacío
            return { ...state, loading: false, basket: updatedBasket };
        }
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
