import React from "react";

export default function ProviderInterface({ userData }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Mon Profil Professionnel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Section Informations Personnelles */}
                <div className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Informations Personnelles</h3>
                    <div className="space-y-3">
                        <p><span className="font-medium">Prénom:</span> {userData.firstName || "Non renseigné"}</p>
                        <p><span className="font-medium">Nom:</span> {userData.lastName || "Non renseigné"}</p>
                        <p><span className="font-medium">Email:</span> {userData.email || "Non renseigné"}</p>
                        <p><span className="font-medium">Téléphone:</span> {userData.phone || "Non renseigné"}</p>
                        <p><span className="font-medium">Adresse:</span> {userData.address || "Non renseigné"}</p>
                        <p><span className="font-medium">Ville:</span> {userData.city || "Non renseigné"}</p>
                    </div>
                </div>

                {/* Section Informations Professionnelles */}
                <div className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Informations Professionnelles</h3>
                    <div className="space-y-3">
                        <p><span className="font-medium">Service:</span> {userData.services || "Non renseigné"}</p>
                        <p><span className="font-medium">Expérience:</span> {userData.experience || "0"} ans</p>
                        <p><span className="font-medium">CIN:</span> {userData.idCard || "Non renseigné"}</p>
                        <p><span className="font-medium">Statut:</span> 
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                userData.status === "validé" ? "bg-green-100 text-green-800" :
                                userData.status === "rejeté" ? "bg-red-100 text-red-800" :
                                "bg-yellow-100 text-yellow-800"
                            }`}>
                                {userData.status || "En attente de validation"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Photo de profil */}
            {userData.photo && (
                <div className="mb-8 border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Photo de Profil</h3>
                    <div className="flex justify-center">
                        <img 
                            src={typeof userData.photo === "string" ? 
                                userData.photo : 
                                URL.createObjectURL(userData.photo)} 
                            alt="Profil" 
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow"
                        />
                    </div>
                </div>
            )}

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
                        Modifier mon profil
                    </button>
                    <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
                        Voir mes demandes
                    </button>
                    <button className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition">
                        Mes statistiques
                    </button>
                </div>
            </div>
        </div>
    );
}