export const SET_TOKEN = 'SET_TOKEN';
const setToken = token => ({
    type: SET_TOKEN,
    token
});

export const CLEAR_TOKEN = 'CLEAR_TOKEN';
const clearToken = () => ({
    type: CLEAR_TOKEN,
});

export const getStoredUserToken = () => dispatch => {
    const userToken = localStorage.getItem('userToken');
    if ( userToken ) {
      const action = setToken(userToken);
      dispatch(action);
      return Promise.resolve(userToken);
    } 
    if ( !userToken ) {
      const action = clearToken();
      dispatch(action);
      return Promise.reject({error: "no token found"});
    }
};

export const tryLogin = ( email, password ) => dispatch => {

    return loginApi(email, password)
        .then(res => {
            // Caso não tenha recebido token
            // envia o retorno
            if(!res.data || !res.data.token) {
              const action = clearToken();
              dispatch(action);
              return Promise.reject(res);
            }

            const userToken = res.data.token;
            const action = setToken(userToken);
            dispatch(action);

            localStorage.setItem('userToken', userToken);
            
            return userToken;
        })
        .catch(error => {
            const action = clearToken();
            dispatch(action);
            return Promise.reject(error);
        });
};

export const logoff = () => dispatch => {
  localStorage.removeItem('userToken')
  const action = clearToken();
  dispatch(action);
  return Promise.resolve();
};


// Funções da API
const apiUrl = "https://api-tesseract.com.br"
const loginApi = (email, password) => {

    const jsonForm = {
      email,
      password
    };

    return fetch(apiUrl+"/Authenticate", {
      accept: "application/json",
      method: "POST",
      body: JSON.stringify(jsonForm),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(jsonData => {
      return jsonData.json();
    })
    .catch(err => err);
}
