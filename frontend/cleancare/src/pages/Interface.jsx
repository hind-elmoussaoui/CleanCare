import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClientInterface from "./ClientInterface";
import ProviderInterface from "./ProviderInterface";

export default function Interface() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        try {
            setError(null);
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate("/LoginPage");
                return;
            }

            // Décodage du token pour obtenir le rôle
            let decoded;
            try {
                decoded = JSON.parse(atob(token.split('.')[1]));
                setUserRole(decoded.role);
            } catch (e) {
                console.error("Erreur de décodage du token:", e);
                localStorage.removeItem('token');
                navigate("/LoginPage");
                return;
            }

            // Récupération des données utilisateur selon le rôle
            const endpoint = decoded.role === 'provider' 
                ? "http://localhost:5000/api/providers/me" 
                : "http://localhost:5000/api/clients/me";

            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }

            const data = await response.json();
            setUserData(data);
            localStorage.setItem('userData', JSON.stringify(data));
            localStorage.setItem('userType', decoded.role);

        } catch (error) {
            console.error("Erreur:", error);
            setError("Impossible de charger les données utilisateur");
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            navigate("/LoginPage");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Vérification initiale des données
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const savedData = localStorage.getItem('userData');

            if (!token) {
                navigate("/LoginPage");
                return;
            }

            if (location.state?.userData) {
                setUserData(location.state.userData);
                setUserRole(location.state.userData.role || 'client');
                setLoading(false);
                return;
            }

            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setUserData(parsedData);
                setUserRole(parsedData.role || 'client');
                setLoading(false);
                return;
            }

            fetchUserData();
        };

        checkAuth();
    }, [location, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-2">Chargement de votre interface...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
                    <strong className="font-bold">Erreur ! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    // Protection des routes selon le rôle
    if (userRole === 'provider') {
        return <ProviderInterface userData={userData} />;
    }

    if (userRole === 'client') {
        return <ClientInterface userData={userData} />;
    }

    // Cas par défaut (normalement ne devrait pas arriver)
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md">
                <strong className="font-bold">Attention ! </strong>
                <span className="block sm:inline">Type d'utilisateur non reconnu</span>
            </div>
        </div>
    );
}