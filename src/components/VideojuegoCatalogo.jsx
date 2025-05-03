/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useVideojuego } from '../context/VideojuegoContext';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Pencil, Trash2, Heart } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useFavorites } from '../context/FavoritesContext';
import { ThemeContext } from '../context/ThemeContext';

const VideojuegoCatalogo = ({ perfil }) => {
  const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro

  const { videojuegos, paginaActual, totalPaginas, aplicarFiltros, cambiarPagina, eliminarVideojuego } = useVideojuego();// Obtiene los videojuegos y funciones del contexto de videojuegos
  const [filtrosLocales, setFiltrosLocales] = useState({
    genero: '',
    plataforma: '',   
    edadMinima: '',
  });// Estado local para almacenar los filtros aplicados
  const navigate = useNavigate();// Navegador para redirigir después de eliminar un videojuego
  const { addToFavorites } = useFavorites();

  useEffect(() => {// Efecto para aplicar los filtros locales al cargar el componente
    if (perfil) {
      aplicarFiltros(filtrosLocales); // Aplica los filtros locales al cargar el componente
    }
  }, [perfil]);

  const handleFiltroChange = (e) => {// Manejo de cambios en los filtros
    const { name, value } = e.target;// Obtiene el nombre y valor del filtro
    setFiltrosLocales((prev) => ({// Obtiene el estado anterior y actualiza el filtro correspondiente
      ...prev,// Actualiza el estado de los filtros locales
      [name]: value,// Actualiza el filtro correspondiente
    }));
  };

  const handleAplicarFiltros = () => {
    aplicarFiltros(filtrosLocales);
  };

  const handleLimpiarFiltros = () => {
    setFiltrosLocales({// Reinicia los filtros locales a su estado inicial
      genero: '',
      plataforma: '',
      edadMinima: '',
    });
    aplicarFiltros({// Aplica los filtros vacíos para mostrar todos los videojuegos
      genero: '',
      plataforma: '',
      edadMinima: '',
    });
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar videojuego?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await eliminarVideojuego(id);
        toast.success('Videojuego eliminado exitosamente');
        navigate(`/catalogo/${perfil._id}`, { state: { profile: perfil } });// Redirige al catálogo después de eliminar
      } catch (error) {
        toast.error('Error al eliminar el videojuego');
      }
    }
  };

  const handleAddToFavorites = (videojuego) => {// Manejo de agregar a favoritos
    addToFavorites(perfil._id, videojuego);
  };

  if (!videojuegos) {// Verifica si la lista de videojuegos está vacía o no se ha cargado
    return <div>Cargando...</div>; // Manejo de estado de carga
  }

  return (
    <div>
      {/* //Manejar los filtros de búsqueda */}
      <div className={` p-4 rounded-lg shadow-md mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-400 text-black'}`}>
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-3">
            {/* //genero */}
            <input
              type="text"
              name="genero"
              placeholder="Género"
              value={filtrosLocales.genero}
              onChange={handleFiltroChange}
              className={`  px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-black'
              }`} 
            />
            {/* //plataforma */}
            <input
              type="text"
              name="plataforma"
              placeholder="Plataforma"
              value={filtrosLocales.plataforma}
              onChange={handleFiltroChange}
              className={`  px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-black'
              }`} 
            />
            {/* //edad minima */}
            <input
              type="number"
              name="edadMinima"
              placeholder="Edad mínima"
              value={filtrosLocales.edadMinima}
              onChange={handleFiltroChange}
              className={`  px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-black'
              }`} 
            />
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0">
            {/* // Botones para aplicar s */}
            <button
              onClick={handleAplicarFiltros}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors hover:cursor-pointer"
            >
              Aplicar Filtros
            </button>
            {/* // Botón para limpiar los filtros */}
            <button
              onClick={handleLimpiarFiltros}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors hover:cursor-pointer"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {videojuegos.map((videojuego) => (// Mapeo de la lista de videojuegos
          <div
            key={videojuego._id}
            className={`rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 relative ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-black'
            }`}
          >
            {/* // Imagen del videojuego */}
            <img
              src={videojuego.imgUrl}
              alt={videojuego.titulo}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              {/* // Título y detalles del videojuego */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold truncate">{videojuego.titulo}</h2>
                <Gamepad2 className="text-blue-500" size={24} />
              </div>

              <p className= {`text-sm  mt-1 ${isDarkMode ? 'text-gray-300':'text-gray-600'}`}>Género: {videojuego.genero.join(', ')}</p>
              <p className={`text-sm  mt-1 ${isDarkMode ? 'text-gray-300':'text-gray-600'}`}>Plataforma: {videojuego.plataforma.join(', ')}</p>

              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  {videojuego.edadMinima}+ años
                </span>
              </div>
              {/* // Botones de editar y eliminar */}
              {(perfil.tipo === 'adulto' || perfil.tipo === 'adolescente') && (
                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    to={`/videojuegos/editar/${videojuego._id}`}// Enlace para editar el videojuego
                    state={{ profile: perfil }}// Estado del perfil
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm shadow"
                  >
                    <Pencil size={16} />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleEliminar(videojuego._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm shadow hover:cursor-pointer"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              )}
              {/* // Botón para agregar a favoritos */}
              <button
                onClick={() => handleAddToFavorites(videojuego)}
                className="text-red-500 mt-2 flex items-center hover:cursor-pointer hover:text-red-800"
              >
                <Heart className="mr-1" size={20} /> Agregar a Favoritos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* // Paginación */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        {/* // boton de anterior */}
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}// Cambia a la página anterior
          disabled={paginaActual === 1}// Deshabilita el botón si está en la primera página
          className={`px-4 py-2 rounded-md text-white transition-colors ${
            paginaActual === 1
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'
          }`}
        >
          Anterior
        </button>
        {/* // Información de la paginación */}
        <span className= {` ${isDarkMode ? 'text-gray-100' : 'text-gray-500'}`}>
          Página <span className="font-bold">{paginaActual}</span> de{' '}
          <span className="font-bold">{!isNaN(totalPaginas) ? totalPaginas : '1'}</span>
        </span>

        {/* // boton de siguiente */}
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}// Deshabilita el botón si está en la última página
          className={`px-4 py-2 rounded-md text-white transition-colors ${
            paginaActual === totalPaginas
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default VideojuegoCatalogo;



