import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();// Crea el contexto de favoritos

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);// Exporta el hook para usar el contexto de favoritos

export const FavoritesProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [favorites, setFavorites] = useState(() => {
    // Inicializa el estado de favoritos con los videojuegos guardados en localStorage (si existen).
    return JSON.parse(localStorage.getItem(`favorites_${usuario?.id}`)) || {};
  });

  useEffect(() => {
    // Actualiza el localStorage cada vez que cambia el estado de favoritos.
    if (usuario) {
      localStorage.setItem(`favorites_${usuario.id}`, JSON.stringify(favorites));// Guarda los favoritos en localStorage
    }
  }, [favorites, usuario]);

  const addToFavorites = (perfilId, videojuego) => {// Agrega un videojuego a los favoritos del perfil
    if (favorites[perfilId] && favorites[perfilId].some((fav) => fav._id === videojuego._id)) {// Verifica si el videojuego ya está en favoritos
      toast.info('Este videojuego ya está en tus favoritos');
    } else {
      setFavorites((prevFavorites) => ({// Actualiza el estado de favoritos
        ...prevFavorites,// Mantiene los favoritos previos
        [perfilId]: [...(prevFavorites[perfilId] || []), videojuego],// Agrega el nuevo videojuego
      }));
      toast.success('Videojuego agregado a favoritos', {position: 'top-center'});
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