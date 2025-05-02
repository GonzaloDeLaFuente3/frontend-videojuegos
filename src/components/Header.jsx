/* eslint-disable no-unused-vars */
// src/components/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import {
  PlusCircle,
  Gamepad2,
  UserRound,
  Heart,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import logo from "../assets/logo.png";
import FavoritesModal from './FavoritesModal';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext'; // Importa el contexto de favoritos
import { ThemeContext } from '../context/ThemeContext'; // Importa el contexto de tema

const Header = () => {
  const location = useLocation();
  const { state } = location;
  const perfil = state?.profile;
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  const { getFavorites } = useFavorites(); // Obtenemos la función para obtener favoritos
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Obtenemos el estado del tema y la función para alternar

   // Obtenemos los favoritos del perfil actual
  const favorites = perfil ? getFavorites(perfil._id) : [];
  const favoritesCount = favorites.length;

  const isCatalogoPage = location.pathname.startsWith('/catalogo/');
  const isPerfilesPage = location.pathname === '/perfiles';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({ rotate: 360, transition: { duration: 1 } })
        .then(() => controls.set({ rotate: 0 }));
    }, 6000);

    return () => clearInterval(interval);
  }, [controls]);

  const IconButton = ({ to, state, icon: Icon, label }) => (
    <Link
      to={to}
      state={state}
      className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-all duration-300 ease-in-out"
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );

  const { logout } = useAuth();//  Obtenemos la función de cierre de sesión del contexto de autenticación

  const handleLogout = () => {
    logout();  // Limpia sesión y redirige automáticamente
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={` px-6 py-4 shadow-md sticky top-0 z-50 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-500 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo y título */}
        <div className="flex items-center gap-3 ">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full "
            animate={controls}
          />
          <h1 className="text-2xl font-bold tracking-tight text-white">NodoGames</h1>
        </div>

        {/* Navegación */}
        <nav className="flex flex-wrap gap-3 items-center justify-center">
          {perfil && (perfil.tipo === 'adulto' || perfil.tipo === 'adolescente') && (
            <IconButton
              to="/videojuegos/crear"
              state={{ profile: perfil }}
              icon={PlusCircle}
              label="Crear Videojuego"
            />
          )}

          {!isCatalogoPage && !isPerfilesPage && !isLoginPage && !isRegisterPage && (
            <IconButton
              to={`/catalogo/${perfil?._id}`}
              state={{ profile: perfil }}
              icon={Gamepad2}
              label="Catálogo"
            />
          )}

          {!isPerfilesPage && !isLoginPage && !isRegisterPage && (
            <IconButton
              to="/perfiles"
              icon={UserRound}
              label="Perfiles"
            />
          )}

          {/* // Botón de favoritos */}

          {isCatalogoPage && (
            <button
              onClick={() => setShowFavoritesModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-800 transition-all duration-300 relative"
            >
              <Heart size={18} />
              <span>Favoritos</span>
              {/* Contador de favoritos */}
              {favoritesCount > 0 && (
                <motion.span
                key={favoritesCount}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {favoritesCount}
                </motion.span>
              )}
            </button>
          )}

          {/* Botón de tema oscuro/claro */}
          <motion.button
            onClick={toggleTheme}// Cambia el tema al hacer clic
            className={`p-2 rounded-full hover:cursor-pointer ${
              isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-700 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>


          {/* Cerrar sesión */}
          {!isLoginPage && !isRegisterPage && (
            <button
              onClick={handleLogout}
              className="hover:cursor-pointer inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all duration-300"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          )}
        </nav>
      </div>

      {/* Modal de favoritos */}
      {showFavoritesModal && (
        <FavoritesModal perfil={perfil} onClose={() => setShowFavoritesModal(false)} />
      )}
    </motion.header>
  );
};

export default Header;
