import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-videojuegos-0zka.onrender.com/api',  //  URL que coincide con la del backend
});

export default api;