import { useState } from "react";
import { FiUser, FiLock, FiBell, FiGlobe } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("compte");
  const [formData, setFormData] = useState({
    nom: "Admin",
    email: "hind6ah@gmail.com",
    ancienMotDePasse: "",
    nouveauMotDePasse: "",
    confirmMotDePasse: "",
    notifications: true,
    langue: "fr",
    modeSombre: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous ajouterez la logique pour sauvegarder les paramètres
    console.log("Paramètres sauvegardés:", formData);
    alert("Paramètres mis à jour avec succès!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (existant) */}
      <Sidebar />
      
      {/* Contenu principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Paramètres</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: "compte", icon: <FiUser />, label: "Compte" },
              { id: "securite", icon: <FiLock />, label: "Sécurité" },
              { id: "notifications", icon: <FiBell />, label: "Notifications" },
              { id: "preferences", icon: <FiGlobe />, label: "Préférences" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium ${activeTab === tab.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des tabs */}
          <div className="p-8">
            {/* Tab Compte */}
            {activeTab === "compte" && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            )}

            {/* Tab Sécurité */}
            {activeTab === "securite" && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
                    <input
                      type="password"
                      name="ancienMotDePasse"
                      value={formData.ancienMotDePasse}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="nouveauMotDePasse"
                      value={formData.nouveauMotDePasse}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      name="confirmMotDePasse"
                      value={formData.confirmMotDePasse}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Mettre à jour le mot de passe
                  </button>
                </div>
              </form>
            )}

            {/* Tab Notifications */}
            {activeTab === "notifications" && (
              <div>
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Notifications par email</h3>
                    <p className="text-sm text-gray-500">Recevoir des notifications importantes par email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => console.log("Préférences notifications sauvegardées")}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            )}

            {/* Tab Préférences */}
            {activeTab === "preferences" && (
              <div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                    <select
                      name="langue"
                      value={formData.langue}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Mode sombre</h3>
                      <p className="text-sm text-gray-500">Activer l'apparence sombre</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="modeSombre"
                        checked={formData.modeSombre}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => console.log("Préférences sauvegardées")}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}