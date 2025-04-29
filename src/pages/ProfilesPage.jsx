import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileSelection from '../components/ProfileSelection';
import AddProfileForm from '../components/AddProfileForm';
import api from '../services/api.mjs'; // Importa la instancia configurada de Axios

// Esta página permite a los usuarios seleccionar un perfil o agregar uno nuevo.

const ProfilesPage = () => {
    const { token } = useAuth();
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
        try {
            const response = await api.get('/perfiles', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });
            setProfiles(response.data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
        };

        fetchProfiles();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Selecciona un Perfil</h1>
            <ProfileSelection profiles={profiles} />
            {/* <AddProfileForm /> */}
        </div>
    );
};

export default ProfilesPage;