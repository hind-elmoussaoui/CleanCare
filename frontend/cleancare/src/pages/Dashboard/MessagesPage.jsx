import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaCalendar, FaCog, FaBook } from 'react-icons/fa';
import Sidebar from '../../components/Dashboard/Sidebar';

const Messages = () => {
    const [messages, setMessages] = useState([]); // État pour stocker les messages
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

  // Fonction pour récupérer les messages depuis l'API
    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/contacts');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des messages');
            }
            const data = await response.json();
            setMessages(data); // Mettre à jour l'état avec les messages
            } catch (err) {
                setError(err.message); // Gérer les erreurs
                } finally {
                    setLoading(false); // Arrêter le chargement
                }
    };

  // Charger les messages au montage du composant
    useEffect(() => {
        fetchMessages();
    }, []);

  // Afficher un message de chargement
    if (loading) {
        return <div className="text-center py-8">Chargement en cours...</div>;
    }

  // Afficher un message d'erreur
    if (error) {
        return <div className="text-center py-8 text-red-500">Erreur : {error}</div>;
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Messages de Contact</h1>

      {/* Tableau pour afficher les messages */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <FaUser className="inline-block mr-2" />
                            Nom
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <FaEnvelope className="inline-block mr-2" />
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <FaCog className="inline-block mr-2" />
                            Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <FaBook className="inline-block mr-2" />
                            Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <FaComment className="inline-block mr-2" />
                            Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <FaCalendar className="inline-block mr-2" />
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {messages.map((message) => (
                        <tr key={message._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {message.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {message.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {message.service}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {message.subject}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {message.message}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(message.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </div>
    );
};

export default Messages;