import React from 'react';
import { Gamepad2, X, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Importa el contexto de tema

const FavoritesModal = ({ perfil, onClose }) => {// recibe el perfil y una función para cerrar el modal como props
    const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro
    const { getFavorites, removeFromFavorites } = useFavorites();//  Obtenemos las funciones del contexto de favoritos
    const favorites = getFavorites(perfil?._id); //  Obtenemos los videojuegos favoritos del perfil actual

    const handleRemove = (videojuegoId) => {
        removeFromFavorites(perfil._id, videojuegoId);//  Llamamos a la función para eliminar un videojuego de favoritos
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={` rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-6 relative animate-fade-in ${isDarkMode ? 'bg-gray-800 ' : 'bg-white '}`}>
                {/* Cierre */}
                <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition hover:cursor-pointer"
                >
                    <X size={28} />
                </button>

                {/* Título */}
                <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">🎮 Tus Favoritos</h2>

                {/* Lista */}
                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500">No hay videojuegos en favoritos.</p>
                ) : (
                <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                    {favorites.map((videojuego) => ( 
                        <div
                            key={videojuego._id}
                            className={`flex items-start gap-4 rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-50 text-gray-600'
                            }`}
                        >
                            {/* Imagen del videojuego */}
                            <img
                            src={videojuego.imgUrl}
                            alt={videojuego.titulo}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => {// Si la imagen no carga, se muestra una imagen de marcador de posición
                                e.target.src = 'https://via.placeholder.com/96';
                            }}
                            />

                            {/* Detalles del videojuego */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg font-semibold">{videojuego.titulo}</h3>
                                    <Gamepad2 className="text-blue-500" size={22} />
                                </div>
                                <p className="text-sm"><strong>Género:</strong> {videojuego.genero.join(', ')}</p>
                                <p className="text-sm"><strong>Plataforma:</strong> {videojuego.plataforma.join(', ')}</p>
                                <button
                                    onClick={() => handleRemove(videojuego._id)}
                                    className="text-sm text-red-500 hover:text-red-800 mt-2 font-medium flex items-center gap-1 hover:cursor-pointer"
                                >
                                    <Trash2 size={16} /> Quitar de Favoritos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesModal;
