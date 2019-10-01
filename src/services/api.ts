import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fibra.grupotesseract.com.br/api'
})

export default api;