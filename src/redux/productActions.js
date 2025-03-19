export const API_CALL_REQUEST = 'API_CALL_REQUEST'; // Watcher Saga Listens
export const API_CALL_SUCCESS = 'API_CALL_SUCCESS'; // Worker Saga Dispatches
export const API_CALL_FAILURE = 'API_CALL_FAILURE';



export const fetchProducts = (page = 1, filters = {}, sort = {}) => {
    const limit = 6;
    const skip = (page - 1) * limit; // DummyJSON usa skip en lugar de page
    return {
      type: API_CALL_REQUEST,
      payload: {
        request: {
          method: 'get',
          url: `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        },
        okAction: API_CALL_SUCCESS,
        failAction: API_CALL_FAILURE,
        context: 'products',
        filters, // Guardamos filtros para procesarlos en el frontend
        sort,   // Guardamos sort para procesarlos en el frontend
      },
    };
  };