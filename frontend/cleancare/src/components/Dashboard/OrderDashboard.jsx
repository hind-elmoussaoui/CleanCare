import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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