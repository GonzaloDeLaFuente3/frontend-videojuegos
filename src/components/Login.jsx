import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Importa el hook useNavigate para redirigir al usuario después de iniciar sesión


const Login = () => {
    const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro

    const navigate = useNavigate(); // Inicializa el hook useNavigate para redirigir al usuario

    const { register, handleSubmit, formState: { errors } } = useForm(); //  Manejo del formulario de inicio de sesión
    const { login } = useAuth();//  Obtenemos la función de inicio de sesión del contexto de autenticación
    const [error, setError] = useState(null);//  Estado para manejar errores de inicio de sesión

    const onSubmit = async (data) => {//  Función que se ejecuta al enviar el formulario. Recibe los datos del formulario como argumento
        setError(null);//  Reiniciamos el error antes de intentar iniciar sesión
        try {
            await login(data.email, data.password);//  Llamamos a la función de inicio de sesión con el correo y la contraseña proporcionados
            toast.success('El Usuario Ingreso Exitosamente');
        } catch (err) {
        if (err.response?.status === 400) {
            setError('Correo electrónico o contraseña incorrectos.');
        } else {
            setError('Ocurrió un error inesperado. Intenta de nuevo.');
        }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`max-w-md mx-auto p-6  rounded-2xl shadow-md space-y-6 mt-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg- text-gray-900'}`}>
            <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>

            {error && <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>}

            <div>
                <label className="block  mb-1">Correo electrónico</label>
                <input
                {...register('email', {
                    required: 'El correo es obligatorio.',
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Formato de correo inválido.'
                    }
                })}
                type="email"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block  mb-1">Contraseña</label>
                <input
                {...register('password', { required: 'La contraseña es obligatoria.' })}
                type="password"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded hover:cursor-pointer">
                Ingresar
            </button>

            <button
            onClick={() => navigate(`/register`)}
            className={`w-full bg-gray-600  text-white font-semibold py-2 rounded ${isDarkMode ? 'hover:bg-green-900' : 'hover:bg-green-700'} hover:cursor-pointer`}
            >
                Registrar nuevo usuario
            </button>
        </form>
    );
};

export default Login;
