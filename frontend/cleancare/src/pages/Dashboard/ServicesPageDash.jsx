import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentAction, setCurrentAction] = useState({ type: null, id: null, status: null });

  useEffect(() => {
    fetchReservations();
  }, []);

  const showNotification = (message, isSuccess) => {
    setNotification({ message, isSuccess });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/bookings");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des réservations");
      }

      const bookingsData = await response.json();
      setReservations(bookingsData);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
      showNotification("Erreur lors du chargement des réservations", false);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      setReservations(
        reservations.map((res) =>
          res._id === id ? { ...res, status: newStatus } : res
        )
      );

      const statusMessages = {
        confirmed: "Réservation confirmée avec succès",
        in_progress: "Réservation marquée comme en cours",
        completed: "Réservation marquée comme complétée",
        cancelled: "Réservation annulée"
      };

      showNotification(statusMessages[newStatus] || "Statut mis à jour", true);
    } catch (err) {
      console.error("Erreur:", err);
      showNotification("Échec de la mise à jour du statut", false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      setReservations(reservations.filter((item) => item._id !== id));
      showNotification("Réservation supprimée avec succès", true);
    } catch (err) {
      console.error("Erreur:", err);
      showNotification("Échec de la suppression de la réservation", false);
    }
  };

  const confirmAction = (type, id, status = null) => {
    setCurrentAction({ type, id, status });
    setShowConfirmModal(true);
  };

  const executeAction = () => {
    if (currentAction.type === "delete") {
      handleDelete(currentAction.id);
    } else if (currentAction.type === "status") {
      handleStatusChange(currentAction.id, currentAction.status);
    }
    setShowConfirmModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifié";
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

  const getActionMessage = () => {
    if (currentAction.type === "delete") {
      return "Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.";
    }
    
    const statusMessages = {
      confirmed: "Confirmer cette réservation ?",
      in_progress: "Marquer cette réservation comme 'en cours' ?",
      completed: "Marquer cette réservation comme 'complétée' ?",
      cancelled: "Annuler cette réservation ?"
    };
    
    return statusMessages[currentAction.status] || "Confirmer cette action ?";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
            notification.isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 mr-2 ${notification.isSuccess ? "text-green-500" : "text-red-500"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {notification.isSuccess ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              )}
            </svg>
            <span>{notification.message}</span>
          </div>
        )}

        {/* Modal de confirmation */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full border border-red-600">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-semibold">Confirmation requise</h3>
              </div>
              <p className="mb-4">{getActionMessage()}</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={executeAction}
                  className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
          Toutes les Réservations
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune réservation disponible
            </div>
          ) : (
            <div className="overflow-x-visible overflow-y-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de réservation
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates de service
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix Total
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => (
                    <tr key={reservation._id}>
                      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-normal text-sm text-gray-500">
                        {formatDate(reservation.createdAt)}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-normal">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.service?.name || "N/A"}
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-normal">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.client?.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.client?.phone || ""}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.client?.email || ""}
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-normal text-sm text-gray-900">
                        {reservation.schedule?.frequency ===
                        "une seule fois" ? (
                          formatDate(reservation.schedule.selectedDate)
                        ) : (
                          <>
                            Du {formatDate(reservation.schedule?.startDate)}
                            <br />
                            Au {formatDate(reservation.schedule?.endDate)}
                            {reservation.schedule?.selectedDays?.length > 0 && (
                              <div className="text-xs text-gray-500">
                                Jours:{" "}
                                {reservation.schedule.selectedDays.join(", ")}
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reservation.totalPrice ||
                          reservation.service?.price ||
                          "N/A"}{" "}
                        MAD
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        reservation.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : reservation.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : reservation.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                        >
                          {reservation.status === "completed"
                            ? "Complété"
                            : reservation.status === "cancelled"
                            ? "Annulé"
                            : reservation.status === "pending"
                            ? "En attente"
                            : reservation.status === "in_progress"
                            ? "En cours"
                            : "Confirmé"}
                        </span>
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-sm font-medium space-x-2">
                        {reservation.status === "pending" && (
                          <>
                            <button
                              onClick={() => confirmAction("status", reservation._id, "confirmed")}
                              className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                              title="Confirmer la réservation"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => confirmAction("delete", reservation._id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                              title="Refuser la réservation"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        )}

                        {reservation.status === "confirmed" && (
                          <button
                            onClick={() => confirmAction("status", reservation._id, "in_progress")}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                            title="Marquer comme en cours"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}

                        {reservation.status === "in_progress" && (
                          <button
                            onClick={() => confirmAction("status", reservation._id, "completed")}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-50"
                            title="Marquer comme complété"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}

                        {reservation.status !== "completed" &&
                          reservation.status !== "cancelled" && (
                            <button
                              onClick={() => confirmAction("status", reservation._id, "cancelled")}
                              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 ml-2"
                              title="Annuler la réservation"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}

                        <button
                          onClick={() => confirmAction("delete", reservation._id)}
                          className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-50 ml-2"
                          title="Supprimer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;