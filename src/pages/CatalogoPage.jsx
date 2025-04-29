// src/pages/CatalogoPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import VideojuegoCatalogo from '../components/VideojuegoCatalogo';

const CatalogoPage = () => {
    const location = useLocation();// Obtiene la ubicación actual
    const { profile } = location.state || {};// Obtiene el perfil del estado de la ubicación

    if (!profile) {// Si no hay perfil, muestra un mensaje
        return <div className="text-center mt-10">No se seleccionó ningún perfil.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de {profile.apodo}</h1>
            <VideojuegoCatalogo perfil={profile} />
        </div>
    );
};

export default CatalogoPage;
