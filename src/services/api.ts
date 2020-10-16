import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecoswim.com.br/api/',
});

export default api;