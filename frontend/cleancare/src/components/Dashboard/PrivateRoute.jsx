import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Vérifie si l'utilisateur est authentifié (en vérifiant le flag dans localStorage)
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Redirige vers la page de login si non authentifié
    }

    return children; // Affiche les enfants (la page protégée) si authentifié
};

export default PrivateRoute;
