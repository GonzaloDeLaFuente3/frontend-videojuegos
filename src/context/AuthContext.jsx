import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.mjs'; // Importa la instancia configurada de Axios

const AuthContext = createContext();// Crea el contexto de autenticación

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {// Proveedor del contexto de autenticación
    const [token, setToken] = useState(localStorage.getItem('token') || null);// Inicializa el token desde localStorage o como null
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')) || null);// Inicializa el usuario desde localStorage o como null
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            setToken(response.data.token);// Guarda el token en el estado
            setUsuario(response.data.usuario);// Guarda el usuario en el estado
            localStorage.setItem('token', response.data.token);// Guarda el token en localStorage
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario));// Guarda el usuario en localStorage
            navigate('/perfiles');// Redirige a la página perfiles después de iniciar sesión
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const register = async (nombre, email, password) => {
        try {
            const response = await api.post('/auth/registro', { nombre, email, password });
            setToken(response.data.token);
            setUsuario(response.data.usuario);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
            navigate('/perfiles');
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUsuario(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, usuario, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
};