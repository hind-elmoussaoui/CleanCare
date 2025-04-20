import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiStar,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BookingChart from "./BookingChart";

function StatistiqueDash() {
  const navigate = useNavigate();
  const [lastReservations, setLastReservations] = useState([]);
  const [avisStats, setAvisStats] = useState({
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    totalAvis: 0,
  });

  // Nouvel état pour les stats utilisateurs
  const [userStats, setUserStats] = useState({
    totalClients: 0,
    activeClients: 0,
    newClientsThisMonth: 0,
    clientGrowth: 0,
  });

  const handleViewAllReservations = () => {
    navigate("/admin/dashboard/services"); // Assurez-vous que cette route est configurée
  };

  const [bookingStats, setBookingStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    cancelled: 0,
    monthlyRevenue: 0,
    popularServices: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupération en parallèle des stats avis et utilisateurs
        const [
          avisResponse,
          usersResponse,
          bookingsResponse,
          lastReservationsResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/avis/stats"),
          fetch("http://localhost:5000/api/users/stats", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch("http://localhost:5000/api/bookings/stats"),
          fetch("http://localhost:5000/api/bookings/last"),
        ]);

        console.log("Avis response:", avisResponse);
        console.log("Users response:", usersResponse);

        if (
          !avisResponse.ok ||
          !usersResponse.ok ||
          !bookingsResponse.ok ||
          !lastReservationsResponse.ok
        ) {
          throw new Error("Erreur de chargement des statistiques");
        }

        const avisData = await avisResponse.json();
        const usersData = await usersResponse.json();
        const bookingsData = await bookingsResponse.json();
        const lastReservationsData = await lastReservationsResponse.json();

        setAvisStats(avisData);
        setUserStats({
          clients: usersData.clients,
          providers: usersData.providers,
          combined: usersData.combined,
        });
        setBookingStats(bookingsData);
        setLastReservations(lastReservationsData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calcul des pourcentages pour chaque note
  const calculatePercentage = (count) => {
    return avisStats.totalAvis > 0
      ? Math.round((count / avisStats.totalAvis) * 100)
      : 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date non spécifiée";
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Données de démonstration (à remplacer par vos données réelles)
  const stats = [
    {
      title: "Utilisateurs",
      value: userStats.combined?.total || 0,
      change: `${userStats.combined?.active || 0} actifs (${Math.round(
        (userStats.combined?.active / (userStats.combined?.total || 1)) * 100
      )}%)`,
      icon: <FiUsers className="text-indigo-500" />,
      bgColor: "bg-indigo-50",
      tooltip: ` Total: ${userStats.combined?.total || 0} Clients: ${
        userStats.clients?.total || 0
      } 
    Prestataires: ${userStats.providers?.total || 0} Nouveaux ce mois: ${
        userStats.combined?.newThisMonth || 0
      } `,
    },
    {
      title: "Réservations",
      value: bookingStats.total || 0,
      change: `${bookingStats.completed || 0} complétés (${Math.round(
        (bookingStats.completed / (bookingStats.total || 1)) * 100
      )}%)`,
      icon: <FiCalendar className="text-green-500" size={24} />,
      bgColor: "bg-green-50",
    },
    {
      title: "Revenu mensuel",
      value: `${bookingStats.monthlyRevenue?.toLocaleString() || 0} MAD`,
      change: "+18%",
      icon: <FiDollarSign className="text-purple-500" size={24} />,
      bgColor: "bg-purple-50",
    },
    {
      title: "Satisfaction",
      value: loading
        ? "Chargement..."
        : `${avisStats.averageRating.toFixed(1)}/5`,
      change: "+0.2",
      icon: <FiStar className="text-yellow-500" size={24} />,
      bgColor: "bg-yellow-50",
    },
    {
      title: "En cours",
      value: bookingStats.inProgress || 0,
      change: "-3",
      icon: <FiClock className="text-orange-500" size={24} />,
      bgColor: "bg-orange-50",
    },
    {
      title: "Complétés",
      value: bookingStats.completed || 0,
      change: "+7",
      icon: <FiCheckCircle className="text-teal-500" size={24} />,
      bgColor: "bg-teal-50",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="p-6 md:p-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard Clean Care
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenue dans votre espace d'administration
          </p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : stat.change.endsWith("%")
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stat.change} vs mois dernier
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white shadow-xs">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Détails des avis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Statistiques de satisfaction
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Répartition des notes */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">
                Répartition des notes
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-16">
                      <span className="text-gray-600 mr-2">{rating}</span>
                      <FiStar
                        className="text-yellow-400 fill-yellow-400"
                        size={16}
                      />
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-yellow-400 h-full"
                          style={{
                            width: `${calculatePercentage(
                              avisStats.ratingDistribution[rating]
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {calculatePercentage(
                        avisStats.ratingDistribution[rating]
                      )}
                      %
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Détails supplémentaires */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Détails</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Nombre total d'avis</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {avisStats.totalAvis}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Note moyenne</p>
                  <p className="text-2xl font-bold text-green-800">
                    {avisStats.averageRating.toFixed(1)}/5
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-600">5 étoiles</p>
                  <p className="text-2xl font-bold text-yellow-800">
                    {avisStats.ratingDistribution[5]} (
                    {calculatePercentage(avisStats.ratingDistribution[5])}%)
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600">1-2 étoiles</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {avisStats.ratingDistribution[1] +
                      avisStats.ratingDistribution[2]}{" "}
                    (
                    {calculatePercentage(
                      avisStats.ratingDistribution[1] +
                        avisStats.ratingDistribution[2]
                    )}
                    %)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Statistiques Utilisateurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Clients totaux</p>
              <p className="text-2xl font-bold text-blue-800">
                {userStats.clients?.total || 0}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Prestataires totaux</p>
              <p className="text-2xl font-bold text-green-800">
                {userStats.providers?.total || 0}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Total utilisateurs</p>
              <p className="text-2xl font-bold text-purple-800">
                {userStats.combined?.total || 0}
              </p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-600">Utilisateurs actifs</p>
              <p className="text-2xl font-bold text-teal-800">
                {userStats.combined?.active || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Graphiques et sections supplémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graphique des réservations */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Activité récente
              </h2>
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
                <option>3 derniers mois</option>
              </select>
            </div>
            <BookingChart
              bookingStats={bookingStats}
              lastReservations={lastReservations}
            />
          </div>

          {/* Dernières réservations */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Dernières réservations
            </h2>
            <div className="space-y-4">
              {lastReservations.slice(0, 3).map((reservation) => (
                <div
                  key={reservation._id}
                  className="flex items-start pb-3 border-b border-gray-100 last:border-0"
                >
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FiCalendar className="text-blue-500" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {reservation.service?.name || "Service inconnu"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(
                        reservation.schedule?.selectedDate ||
                          reservation.schedule?.startDate
                      )}
                      {reservation.schedule?.frequency ===
                        "plusieurs fois par semaine" &&
                        ` - ${formatDate(reservation.schedule?.endDate)}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {reservation.client?.name || "Client inconnu"}
                    </p>
                  </div>
                  <span
                    className={`ml-auto text-xs px-2 py-1 rounded-full ${
                      reservation.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : reservation.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : reservation.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {reservation.status === "completed"
                      ? "Complété"
                      : reservation.status === "cancelled"
                      ? "Annulé"
                      : reservation.status === "pending"
                      ? "En attente"
                      : "Confirmé"}
                  </span>
                </div>
              ))}
              <button
                onClick={handleViewAllReservations}
                className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Voir toutes les réservations →
              </button>
            </div>
          </div>
        </div>

        {/* Section services populaires */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Services populaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bookingStats.popularServices?.map((service, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <h3 className="font-medium text-gray-800">
                    {service._id || "Service inconnu"}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {service.count} réservations
                </p>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                      width: `${(service.count / bookingStats.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatistiqueDash;
