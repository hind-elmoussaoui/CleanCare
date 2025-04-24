import React from 'react';
import { FaUser, FaSignOutAlt, FaHome, FaHistory, FaCog, FaBell, FaCalendarAlt} from "react-icons/fa";

function Sidbar() {
  return (
    <div>
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
    </div>
  )
}

export default Sidbar
