/* eslint-disable react-hooks/exhaustive-deps */
// src/context/VideojuegoContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

const VideojuegoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useVideojuego = () => useContext(VideojuegoContext);

export const VideojuegoProvider = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  const { state } = location;
  const perfil = state?.profile; // Obtiene el perfil del estado de navegación

  const [videojuegos, setVideojuegos] = useState([]);

  const fetchVideojuegos = async () => {
    try {
      let filtroEdad = '';
      if (perfil.tipo === 'adolescente') {
        filtroEdad = '13';
      } else if (perfil.tipo === 'infantil') {
        filtroEdad = '7';
      }

      const response = await api.get('/videojuegos', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: { edadMinima: filtroEdad },
      });
      setVideojuegos(response.data);
    } catch (error) {
      console.error('Error al obtener los videojuegos:', error);
    }
  };

  useEffect(() => {
    if (perfil) {
      fetchVideojuegos();
    }
  }, [perfil, token]);

  const crearVideojuego = async (datos) => {
    try {
      await api.post('/videojuegos/crear', datos, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Perfil-Id': perfil._id, // Asegúrate de pasar el ID del perfil
        },
      });
      fetchVideojuegos(); // Actualizar la lista de videojuegos
    } catch (error) {
      console.error('Error al crear el videojuego:', error);
    }
  };

  const actualizarVideojuego = async (id, datos) => {
    try {
      await api.put(`/videojuegos/actualizar/${id}`, datos, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Perfil-Id': perfil._id, // Asegúrate de pasar el ID del perfil
        },
      });
      fetchVideojuegos(); // Actualizar la lista de videojuegos
    } catch (error) {
      console.error('Error al actualizar el videojuego:', error);
    }
  };

  const eliminarVideojuego = async (id) => {
    try {
      await api.delete(`/videojuegos/eliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Perfil-Id': perfil._id, // Asegúrate de pasar el ID del perfil
        },
      });
      fetchVideojuegos(); // Actualizar la lista de videojuegos
    } catch (error) {
      console.error('Error al eliminar el videojuego:', error);
    }
  };

  return (
    <VideojuegoContext.Provider value={{ videojuegos, crearVideojuego, actualizarVideojuego, eliminarVideojuego }}>
      {children}
    </VideojuegoContext.Provider>
  );
};