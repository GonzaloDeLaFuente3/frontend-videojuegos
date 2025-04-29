// src/components/Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"; // logo

const Header = () => {
  const location = useLocation();
  const { state } = location;
  const perfil = state?.profile; // Obtiene el perfil del estado de navegación

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-bold">NodoGames</h1>
      </div>
      <nav>
        {perfil && (perfil.tipo === 'adulto' || perfil.tipo === 'adolescente') && (
          <>
            <Link
              to="/videojuegos/crear"
              state={{ profile: perfil }} // Asegúrate de pasar el perfil aquí
              className="mr-4 text-blue-300"
            >
              Crear Videojuego
            </Link>
            
          </>
        )}
        <Link to="/favoritos" className="text-blue-300">Favoritos</Link>
      </nav>
    </header>
  );
};

export default Header;