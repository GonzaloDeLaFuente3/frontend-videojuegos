import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react'; // Plus para agregar, X para cerrar
import VideojuegoCatalogo from './VideojuegoCatalogo';
import AddProfileForm from './AddProfileForm';
import { toast } from 'react-toastify'; // Importa toast para mostrar mensajes de éxito

const ProfileSelection = ({ profiles }) => {
    const [selectedProfile, setSelectedProfile] = useState(null);// Estado para el perfil seleccionado
    const [showAddFormModal, setShowAddFormModal] = useState(false);// Estado para mostrar el modal de agregar perfil

    const navigate = useNavigate();


    const handleProfileSelect = (profile) => {
        navigate(`/catalogo/${profile._id}`, { state: { profile } });
        toast.success('Se Ingreso al Perfil Exitosamente');
        setShowAddFormModal(false);// Cierra el modal si está abierto
    };

    const handleAddProfileClick = () => {
        setSelectedProfile(null);// Resetea el perfil seleccionado
        setShowAddFormModal(true);// Abre el modal para agregar un nuevo perfil
    };

    const closeModal = () => {
        setShowAddFormModal(false);// Cierra el modal
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-center">¿Quién está jugando?</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Perfiles existentes */}
                {profiles.map((profile) => (// Mapea los perfiles existentes
                <div
                    key={profile._id}
                    onClick={() => handleProfileSelect(profile)}// Selecciona el perfil
                    className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center transition-transform transform hover:scale-105"
                >
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
                onClick={handleAddProfileClick}
                className="group bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center justify-center transition-transform transform hover:scale-105"
                >

                    <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
                        <Plus size={48} />
                    </div>
                    <h2 className="text-lg font-semibold">Agregar Perfil</h2>
                </div>
            </div>

            {/* Catálogo de videojuegos si seleccionan perfil */}
            <div className="w-full mt-10">
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
                        <AddProfileForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSelection;
