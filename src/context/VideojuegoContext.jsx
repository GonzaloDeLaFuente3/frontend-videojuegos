/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

const VideojuegoContext = createContext();// Contexto para videojuegos

export const useVideojuego = () => useContext(VideojuegoContext);// Hook para acceder al contexto de videojuegos

export const VideojuegoProvider = ({ children }) => {
  const { token } = useAuth();// Token de autenticación del contexto de autenticación
  const location = useLocation();// Obtener la ubicación actual
  const { state } = location;// Obtener el estado de la ubicación actual
  const perfil = state?.profile;// Obtener el perfil del estado de la ubicación actual

  const [videojuegos, setVideojuegos] = useState([]);// Estado para almacenar la lista de videojuegos
  const [paginaActual, setPaginaActual] = useState(1);// Estado para almacenar la página actual
  const [totalPaginas, setTotalPaginas] = useState(1);// Estado para almacenar el total de páginas
  const [filtros, setFiltros] = useState({
    genero: '',
    plataforma: '',
    edadMinima: '',
  });// Estado para almacenar los filtros aplicados

  const fetchVideojuegos = async (pagina = 1) => {// Función para obtener la lista de videojuegos desde la API
    try {
      let filtroEdad = '';
      if (perfil.tipo === 'adolescente') {
        filtroEdad = '13';
      } else if (perfil.tipo === 'infantil') {
        filtroEdad = '7';
      }//  condiciones según los tipos de perfil

      const response = await api.get('/videojuegos', {// Realizar la solicitud GET a la API
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          genero: filtros.genero,
          plataforma: filtros.plataforma,
          edadMinima: filtros.edadMinima || filtroEdad,
          pagina,
          limite: 10,
        },
      });

      /// Validación robusta del header x-total-count, asegurando que sea un número válido
      let totalVideojuegos = 0;
      const headerCount = response.headers['x-total-count'];// Obtener el valor del header x-total-count
      
      if (headerCount) {// Verificar si el header existe
          totalVideojuegos = parseInt(headerCount, 10);// Convertir a número entero
          if (isNaN(totalVideojuegos)) {// Verificar si es un número válido
              console.error('Header x-total-count no es número válido:', headerCount);
              totalVideojuegos = response.data.length; // Fallback al conteo de elementos. fallback es una opción de seguridad
          }
      } else {
          console.warn('Header x-total-count no presente en la respuesta');// Manejar el caso donde el header no está presente
          totalVideojuegos = response.data.length; // Fallback al conteo de elementos
      }
      setVideojuegos(response.data);// Actualizar el estado de videojuegos con los datos obtenidos
      setTotalPaginas(Math.ceil(totalVideojuegos / 10));// Calcular el total de páginas y actualizo el estado
    } catch (error) {
      console.error('Error al obtener los videojuegos:', error);
    }
  };

  // useEffect para obtener los videojuegos al cargar el componente o cuando cambian los filtros, token o perfil
  useEffect(() => {
    if (perfil) {
      fetchVideojuegos(paginaActual);// Llamar a la función para obtener los videojuegos al cargar el componente
    }
  }, [perfil, token, filtros, paginaActual]);// Dependencias para el efecto: perfil, token, filtros y paginaActual

  const aplicarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setPaginaActual(1); // Reiniciar a la primera página al aplicar filtros
  };

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);// Cambiar a la página seleccionada
  };

  const crearVideojuego = async (datos) => {
    try {
      await api.post('/videojuegos/crear', datos, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Perfil-Id': perfil._id,
        },
      });
      fetchVideojuegos(paginaActual); // Actualizar la lista de videojuegos
    } catch (error) {
      console.error('Error al crear el videojuego:', error);
    }
  };

  const actualizarVideojuego = async (id, datos) => {
    try {
      await api.put(`/videojuegos/actualizar/${id}`, datos, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Perfil-Id': perfil._id,
        },
      });
      fetchVideojuegos(paginaActual); // Actualizar la lista de videojuegos
    } catch (error) {
      console.error('Error al actualizar el videojuego:', error);
    }
  };

  const eliminarVideojuego = async (id) => {
    try {
      await api.delete(`/videojuegos/eliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Perfil-Id': perfil._id,// Enviar el ID del perfil en la cabecera
        },
      });
      fetchVideojuegos(paginaActual); // Actualizar la lista de videojuegos
    } catch (error) {
      console.error('Error al eliminar el videojuego:', error);
    }
  };

  return (
    <VideojuegoContext.Provider value={{ videojuegos, paginaActual, totalPaginas, aplicarFiltros, cambiarPagina, crearVideojuego, actualizarVideojuego, eliminarVideojuego }}>
      {children}
    </VideojuegoContext.Provider>
  );
};


