import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useVideojuego } from '../context/VideojuegoContext';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Pencil, Trash2 } from 'lucide-react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const VideojuegoCatalogo = ({ perfil }) => {
    const { token } = useAuth(); // Obtiene el token del contexto de autenticación
    const { eliminarVideojuego } = useVideojuego();// Obtiene la función para eliminar videojuegos del contexto
    const [localVideojuegos, setLocalVideojuegos] = useState([]); // Estado local para almacenar los videojuegos
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideojuegos = async () => {// Función para obtener los videojuegos
            try {
                let filtroEdad = '';
                if (perfil.tipo === 'adolescente') filtroEdad = '13';// Filtra por edad mínima 13
                else if (perfil.tipo === 'infantil') filtroEdad = '7';// Filtra por edad mínima 7

                const response = await api.get('/videojuegos', {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { edadMinima: filtroEdad },// Envía el filtro de edad como parámetro
                });
                setLocalVideojuegos(response.data);
            } catch (error) {
                console.error('Error al obtener los videojuegos:', error);
                toast.error('Error al cargar los videojuegos');
            }
        };

        fetchVideojuegos();
    }, [perfil, token]);

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar videojuego?',
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
                await eliminarVideojuego(id);
                toast.success('Videojuego eliminado exitosamente');
                navigate(`/catalogo/${perfil._id}`, { state: { profile: perfil } });
            } catch (error) {
                console.error('Error al eliminar:', error);
                toast.error('Error al eliminar el videojuego');
            }
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {localVideojuegos.map((videojuego) => (// Mapea los videojuegos
                <div
                    key={videojuego._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 relative"
                >
                    <img
                        src={videojuego.imgUrl}
                        alt={videojuego.titulo}
                        className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            {/* titulo */}
                            <h2 className="text-lg font-bold truncate">{videojuego.titulo}</h2>
                            <Gamepad2 className="text-blue-500" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Género: {videojuego.genero.join(', ')}</p>
                        <p className="text-sm text-gray-600">Plataforma: {videojuego.plataforma.join(', ')}</p>
                        <div className="mt-2">
                            <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                {videojuego.edadMinima}+ años
                            </span>
                        </div>
                        {/* botones */}
                        {(perfil.tipo === 'adulto' || perfil.tipo === 'adolescente') && (
                            <div className="mt-4 flex justify-end space-x-2">
                                <Link
                                    to={`/videojuegos/editar/${videojuego._id}`}// Enlace para editar videojuego
                                    state={{ profile: perfil }}// Pasa el perfil al estado
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm shadow"
                                >
                                    <Pencil size={16} />
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleEliminar(videojuego._id)}//uso la funcion handleEliminar para eliminar el videojuego
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm shadow hover:cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideojuegoCatalogo;
