import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-videojuegos-0zka.onrender.com/api',  // Asegúrate de que esta URL coincida con la de tu backend
});

export default api;