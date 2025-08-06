export const API_CALL_REQUEST = 'API_CALL_REQUEST'; // Watcher Saga Listens
export const API_CALL_SUCCESS = 'API_CALL_SUCCESS'; // Worker Saga Dispatches
export const API_CALL_FAILURE = 'API_CALL_FAILURE';
export const API_CALL_REQUEST_CATEGORIES = 'API_CALL_REQUEST_CATEGORIES'; // Watcher Saga Listens
export const API_CALL_SUCCESS_CATEGORIES = 'API_CALL_SUCCESS_CATEGORIES'; // Worker Saga Dispatches
export const API_CALL_FAILURE_CATEGORIES = 'API_CALL_FAILURE_CATEGORIES'; // Worker Saga Dispatches
export const API_CALL_REQUEST_BY_CATEGORY = 'API_CALL_REQUEST_BY_CATEGORY'; // Watcher Saga Listens
export const API_CALL_SUCCESS_BY_CATEGORY = 'API_CALL_SUCCESS_BY_CATEGORY'; // Worker Saga Dispatches
export const API_CALL_FAILURE_BY_CATEGORY = 'API_CALL_FAILURE_BY_CATEGORY'; // Worker Saga Dispatches
export const API_CALL_FEATURED = 'API_CALL_FEATURED'; // Watcher Saga Listens
export const API_CALL_SUCCESS_FEATURED = 'API_CALL_SUCCESS_FEATURED'; // Worker Saga Dispatches
export const API_CALL_FAILURE_FEATURED = 'API_CALL_FAILURE_FEATURED'; // Worker Saga Dispatches
export const API_CALL_PEOPLE_ALSO_BUY = 'API_CALL_PEOPLE_ALSO_BUY'; // Watcher Saga Listens
export const API_CALL_SUCCESS_PEOPLE_ALSO_BUY = 'API_CALL_SUCCESS_PEOPLE_ALSO_BUY'; // Worker Saga Dispatches
export const API_CALL_FAILURE_PEOPLE_ALSO_BUY = 'API_CALL_FAILURE_PEOPLE_ALSO_BUY'; // Worker Saga Dispatches


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

export const httpRequestCategories = (method, url, page) => {
  const limit = 12;
  const skip = (page - 1) * limit;
  return {
    type: API_CALL_REQUEST_BY_CATEGORY,
    payload: {
      request: {
        method: method,
        url: `${url}?limit=${limit}&skip=${skip}`
      },
      okAction: API_CALL_SUCCESS_BY_CATEGORY,
      failAction: API_CALL_FAILURE_BY_CATEGORY,
    }
  }
}


export const fetchRandomProduct = (total) => {
  const limit = 1;
  const skip = Math.floor(Math.random() * total);
  return {
    type: API_CALL_FEATURED, // Puedes crear una acción específica o reutilizar API_CALL_REQUEST
    payload: {
      request: {
        method: 'get',
        url: `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      },
      okAction: API_CALL_SUCCESS_FEATURED,
      failAction: API_CALL_FAILURE_FEATURED,
      context: 'featured',
    },
  };
};


export const fetchPeopleAlsoBuy = (total, count = 3) => {
  const indices = [];
  while (indices.length < count) {
    const idx = Math.floor(Math.random() * total);
    if (!indices.includes(idx)) indices.push(idx);
  }
  const requests = indices.map(idx => ({
    method: 'get',
    url: `https://dummyjson.com/products?limit=1&skip=${idx}`,
  }));
  return {
    type: API_CALL_PEOPLE_ALSO_BUY,
    payload: {
      requests,
      okAction: API_CALL_SUCCESS_PEOPLE_ALSO_BUY,
      failAction: API_CALL_FAILURE_PEOPLE_ALSO_BUY,
      context: 'peopleAlsoBuy',
    },
  };
};






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