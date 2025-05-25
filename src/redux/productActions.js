export const API_CALL_REQUEST = 'API_CALL_REQUEST'; // Watcher Saga Listens
export const API_CALL_SUCCESS = 'API_CALL_SUCCESS'; // Worker Saga Dispatches
export const API_CALL_FAILURE = 'API_CALL_FAILURE';
export const API_CALL_REQUEST_CATEGORIES = 'API_CALL_REQUEST_CATEGORIES'; // Watcher Saga Listens
export const API_CALL_SUCCESS_CATEGORIES = 'API_CALL_SUCCESS_CATEGORIES'; // Worker Saga Dispatches
export const API_CALL_FAILURE_CATEGORIES = 'API_CALL_FAILURE_CATEGORIES'; // Worker Saga Dispatches
export const API_CALL_REQUEST_BY_CATEGORY = 'API_CALL_REQUEST_BY_CATEGORY'; // Watcher Saga Listens
export const API_CALL_SUCCESS_BY_CATEGORY = 'API_CALL_SUCCESS_BY_CATEGORY'; // Worker Saga Dispatches
export const API_CALL_FAILURE_BY_CATEGORY = 'API_CALL_FAILURE_BY_CATEGORY'; // Worker Saga Dispatches

export const SET_PAGE = 'SET_PAGE';


export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};


export const fetchProducts = (page = 1, filters = {}, sort = {}) => {
    const limit = 12;
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

  export const httpRequest = (method, url) => {
      return {
          type: API_CALL_REQUEST_CATEGORIES,
          payload: {
              request: {
                  method: method,
                  url: url
              },
              okAction: API_CALL_SUCCESS_CATEGORIES,
              failAction: API_CALL_FAILURE_CATEGORIES,
          }
      }
  }

  export const httpRequestCategories = (method, url) => {
    return {
        type: API_CALL_REQUEST_BY_CATEGORY,
        payload: {
            request: {
                method: method,
                url: url
            },
            okAction: API_CALL_SUCCESS_BY_CATEGORY,
            failAction: API_CALL_FAILURE_BY_CATEGORY,
        }
    }
}



  
//   export const httpRequest = (method, url, data) => {
//     return {
//         type: API_CALL_REQUEST,
//         payload: {
//             request: {
//                 method: method,
//                 url: url,
//                 data: data,
//             },
//             okAction: API_CALL_SUCCESS,
//             failAction: API_CALL_FAILURE
//         }
//     }
// }