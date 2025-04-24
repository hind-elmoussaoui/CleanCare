import React, { useEffect, useState } from "react";
import { FaTrash, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
import Sidebar from "./Sidebar";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [notification, setNotification] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    // Afficher une notification pendant 3 secondes
    const showNotification = (message, isSuccess) => {
        setNotification({ message, isSuccess });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/orders");
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes :", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            setOrders(orders.filter(order => order._id !== id));
            showNotification("La commande a été supprimée avec succès", true);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            showNotification(`Échec de la suppression : ${error.message}`, false);
        } finally {
            setDeletingId(null);
            setShowConfirmModal(false);
        }
    };

    const confirmDelete = (order) => {
        setOrderToDelete(order);
        setShowConfirmModal(true);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-4">Erreur</h2>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            
            <div className="flex-1 overflow-hidden p-4 md:p-6">
                {/* Notification Toast */}
                {notification && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
                        notification.isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                        {notification.isSuccess ? (
                            <FaCheckCircle className="mr-2" />
                        ) : (
                            <FaTimesCircle className="mr-2" />
                        )}
                        <span>{notification.message}</span>
                    </div>
                )}

                {/* Modal de confirmation */}
                {showConfirmModal && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full border border-red-600">
                            <div className="flex items-center mb-4">
                                <FaExclamationTriangle className="text-yellow-500 text-xl mr-2" />
                                <h3 className="text-lg font-semibold">Confirmer la suppression</h3>
                            </div>
                            <p className="mb-4">
                                Êtes-vous sûr de vouloir supprimer la commande de <strong>{orderToDelete?.firstName} {orderToDelete?.lastName}</strong> ?
                                <br />
                                Cette action est irréversible.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={() => handleDelete(orderToDelete._id)}
                                    disabled={deletingId === orderToDelete._id}
                                    className={`px-4 py-2 rounded-md text-white ${
                                        deletingId === orderToDelete._id 
                                            ? "bg-red-400 cursor-not-allowed" 
                                            : "bg-red-600 hover:bg-red-700"
                                    }`}
                                >
                                    {deletingId === orderToDelete._id ? (
                                        <span className="inline-flex items-center">
                                            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                            Suppression...
                                        </span>
                                    ) : (
                                        "Confirmer la suppression"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Tableau de bord des commandes</h2>
                    <p className="text-gray-600">{orders.length} commandes trouvées</p>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Client</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Localisation</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Commande</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{order.firstName} {order.lastName}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{order.email}</div>
                                            <div className="text-sm text-gray-500">{order.phone}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-900">{order.city}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-[150px]">{order.address}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.plan?.name || 'N/A'}</div>
                                            <div className="text-sm text-gray-500">{order.plan?.price || '0'} MAD</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => confirmDelete(order)}
                                                disabled={deletingId === order._id}
                                                className={`text-red-500 hover:text-red-700 ${
                                                    deletingId === order._id ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                                title="Supprimer la commande"
                                            >
                                                {deletingId === order._id ? (
                                                    <span className="inline-block h-4 w-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></span>
                                                ) : (
                                                    <FaTrash />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDashboard;