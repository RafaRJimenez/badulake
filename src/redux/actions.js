export const API_CALL_REQUEST_USER = 'API_CALL_REQUEST_USER'; // Watcher Saga Listens
export const API_CALL_SUCCESS_USER = 'API_CALL_SUCCESS_USER'; // Worker Saga Dispatches
export const API_CALL_FAILURE_USER = 'API_CALL_FAILURE_USER'; // Worker Saga Dispatches

export const login = (email, password) => {
    return {
        type: API_CALL_REQUEST_USER,
        payload: {
            request: {
                method:"post",
                   url:"https://reqres.in/api/login",
                   data:{
                       email:email,
                       password:password
                   }
                },
            okAction: API_CALL_SUCCESS_USER,
            failAction: API_CALL_FAILURE_USER
        }
    }
}

// Generic HttpRequest Action dispatcher 

export const httpRequest = (method, url, data) => {
    return {
        type: API_CALL_REQUEST_USER,
        payload: {
            request: {
                method: method,
                url: url,
                data: data,
            },
            okAction: API_CALL_SUCCESS_USER,
            failAction: API_CALL_FAILURE_USER
        }
    }
}