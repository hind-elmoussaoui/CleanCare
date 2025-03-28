import React from "react";

export default function ClientInterface({ userData }) {
    // Formatage de la date d'inscription
    const joinDate = userData.createdAt 
        ? new Date(userData.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          })
        : new Date().toLocaleDateString();

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Mon Compte Client</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Section Informations Personnelles */}
                <div className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Informations Personnelles</h3>
                    <div className="space-y-3">
                        <p><span className="font-medium">Prénom:</span> {userData.firstName || "Non renseigné"}</p>
                        <p><span className="font-medium">Nom:</span> {userData.lastName || "Non renseigné"}</p>
                        <p><span className="font-medium">Email:</span> {userData.email || "Non renseigné"}</p>
                        <p><span className="font-medium">Téléphone:</span> {userData.phone || "Non renseigné"}</p>
                    </div>
                </div>

                {/* Section Préférences */}
                <div className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Préférences</h3>
                    <div className="space-y-3">
                        <p><span className="font-medium">Type de client:</span> Particulier</p>
                        <p><span className="font-medium">Membre depuis:</span> {joinDate}</p>
                        <p><span className="font-medium">Services favoris:</span> 
                            {userData.favoriteServices?.length > 0 
                                ? userData.favoriteServices.join(", ") 
                                : "Aucun pour le moment"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Section sécurité */}
            <div className="border rounded-lg p-6 bg-gray-50 mb-8">
                <h3 className="font-bold text-lg mb-4 border-b pb-2">Sécurité</h3>
                <div className="space-y-3">
                    <p><span className="font-medium">Mot de passe:</span> ********</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Changer le mot de passe
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="font-bold text-lg mb-4 border-b pb-2">Actions</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                        Trouver un prestataire
                    </button>
                    <button className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition">
                        Mes réservations
                    </button>
                    <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
                        Historique des services
                    </button>
                </div>
            </div>
        </div>
    );
}