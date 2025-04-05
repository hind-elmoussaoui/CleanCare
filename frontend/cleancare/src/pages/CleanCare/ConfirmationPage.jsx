import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, plan } = location.state || {}; // Récupérer les données de la commande

    if (!formData || !plan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-bold mb-4">Commande non trouvée</h2>
                    <p className="text-gray-700 mb-6">
                        Il semble que vous soyez arrivé ici par erreur. Veuillez passer une commande pour accéder à cette page.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <div className="text-center mb-8">
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Commande confirmée !</h2>
                    <p className="text-gray-700">
                        Merci, {formData.firstName} ! Votre commande a été enregistrée avec succès.
                    </p>
                </div>

                {/* Détails de la commande */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Informations du client */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Informations du client</h3>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Prénom :</span> {formData.firstName}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Nom :</span> {formData.lastName}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Ville :</span> {formData.city}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Adresse :</span> {formData.address}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Téléphone :</span> {formData.phone}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Email :</span> {formData.email}
                            </p>
                            {formData.notes && (
                                <p className="text-gray-700 mb-2">
                                    <span className="font-semibold">Notes :</span> {formData.notes}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Détails du plan */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Détails de la commande</h3>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-700 font-bold mb-2">Nom du pack: {plan.name}</p>
                            <p className="text-gray-700 font-bold mb-4">Prix: {plan.price} MAD</p>
                            <hr className="border-gray-300 mb-4" />
                            <h4 className="text-md font-semibold mb-2">Fonctionnalités incluses :</h4>
                            <ul className="text-gray-700 mb-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center mb-2">✔️ {feature}</li>
                                ))}
                            </ul>
                            <h4 className="text-md font-semibold mb-2">Non inclus :</h4>
                            <ul className="text-gray-700">
                                {plan.unavailable.map((feature, i) => (
                                    <li key={i} className="flex items-center mb-2 line-through opacity-50">❌ {feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bouton de retour à l'accueil */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate("/services")}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;