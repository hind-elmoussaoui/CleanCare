import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";

function Users() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/clients");
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Erreur lors de la récupération des clients.");
                }
                const data = await response.json();
                setClients(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 p-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 p-8 text-red-600">
                    Erreur: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar fixe */}
            <Sidebar />
            
            {/* Contenu principal */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                        Liste des Utilisateurs
                    </h1>
                    
                    {/* Conteneur du tableau avec scrolling */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                            Prénom
                                        </th>
                                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                            Nom
                                        </th>
                                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                            Téléphone
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {clients.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800">
                                                {client.firstName}
                                            </td>
                                            <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800">
                                                {client.lastName}
                                            </td>
                                            <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800 truncate max-w-[150px] md:max-w-none">
                                                {client.email}
                                            </td>
                                            <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800">
                                                {client.phone}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;