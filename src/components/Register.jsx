import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { register, handleSubmit } = useForm();
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
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
        <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input {...register('nombre')} type="text" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input {...register('email')} type="email" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input {...register('password')} type="password" className="w-full px-3 py-2 border rounded" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
        </form>
    );
};

export default Register;