// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [favorites, setFavorites] = useState(() => {
    // Inicializa el estado de favoritos con los videojuegos guardados en localStorage (si existen).
    return JSON.parse(localStorage.getItem(`favorites_${usuario?.id}`)) || {};
  });

  useEffect(() => {
    // Actualiza el localStorage cada vez que cambia el estado de favoritos.
    if (usuario) {
      localStorage.setItem(`favorites_${usuario.id}`, JSON.stringify(favorites));
    }
  }, [favorites, usuario]);

  const addToFavorites = (perfilId, videojuego) => {
    if (favorites[perfilId] && favorites[perfilId].some((fav) => fav._id === videojuego._id)) {
      toast.info('Este videojuego ya está en tus favoritos');
    } else {
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [perfilId]: [...(prevFavorites[perfilId] || []), videojuego],
      }));
      toast.success('Videojuego agregado a favoritos', {
        position: 'top-center'
      });
    }
  };

  const removeFromFavorites = (perfilId, videojuegoId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [perfilId]: prevFavorites[perfilId].filter((fav) => fav._id !== videojuegoId),
    }));
    toast.success('Videojuego eliminado de favoritos');
  };

  const getFavorites = (perfilId) => {
    return favorites[perfilId] || [];
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, getFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};