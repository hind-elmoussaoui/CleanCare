import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaCalendar, FaCog, FaBook, FaTrash } from 'react-icons/fa';
import Sidebar from '../../components/Dashboard/Sidebar';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les messages depuis l'API
    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/contacts');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des messages');
            }
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour supprimer un message
    const deleteMessage = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du message');
            }
            
            // Rafraîchir la liste des messages après suppression
            fetchMessages();
        } catch (err) {
            setError(err.message);
        }
    };

    // Charger les messages au montage du composant
    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Chargement en cours...</div>;
    }

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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <button
                                            onClick={() => deleteMessage(message._id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Supprimer"
                                        >
                                            <FaTrash />
                                        </button>
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