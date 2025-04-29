import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import api from '../services/api.mjs';
// import {toast} from 'react-toastify'; // Importa la librería de notificaciones para mostrar mensajes al usuario

const AddProfileForm = () => {
    const { register: registerProfile, handleSubmit } = useForm();// Se utiliza para manejar el formulario de creación de perfil
    const { token, usuario } = useAuth(); // Se obtiene el token y el usuario del contexto de autenticación
    const [error, setError] = useState(null);// Estado para manejar errores


    const onSubmit = async (data) => {
        try {
            const response = await api.post(
                '/perfiles/crear',
                {
                    apodo: data.apodo,
                    tipo: data.tipo,
                    edad: data.edad,
                    avatar: data.avatar || undefined,
                    usuario: usuario.id,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            // toast.success('El perfil se ha creado exitosamente', );
            console.log(response.data);
            
            window.location.reload();
            
        } catch (err) {
            console.error('Error al crear el perfil:', err);
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white text-black rounded-2xl shadow-2xl space-y-6 mt-5 border border-purple-500">
            <h2 className="text-2xl font-bold text-center text-purple-400">Agregar Nuevo Perfil</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Apodo</label>
                <input
                    {...registerProfile('apodo')}
                    type="text"
                    className="w-full  border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Tipo</label>
                <select
                    {...registerProfile('tipo')}
                    className="w-full  border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                >
                    <option value="adulto">Adulto</option>
                    <option value="adolescente">Adolescente</option>
                    <option value="infantil">Infantil</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Edad</label>
                <input
                    {...registerProfile('edad')}
                    type="number"
                    className="w-full  border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Avatar (URL opcional)</label>
                <input
                    {...registerProfile('avatar')}
                    type="text"
                    placeholder="https://..."
                    className="w-full  border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
                type="submit"
                className="hover:cursor-pointer w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-2 rounded-xl transition"
            >
                Agregar Perfil
            </button>
        </form>
    );
};

export default AddProfileForm;
