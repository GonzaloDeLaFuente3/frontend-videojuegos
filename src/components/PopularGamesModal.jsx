import React from 'react';
import { X } from 'lucide-react';

const PopularGamesModal = ({ games, loading, onClose, isDarkMode }) => {// Recibe los juegos, el estado de carga, la función de cierre y el estado del tema oscuro como props
    // Modal para mostrar los juegos más populares
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 relative animate-fade-in ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}>
                {/* Botón de cierre */}
                <button
                onClick={onClose}
                className={`absolute top-4 right-4 ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                } transition hover:cursor-pointer`}
                >
                <X size={28} />
                </button>

                {/* Título */}
                <h2 className={`text-2xl font-bold mb-6 text-center ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>🎮 Juegos Más Populares</h2>

                {/* Contenido */}
                {loading ? (
                <div className="flex justify-center items-center h-40">
                    <p className="text-lg">Cargando juegos...</p>
                </div>
                ) : games.length === 0 ? (
                <p className={`text-center ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>No se pudieron cargar los juegos populares</p>
                ) : (
                <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                    {games.map((game) => (
                    <div 
                        key={game.id}
                        className={`flex gap-4 items-start border rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                        isDarkMode 
                            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                            : 'bg-purple-50 border-purple-100 hover:bg-purple-100'
                        }`}
                    >
                        {/* Imagen del juego */}
                        <div className="flex-shrink-0">
                        <img
                            src={game.background_image || 'https://via.placeholder.com/150'}// Si no hay imagen, se muestra una de marcador de posición
                            alt={game.name}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150';
                            }}
                        />
                        </div>
                        
                        {/* Detalles del juego */}
                        <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                            <h3 className="text-lg font-semibold">{game.name}</h3>
                            <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                            isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-600 text-white'
                            }`}>
                            ★ {game.rating?.toFixed(1) || 'N/A'}
                            </div>
                        </div>
                        <p className="text-sm"><strong>Lanzamiento:</strong> {game.released || 'Desconocido'}</p>
                        <p className="text-sm"><strong>Plataformas:</strong> {game.platforms?.map(p => p.platform.name).join(', ') || 'No disponible'}</p>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default PopularGamesModal;