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


import { FavoritesProvider } from '../context/FavoritesContext';


const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <VideojuegoProvider>
                    <FavoritesProvider>
                        <Header />

                        <Routes>
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

                    </FavoritesProvider> 
                </VideojuegoProvider>
            </AuthProvider>
        </Router>
    );
};

export default AppRouter;