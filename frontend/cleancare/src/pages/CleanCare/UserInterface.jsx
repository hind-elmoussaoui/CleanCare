import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaHome, FaHistory, FaCog, FaBell, FaCalendarAlt, FaStar, FaPhone, FaMapMarkerAlt, FaInfoCircle, FaBriefcase, FaIdCard, FaCamera} from "react-icons/fa";
import { FcServices } from "react-icons/fc";
import { GiProgression } from "react-icons/gi";
import axios from 'axios';


function UserInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [successMessage, setSuccessMessage] = useState("");
  const [profileData, setProfileData] = useState({
    phone: "",
    address: "",
    bio: "",
    services: [],
    newService: "",
    experience: "",
    cin: "",
    photo: null,
    photoPreview: ""
  });

  // Nouvelle palette de couleurs professionnelle
  const colors = {
    primary: "#00A896", // Turquoise foncé
    secondary: "#028090", // Bleu-vert marine
    accent: "#FF6B6B", // Corail doux
    light: "#F0F3F5", // Gris très clair
    lightBlue: "#B8E0D2", // Turquoise clair
    textDark: "#2E2E2E", // Noir doux
    textLight: "#FFFFFF", // Blanc
    success: "#4CAF50", // Vert
    warning: "#FFC107", // Jaune
    error: "#F44336", // Rouge
    highlight: "#E8F4F8", // Bleu très clair
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !localStorage.getItem("token")) {
      navigate("/signin");
      return;
    }

    // Simuler des données de profil existantes
    const mockProfileData = {
      phone: userData.phone || "",
      address: userData.address || "",
      bio: userData.bio || "",
      services: userData.services || [],
      newService: "",
      experience: userData.experience || "",
      cin: userData.cin || "",
      photo: userData.photo || null,
      photoPreview: userData.photo ? URL.createObjectURL(userData.photo) : ""
    };

    setUser(userData);
    setProfileData(mockProfileData);
    setLoading(false);

    if (location.state?.fromSignUp) {
      setSuccessMessage(
        `Bienvenue ${userData.name}! Votre compte ${userData.role} a été créé avec succès.`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const addService = () => {
    if (profileData.newService.trim()) {
      setProfileData((prev) => ({
        ...prev,
        services: [...prev.services, prev.newService.trim()],
        newService: "",
      }));
    }
  };

  const removeService = (index) => {
    setProfileData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const saveProfile = async () => {
    try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("phone", profileData.phone);
      formData.append("address", profileData.address);
      formData.append("cin", profileData.cin);
      formData.append("bio", profileData.bio);
      formData.append("experience", profileData.experience);
      formData.append("services", JSON.stringify(profileData.services));
      if (profileData.photo) {
        formData.append("photo", profileData.photo);
      }
  
      const response = await axios.put(
        `http://localhost:5000/api/users/profile`, // ✅ backend route
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Profil mis à jour:", response.data);
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };
  

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ backgroundColor: colors.light }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.primary }}
        ></div>
      </div>
    );
  }

  const renderRoleSpecificContent = () => {
    switch (user?.role) {
      case "provider":
        return (
          <div
            className="rounded-lg shadow p-6"
            style={{ backgroundColor: colors.textLight }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FcServices className="mr-2" /> Mes Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="border p-4 rounded-lg hover:shadow-md transition-shadow"
                style={{
                  borderColor: colors.lightBlue,
                  backgroundColor: colors.highlight,
                }}
              >
                <h4 className="font-medium mb-2">Services Actifs</h4>
                <p
                  className="text-3xl font-bold"
                  style={{ color: colors.primary }}
                >
                  5
                </p>
              </div>
              <div
                className="border p-4 rounded-lg hover:shadow-md transition-shadow"
                style={{
                  borderColor: colors.lightBlue,
                  backgroundColor: colors.highlight,
                }}
              >
                <h4 className="font-medium mb-2">Évaluations</h4>
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-3xl font-bold">4.8</span>
                  <span className="ml-1" style={{ color: colors.textDark }}>
                    /5
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "client":
      default:
        return (
          <div
            className="rounded-lg shadow p-6"
            style={{ backgroundColor: colors.textLight }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <GiProgression
                className="mr-2"
                style={{ color: colors.primary }}
              />{" "}
              Mes Demandes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="border p-4 rounded-lg hover:shadow-md transition-shadow"
                style={{
                  borderColor: colors.lightBlue,
                  backgroundColor: colors.highlight,
                }}
              >
                <h4 className="font-medium mb-2">En cours</h4>
                <p
                  className="text-3xl font-bold"
                  style={{ color: colors.primary }}
                >
                  2
                </p>
              </div>
              <div
                className="border p-4 rounded-lg hover:shadow-md transition-shadow"
                style={{
                  borderColor: colors.lightBlue,
                  backgroundColor: colors.highlight,
                }}
              >
                <h4 className="font-medium mb-2">Terminés</h4>
                <p
                  className="text-3xl font-bold"
                  style={{ color: colors.success }}
                >
                  5
                </p>
              </div>
              <div
                className="border p-4 rounded-lg hover:shadow-md transition-shadow"
                style={{
                  borderColor: colors.lightBlue,
                  backgroundColor: colors.highlight,
                }}
              >
                <h4 className="font-medium mb-2">Annulés</h4>
                <p
                  className="text-3xl font-bold"
                  style={{ color: colors.error }}
                >
                  1
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: colors.light }}
    >
      {/* Sidebar */}
      <div
        className="w-64 p-4 flex flex-col"
        style={{
          backgroundColor: colors.secondary,
          color: colors.textLight,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-center justify-between mb-8 p-2">
          <h1 className="text-xl font-bold">Mon Espace</h1>
        </div>

        <div
          className="flex items-center space-x-3 p-3 mb-6 rounded-lg transition-all hover:shadow-md"
          style={{
            backgroundColor: colors.primary,
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("profile")}
        >
          <div
            className="p-2 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.lightBlue }}
          >
            <FaUser size={18} style={{ color: colors.secondary }} />
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs" style={{ color: colors.lightBlue }}>
              {user?.role === "client" ? "Client" : "Prestataire"}
            </p>
          </div>
        </div>

        <nav className="flex-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all ${
              activeTab === "dashboard"
                ? "font-semibold"
                : "opacity-90 hover:opacity-100"
            }`}
            style={{
              backgroundColor:
                activeTab === "dashboard" ? colors.primary : "transparent",
              color: colors.textLight,
            }}
          >
            <FaHome className="mr-3" /> Tableau de bord
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all ${
              activeTab === "services"
                ? "font-semibold"
                : "opacity-90 hover:opacity-100"
            }`}
            style={{
              backgroundColor:
                activeTab === "services" ? colors.primary : "transparent",
              color: colors.textLight,
            }}
          >
            {user?.role === "client" ? (
              <>
                <FaCalendarAlt className="mr-3" /> Mes Rendez-vous
              </>
            ) : (
              <>
                <FcServices className="mr-3" /> Mes Services
              </>
            )}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all ${
              activeTab === "history"
                ? "font-semibold"
                : "opacity-90 hover:opacity-100"
            }`}
            style={{
              backgroundColor:
                activeTab === "history" ? colors.primary : "transparent",
              color: colors.textLight,
            }}
          >
            <FaHistory className="mr-3" /> Historique
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all ${
              activeTab === "notifications"
                ? "font-semibold"
                : "opacity-90 hover:opacity-100"
            }`}
            style={{
              backgroundColor:
                activeTab === "notifications" ? colors.primary : "transparent",
              color: colors.textLight,
            }}
          >
            <FaBell className="mr-3" /> Notifications
          </button>
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all ${
              activeTab === "profile"
                ? "font-semibold"
                : "opacity-90 hover:opacity-100"
            }`}
            style={{
              backgroundColor:
                activeTab === "profile" ? colors.primary : "transparent",
              color: colors.textLight,
            }}
          >
            <FaUser className="mr-3" /> Mon Profil
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all ${
              activeTab === "settings"
                ? "font-semibold"
                : "opacity-90 hover:opacity-100"
            }`}
            style={{
              backgroundColor:
                activeTab === "settings" ? colors.primary : "transparent",
              color: colors.textLight,
            }}
          >
            <FaCog className="mr-3" /> Paramètres
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg mt-2 transition-all hover:opacity-90"
            style={{
              backgroundColor: colors.accent,
              color: colors.textLight,
            }}
          >
            <FaSignOutAlt className="mr-3" /> Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header
          className="shadow-sm p-4 flex justify-between items-center"
          style={{
            backgroundColor: colors.textLight,
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            className="text-xl font-semibold"
            style={{ color: colors.textDark }}
          >
            {activeTab === "dashboard" && "Tableau de bord"}
            {activeTab === "services" &&
            (user?.role === "client" ? "Mes Rendez-vous" : "Mes Services")}
            {activeTab === "history" && "Historique"}
            {activeTab === "notifications" && "Notifications"}
            {activeTab === "settings" && "Paramètres"}
            {activeTab === "profile" && "Profil"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaBell
                size={20}
                style={{ color: colors.secondary, cursor: "pointer" }}
              />
              <span
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-xs"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.textLight,
                }}
              >
                3
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {successMessage && (
            <div
              className="mb-6 p-4 rounded flex items-center"
              style={{
                backgroundColor: colors.lightBlue,
                borderLeft: `4px solid ${colors.success}`,
              }}
            >
              <svg
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ color: colors.success }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p style={{ color: colors.textDark }}>{successMessage}</p>
            </div>
          )}

          {/* Profile Card */}
          {activeTab !== "settings" && (
            <div
              className="mb-6 rounded-lg shadow overflow-hidden"
              style={{ backgroundColor: colors.textLight }}
            >
              <div className="p-6 flex items-start">
                <div
                  className="p-4 rounded-full mr-4 flex-shrink-0"
                  style={{ backgroundColor: colors.lightBlue }}
                >
                  <FaUser
                    className="text-xl"
                    style={{ color: colors.secondary }}
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-medium mb-1"
                    style={{ color: colors.textDark }}
                  >
                    {user?.name}
                  </h3>
                  <p
                    className="text-sm mb-2"
                    style={{ color: colors.secondary }}
                  >
                    {user?.email}
                  </p>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor:
                        user?.role === "client"
                          ? colors.lightBlue
                          : colors.highlight,
                      color:
                        user?.role === "client"
                          ? colors.secondary
                          : colors.textDark,
                    }}
                  >
                    {user?.role === "client" ? "Client" : "Prestataire"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Content Based on Tab */}
          {activeTab === "dashboard" && (
            <>
              {renderRoleSpecificContent()}

              <div
                className="mt-6 rounded-lg shadow p-6"
                style={{ backgroundColor: colors.textLight }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.textDark }}
                >
                  Activité Récente
                </h3>
                <div className="space-y-4">
                  <div
                    className="border-b pb-4"
                    style={{ borderColor: colors.light }}
                  >
                    <p
                      className="text-sm mb-1"
                      style={{ color: colors.secondary }}
                    >
                      Aujourd'hui, 10:30
                    </p>
                    <p
                      className="font-medium"
                      style={{ color: colors.textDark }}
                    >
                      {user?.role === "client"
                        ? "Vous avez demandé un service de nounou"
                        : "Nouvelle demande de service reçue"}
                    </p>
                  </div>
                  <div
                    className="border-b pb-4"
                    style={{ borderColor: colors.light }}
                  >
                    <p
                      className="text-sm mb-1"
                      style={{ color: colors.secondary }}
                    >
                      Hier, 15:45
                    </p>
                    <p
                      className="font-medium"
                      style={{ color: colors.textDark }}
                    >
                      {user?.role === "client"
                        ? "Votre rendez-vous avec femme de ménage Pro a été confirmé"
                        : "Vous avez confirmé un rendez-vous avec saoud"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "services" && (
            <div
              className="rounded-lg shadow p-6"
              style={{ backgroundColor: colors.textLight }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: colors.textDark }}
              >
                {user?.role === "client"
                  ? "Mes Rendez-vous"
                  : "Gestion des Services"}
              </h3>
              <p style={{ color: colors.textDark }}>
                {user?.role === "client"
                  ? "Liste de vos prochains rendez-vous avec nos prestataires"
                  : "Gérez ici les services que vous proposez"}
              </p>
              {/* Contenu spécifique à implémenter */}
            </div>
          )}

          {activeTab === "history" && (
            <div
              className="rounded-lg shadow p-6"
              style={{ backgroundColor: colors.textLight }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: colors.textDark }}
              >
                Historique
              </h3>
              <p style={{ color: colors.textDark }}>
                {user?.role === "client"
                  ? "Historique complet de vos demandes de service"
                  : "Historique de vos interventions"}
              </p>
            </div>
          )}

          {activeTab === "notifications" && (
            <div
              className="rounded-lg shadow p-6"
              style={{ backgroundColor: colors.textLight }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: colors.textDark }}
              >
                Notifications
              </h3>
              <p style={{ color: colors.textDark }}>
                Vous n'avez pas de nouvelles notifications
              </p>
            </div>
          )}
          
          {activeTab === "profile" && (
            <div className="rounded-lg shadow p-6" style={{ backgroundColor: colors.textLight }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.textDark }}>
                <FaUser className="inline mr-2" /> Mon Profil Complet
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section Informations de base (pour tous les utilisateurs) */}
                <div>
                  <h4 className="text-lg font-medium mb-4 flex items-center" style={{ color: colors.primary }}>
                    <FaInfoCircle className="mr-2" /> Informations Personnelles
                  </h4>
                  
                  {/* Photo de profil */}
                  <div className="mb-4 flex flex-col items-center">
                    <div className="relative mb-2">
                      <img
                        src={profileData.photoPreview || "https://via.placeholder.com/150"}
                        alt="Photo de profil"
                        className="w-32 h-32 rounded-full object-cover border-2"
                        style={{ borderColor: colors.primary }}
                      />
                      <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                        <FaCamera style={{ color: colors.primary }} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">Cliquez sur l'icône pour changer la photo</p>
                  </div>

                  <div className="space-y-4">
                    {/* Nom et Email (lecture seule) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={profileData.name || user?.name || ''}
                        readOnly
                        className="w-full p-3 rounded-md border bg-gray-100"
                        style={{ borderColor: colors.lightBlue }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email || user?.email || ''}
                        readOnly
                        className="w-full p-3 rounded-md border bg-gray-100"
                        style={{ borderColor: colors.lightBlue }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                        <FaPhone className="inline mr-2" /> Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                        }}
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                        <FaMapMarkerAlt className="inline mr-2" /> Adresse
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                        }}
                        placeholder="Votre adresse complète"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                        <FaIdCard className="inline mr-2" /> Numéro CIN
                      </label>
                      <input
                        type="text"
                        name="cin"
                        value={profileData.cin}
                        onChange={handleProfileChange}
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                        }}
                        placeholder="Votre numéro de carte d'identité"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                        Bio / Description
                      </label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        rows="3"
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                        }}
                        placeholder="Décrivez-vous en quelques mots..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Section spécifique aux prestataires */}
                {user?.role === "provider" && (
                  <div>
                    <h4 className="text-lg font-medium mb-4 flex items-center" style={{ color: colors.primary }}>
                      <FaBriefcase className="mr-2" /> Informations Professionnelles
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                          Années d'expérience
                        </label>
                        <input
                          type="number"
                          name="experience"
                          value={profileData.experience}
                          onChange={handleProfileChange}
                          className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                          style={{
                            borderColor: colors.lightBlue,
                            focusBorderColor: colors.primary,
                          }}
                          placeholder="Nombre d'années d'expérience"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: colors.textDark }}>
                          Services proposés
                        </label>
                        <div className="flex mb-2">
                          <input
                            name="sevices"
                            value={profileData.newService}
                            onChange={(e) => setProfileData({...profileData, newService: e.target.value})}
                            className="flex-1 p-3 rounded-l-md border focus:ring-2 focus:outline-none transition-all"
                            style={{
                              borderColor: colors.lightBlue,
                              focusBorderColor: colors.primary,
                            }}
                            placeholder="Ex: Garde d'enfants, Ménage, Cuisine..."
                          />
                          <button
                            type="button"
                            onClick={addService}
                            className="px-4 py-3 rounded-r-md font-medium transition-all"
                            style={{
                              backgroundColor: colors.primary,
                              color: colors.textLight,
                            }}
                          >
                            Ajouter
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          {profileData.services.length > 0 ? (
                            profileData.services.map((service, index) => (
                              <div 
                                key={index} 
                                className="flex justify-between items-center p-3 rounded-md"
                                style={{ backgroundColor: colors.highlight }}
                              >
                                <span style={{ color: colors.textDark }}>{service}</span>
                                <button
                                  onClick={() => removeService(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ×
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm italic" style={{ color: colors.secondary }}>
                              Aucun service ajouté pour le moment
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bouton de sauvegarde */}
              <div className="mt-8 text-center">
                <button
                  onClick={saveProfile}
                  className="px-8 py-3 rounded-md font-medium transition-all hover:shadow-md"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textLight,
                  }}
                >
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div
              className="rounded-lg shadow p-6"
              style={{ backgroundColor: colors.textLight }}
            >
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: colors.textDark }}
              >
                Paramètres du compte
              </h3>

              {/* Formulaire de mise à jour du profil */}
              <div className="mb-8">
                <h4
                  className="text-lg font-medium mb-4"
                  style={{ color: colors.textDark }}
                >
                  Informations personnelles
                </h4>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const updates = {
                      name: formData.get("name"),
                      email: formData.get("email"),
                    };

                    try {
                      const response = await fetch(
                        "http://localhost:5000/api/users/update-profile",
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                          body: JSON.stringify(updates),
                        }
                      );

                      const data = await response.json();

                      if (!response.ok) {
                        throw new Error(
                          data.message || "Erreur lors de la mise à jour"
                        );
                      }

                      setUser({ ...user, ...data.user });
                      // Notification plus élégante
                      setSuccessMessage("Profil mis à jour avec succès!");
                      setTimeout(() => setSuccessMessage(""), 3000);
                    } catch (error) {
                      console.error("Erreur:", error);
                      // Notification d'erreur
                      setSuccessMessage(error.message);
                      setTimeout(() => setSuccessMessage(""), 3000);
                    }
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={user?.name}
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                          focusRingColor: colors.primary,
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                          focusRingColor: colors.primary,
                        }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-3 rounded-md font-medium transition-all hover:shadow-md"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.textLight,
                      }}
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>

              {/* Formulaire de changement de mot de passe */}
              <div>
                <h4
                  className="text-lg font-medium mb-4"
                  style={{ color: colors.textDark }}
                >
                  Changer le mot de passe
                </h4>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const passwords = {
                      currentPassword: formData.get("currentPassword"),
                      newPassword: formData.get("newPassword"),
                    };

                    try {
                      const response = await fetch(
                        "http://localhost:5000/api/users/update-password",
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                          body: JSON.stringify(passwords),
                        }
                      );

                      const data = await response.json();

                      if (!response.ok) {
                        throw new Error(
                          data.message ||
                            "Erreur lors du changement de mot de passe"
                        );
                      }

                      // Notification de succès
                      setSuccessMessage("Mot de passe mis à jour avec succès!");
                      setTimeout(() => setSuccessMessage(""), 3000);
                      e.target.reset();
                    } catch (error) {
                      console.error("Erreur:", error);
                      // Notification d'erreur
                      setSuccessMessage(error.message);
                      setTimeout(() => setSuccessMessage(""), 3000);
                    }
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                          focusRingColor: colors.primary,
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        className="w-full p-3 rounded-md border focus:ring-2 focus:outline-none transition-all"
                        style={{
                          borderColor: colors.lightBlue,
                          focusBorderColor: colors.primary,
                          focusRingColor: colors.primary,
                        }}
                        required
                        minLength="6"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-3 rounded-md font-medium transition-all hover:shadow-md"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.textLight,
                      }}
                    >
                      Changer le mot de passe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default UserInterface;