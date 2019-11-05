import axios from 'axios';
import { string } from 'prop-types';

const api = axios.create({
    baseURL: 'https://develop.fibra.grupotesseract.com.br/api'
})

export const setToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export const clearToken = () => {
    api.defaults.headers.common['Authorization'] = "";
}

export const login = ({ email, password }) =>
    api.post('login', {
        email,
        password
    })
    .then(response => {
        const data = response.data.data;
        const { id, nome } = data.usuario;
        const { token } = data.token;
        return {
            id,
            nome,
            token 
        }
    })
    .catch(error => ({ error }));

export default api;