import React, { useEffect, useState } from "react";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les commandes depuis l'API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/orders");
                console.log("Réponse de l'API :", response); // Log de la réponse

                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }

                const data = await response.json();
                console.log("Données reçues :", data); // Log des données
                setOrders(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes :", error); // Log de l'erreur
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Erreur</h2>
                <p className="text-red-500">{error}</p>
                <p>Veuillez vérifier la console pour plus de détails.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Tableau de bord des commandes</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Nom</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Téléphone</th>
                            <th className="py-2 px-4 border">Ville</th>
                            <th className="py-2 px-4 border">Adresse</th>
                            <th className="py-2 px-4 border">Pack</th>
                            <th className="py-2 px-4 border">Prix</th>
                            <th className="py-2 px-4 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{order.firstName} {order.lastName}</td>
                                <td className="py-2 px-4 border">{order.email}</td>
                                <td className="py-2 px-4 border">{order.phone}</td>
                                <td className="py-2 px-4 border">{order.city}</td>
                                <td className="py-2 px-4 border">{order.address}</td>
                                <td className="py-2 px-4 border">{order.plan.name}</td>
                                <td className="py-2 px-4 border">{order.plan.price} MAD</td>
                                <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDashboard;