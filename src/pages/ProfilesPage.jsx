/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileSelection from '../components/ProfileSelection';
import api from '../services/api.mjs'; // Importa la instancia configurada de Axios
import { ThemeContext } from '../context/ThemeContext'; // Importa el contexto de tema

// Esta página permite a los usuarios seleccionar un perfil o agregar uno nuevo.
const ProfilesPage = () => {
    const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro

    const { token } = useAuth();
    const [profiles, setProfiles] = useState([]);

    const fetchProfiles = async () => {
        try {
            const response = await api.get('/perfiles', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProfiles(response.data);
        } catch (error) {
            console.error('Error al obtener perfiles:', error);
        }
    };
    
    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div className={`min-h-screen bg-gray-100 p-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} flex flex-col items-center justify-center`}>
            <h1 className="text-2xl font-bold mb-4 text-center">Por Favor Seleccione un Perfil</h1>
            <ProfileSelection profiles={profiles} refreshProfiles={fetchProfiles}  />
        </div>
    );
};

export default ProfilesPage;