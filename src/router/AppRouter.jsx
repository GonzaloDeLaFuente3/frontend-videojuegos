import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import ProfilesPage from '../pages/ProfilesPage';
import CatalogoPage from '../pages/CatalogoPage';
import VideojuegoForm from '../components/VideojuegoForm';
import {VideojuegoProvider} from '../context/VideojuegoContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FavoritesProvider } from '../context/FavoritesContext';
import { Navigate } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Router>
            {/* // Proveedor de contexto para la autenticación */}
            <AuthProvider>
                {/* // Proveedor de contexto para los videojuegos */}
                <VideojuegoProvider>
                    {/* // Proveedor de contexto para los favoritos */}
                    <FavoritesProvider>
                        <Header />

                        <Routes>
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            <Route
                                path="/perfiles"
                                element={
                                <ProtectedRoute>
                                    <ProfilesPage />
                                </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/catalogo/:perfilId"
                                element={
                                <ProtectedRoute>
                                    <CatalogoPage  />
                                </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/videojuegos/crear"
                                element={
                                    <ProtectedRoute>
                                        <VideojuegoForm />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/videojuegos/editar/:id"
                                element={
                                    <ProtectedRoute>
                                        <VideojuegoForm />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                        
                        <Footer />
                    </FavoritesProvider> 
                </VideojuegoProvider>
            </AuthProvider>
        </Router>
    );
};

export default AppRouter;