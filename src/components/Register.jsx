import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate(); // Inicializa el hook useNavigate para redirigir al usuario
    const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro
    
    const { register, handleSubmit } = useForm();// Manejo del formulario de registro
    const { register: registerUser } = useAuth();
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        try {
            await registerUser(data.nombre, data.email, data.password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div> 
            <h1 className={`text-3xl font-bold text-center mt-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Registrar Usuario</h1> 
            <form onSubmit={handleSubmit(onSubmit)} className={`max-w-md mx-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} rounded-2xl shadow-md space-y-6 mt-10`}>
                <div className="mb-4">
                    <label className="block ">Nombre</label>
                    <input {...register('nombre')} type="text" className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block ">Email</label>
                    <input {...register('email')} type="email" className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block ">Password</label>
                    <input {...register('password')} type="password" className="w-full px-3 py-2 border rounded" />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:cursor-pointer hover:bg-blue-700">Registrar</button>
                <button
                onClick={() => navigate(`/login`)}
                className={`w-full bg-gray-600  text-white font-semibold py-2 rounded ${isDarkMode ? 'hover:bg-green-900' : 'hover:bg-green-700'} hover:cursor-pointer`}
                >
                    iniciar sesion 
                </button>
            </form>
        </div>
    );
};

export default Register;