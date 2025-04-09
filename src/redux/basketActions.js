export const ADD_BASKET = 'ADD_BASKET';
export const ADD_BASKET_SUCCESS = 'ADD_BASKET_SUCCESS';
export const ADD_BASKET_FAILURE = 'ADD_BASKET_FAILURE';

export const GET_BASKET = 'GET_BASKET';
export const GET_BASKET_SUCCESS = 'GET_BASKET_SUCCESS';
export const GET_BASKET_FAILURE = 'GET_BASKET_FAILURE';

export const EDIT_BASKET = 'EDIT_BASKET';
export const EDIT_BASKET_SUCCESS = 'EDIT_BASKET_SUCCESS';
export const EDIT_BASKET_FAILURE = 'EDIT_BASKET_FAILURE';

export const DELETE_BASKET = 'DELETE_BASKET';
export const DELETE_BASKET_SUCCESS = 'DELETE_BASKET_SUCCESS';
export const DELETE_BASKET_FAILURE = 'DELETE_BASKET_FAILURE';

export const DELETE_FULL_BASKET = 'DELETE_FULL_BASKET';
export const DELETE_FULL_BASKET_SUCCESS = 'DELETE_FULL_BASKET_SUCCESS';
export const DELETE_FULL_BASKET_FAILURE = 'DELETE_FULL_BASKET_FAILURE';

export const DELETE_WHOLE_PRODUCT = 'DELETE_WHOLE_PRODUCT';
export const DELETE_WHOLE_PRODUCT_SUCCESS = 'DELETE_WHOLE_PRODUCT_SUCCESS';
export const DELETE_WHOLE_PRODUCT_FAILURE = 'DELETE_WHOLE_PRODUCT_FAILURE';


export const addBasket = (product) => ({
  type: ADD_BASKET,
  payload: product
});

export const editBasket = (product) => ({
  type: EDIT_BASKET,
  payload: product
});

export const deleteBasket = (productId) => ({
  type: DELETE_BASKET,
  payload: productId
});

export const getBasket = () => ({
  type: GET_BASKET
});


export const deleteFullBasket = () => ({
  type: DELETE_FULL_BASKET,
  payload: null
});


export const deleteWholeProduct = (productId) => ({
  type: DELETE_WHOLE_PRODUCT,
  payload: productId
});

