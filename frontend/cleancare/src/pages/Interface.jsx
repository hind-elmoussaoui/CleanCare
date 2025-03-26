import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCog, FaSignOutAlt, FaUser, FaLanguage } from "react-icons/fa";

function Interface() {
    const [showSettings, setShowSettings] = useState(false);
    const [language, setLanguage] = useState("fr");
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Détermine si l'utilisateur est un prestataire
    const isProvider = userData?.services !== undefined;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate("/");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Tentative 1: Données depuis la navigation
                if (location.state?.userData) {
                    setUserData(location.state.userData);
                    localStorage.setItem('userData', JSON.stringify(location.state.userData));
                    setLoading(false);
                    return;
                }

                // Tentative 2: Données depuis localStorage
                const savedData = localStorage.getItem('userData');
                if (savedData) {
                    setUserData(JSON.parse(savedData));
                    setLoading(false);
                    return;
                }

                // Tentative 3: Récupération depuis l'API
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await fetch("http://localhost:5000/api/providers/me", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [location, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Chargement de votre espace...</h2>
                    <p>Si le chargement persiste, veuillez rafraîchir la page</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-500 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        {isProvider ? "Espace Prestataire" : "Espace Client"}
                    </h1>
                    <div className="relative">
                        <button 
                            onClick={() => setShowSettings(!showSettings)}
                            className="flex items-center space-x-2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
                        >
                            <FaCog className="text-xl" />
                            <FaUser className="text-xl" />
                        </button>
                        
                        {showSettings && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <button 
                                    onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    <FaLanguage className="mr-2" />
                                    {language === "fr" ? "Switch to English" : "Passer en Français"}
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Mes Informations</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Section Informations Personnelles (commune aux deux types) */}
                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium text-lg mb-4">Informations Personnelles</h3>
                            <div className="space-y-3">
                                <p><span className="font-medium">Nom:</span> {userData.lastName || "Non renseigné"}</p>
                                <p><span className="font-medium">Prénom:</span> {userData.firstName || "Non renseigné"}</p>
                                <p><span className="font-medium">Email:</span> {userData.email || "Non renseigné"}</p>
                                <p><span className="font-medium">Téléphone:</span> {userData.phone || "Non renseigné"}</p>
                                {isProvider && (
                                    <>
                                        {userData.address && <p><span className="font-medium">Adresse:</span> {userData.address}</p>}
                                        {userData.city && <p><span className="font-medium">Ville:</span> {userData.city}</p>}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Section spécifique selon le type d'utilisateur */}
                        {isProvider ? (
                            // Section pour les prestataires
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium text-lg mb-4">Informations Professionnelles</h3>
                                <div className="space-y-3">
                                    <p><span className="font-medium">Service:</span> {userData.services || "Non renseigné"}</p>
                                    <p><span className="font-medium">Expérience:</span> {userData.experience || "0"} ans</p>
                                    <p><span className="font-medium">CIN:</span> {userData.idCard || "Non renseigné"}</p>
                                    <p><span className="font-medium">Statut:</span> {userData.status || "En attente de validation"}</p>
                                </div>
                            </div>
                        ) : (
                            // Section pour les clients
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium text-lg mb-4">Préférences</h3>
                                <div className="space-y-3">
                                    <p><span className="font-medium">Type de client:</span> Particulier</p>
                                    <p><span className="font-medium">Membre depuis:</span> {new Date().toLocaleDateString()}</p>
                                    <p><span className="font-medium">Services favoris:</span> Aucun pour le moment</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Photo de profil (uniquement pour prestataires) */}
                    {isProvider && userData.photo && (
                        <div className="mt-6 border rounded-lg p-4">
                            <h3 className="font-medium text-lg mb-4">Photo de Profil</h3>
                            <img 
                                src={typeof userData.photo === "string" ? userData.photo : URL.createObjectURL(userData.photo)} 
                                alt="Profil" 
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        </div>
                    )}

                    {/* Section actions spécifiques */}
                    <div className="mt-6 border rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-4">Actions</h3>
                        <div className="flex flex-wrap gap-4">
                            {isProvider ? (
                                <>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                        Modifier mon profil
                                    </button>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                                        Voir mes demandes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                        Trouver un prestataire
                                    </button>
                                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
                                        Mes réservations
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Interface;