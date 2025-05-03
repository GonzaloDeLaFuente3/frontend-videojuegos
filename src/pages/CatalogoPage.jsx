import React from 'react';
import { useLocation } from 'react-router-dom';
import VideojuegoCatalogo from '../components/VideojuegoCatalogo';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Importa el contexto de tema

const CatalogoPage = () => {
    const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro
    const location = useLocation();// Obtiene la ubicación actual
    const { profile } = location.state || {};// Obtiene el perfil del estado de la ubicación

    if (!profile) {// Si no hay perfil, muestra un mensaje
        return <div className="text-center mt-10">No se seleccionó ningún perfil.</div>;
    }

    return (
        <div className= {`min-h-screen  p-6 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center`}>
            <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de {profile.apodo}</h1>
            <VideojuegoCatalogo perfil={profile} />
        </div>
    );
};

export default CatalogoPage;
