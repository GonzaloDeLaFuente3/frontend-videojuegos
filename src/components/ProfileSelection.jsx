/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Pencil, Trash2 } from 'lucide-react'; // Plus para agregar, X para cerrar
import VideojuegoCatalogo from './VideojuegoCatalogo';
import AddProfileForm from './AddProfileForm';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext';  // Importo toast para mostrar mensajes de éxito
import api from '../services/api.mjs';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const ProfileSelection = ({ profiles, refreshProfiles   }) => {// Se recibe la lista de perfiles y una función para refrescar la lista como props
    const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro
    const { token } = useAuth();
    const [editingProfile, setEditingProfile] = useState(null);// Estado para el perfil que se está editando
    const [selectedProfile, setSelectedProfile] = useState(null);// Estado para el perfil seleccionado
    const [showAddFormModal, setShowAddFormModal] = useState(false);// Estado para mostrar el modal de agregar perfil

    const navigate = useNavigate();

    const handleProfileSelect = (profile) => {
        navigate(`/catalogo/${profile._id}`, { state: { profile } });
        toast.success('Se Ingreso al Perfil Exitosamente');
    };

    const handleEditProfile = (profile, e) => {
        e.stopPropagation();
        setEditingProfile(profile);
        setShowAddFormModal(true);
    };

    const handleDeleteProfile = async (profileId, e) => {
        e.stopPropagation();
        const result = await Swal.fire({
            title: '¿Eliminar perfil?',
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
                await api.delete(`/perfiles/eliminar/${profileId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success('Perfil eliminado exitosamente');
                refreshProfiles(); // Actualizo la lista de perfiles
            } catch (error) {
                console.error('Error al eliminar perfil:', error);
                toast.error('Error al eliminar el perfil');
            }
        }
    };

    const handleFormSuccess = () => {
        setShowAddFormModal(false);// Cierra el modal después de agregar o editar un perfil
        setEditingProfile(null);// Reinicia el perfil en edición
        refreshProfiles(); // Actualiza la lista de perfiles
    };

    const closeModal = () => {
        setShowAddFormModal(false);
        setEditingProfile(null);
    }

    return (
        <div className={` w-full max-w-6xl flex flex-col items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-4 rounded-2xl shadow-lg`}>
            <h1 className="text-3xl font-bold mb-8 text-center">¿Quién está jugando?</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-6">
                {/* Perfiles existentes */}
                {profiles.map((profile) => (// Mapea los perfiles existentes
                <div
                    key={profile._id}
                    onClick={() => handleProfileSelect(profile)}// Selecciona el perfil
                    className={`group  p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center transition-transform transform hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-black'}`}
                >
                    {/* Botones de acción según tipo de perfil */}
                    <div className="absolute top-2 right-2 flex gap-1 z-10">
                        {profile.tipo === 'infantil' ? (
                            // Solo botón de eliminar para perfiles infantiles
                            <button
                                onClick={(e) => handleDeleteProfile(profile._id, e)}
                                className={`p-1 rounded-full ${
                                    isDarkMode ? 'bg-gray-700 text-red-400 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                                }`}
                            >
                                <Trash2 size={16} />
                            </button>
                        ) : (
                            // Botones de editar y eliminar para adultos/adolescentes
                            <>
                                {/* // Botón de editar */}
                                <button
                                    onClick={(e) => handleEditProfile(profile, e)}
                                    className={`p-1 rounded-full ${
                                        isDarkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-yellow-400 hover:bg-yellow-500'
                                    }`}
                                >
                                    <Pencil size={16} />
                                </button>
                                {/* // Botón de eliminar */}
                                <button
                                    onClick={(e) => handleDeleteProfile(profile._id, e)}
                                    className={`p-1 rounded-full ${
                                        isDarkMode ? 'bg-gray-700 text-red-400 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                                    }`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </>
                        )}
                    </div>

                    {profile.avatar ? (
                        <img
                            src={profile.avatar}
                            alt={profile.apodo}
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                    ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <span className="text-gray-500">Sin Avatar</span>
                    </div>
                    )}
                    <h2 className="text-lg font-semibold">{profile.apodo}</h2>
                    <p className="text-sm text-gray-500">Tipo: {profile.tipo}</p>
                </div>
                ))}

                {/* Tarjeta Agregar Perfil */}
                <div
                onClick={() => setShowAddFormModal(true)}// Abre el modal para agregar un nuevo perfil
                className={`group p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center justify-center transition-transform transform hover:scale-105 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-black'}`}
                >
                    <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
                        <Plus size={48} />
                    </div>
                    <h2 className="text-lg font-semibold">Agregar Perfil</h2>
                </div>
            </div>

            {/* Catálogo de videojuegos si seleccionan perfil */}
            <div className="w-full mt-10">
                {/* // Si hay un perfil seleccionado, muestra el catálogo de videojuegos */}
                {selectedProfile && <VideojuegoCatalogo perfil={selectedProfile} />}
            </div>

            {/* Modal para el Formulario */}
            {showAddFormModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg relative w-full max-w-md mx-4">
                        {/* Botón de Cerrar */}
                        <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                        >
                            <X size={24} />
                        </button>

                        {/* // Formulario para agregar perfil */}
                        <AddProfileForm 
                            profileToEdit={editingProfile} // Pasa el perfil a editar si existe
                            onSuccess={handleFormSuccess} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSelection;
