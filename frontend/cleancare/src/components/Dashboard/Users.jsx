import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "client"
    });
    const [hiddenPasswords, setHiddenPasswords] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/api/admin/users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des utilisateurs");
            }
            
            const data = await response.json();
            setUsers(data);
            
            // Initialiser l'état de visibilité des mots de passe
            const initialHiddenState = {};
            data.forEach(user => {
                initialHiddenState[user._id] = false;
            });
            setHiddenPasswords(initialHiddenState);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getRoleColor = (role) => {
        switch(role) {
            case 'provider': return 'bg-yellow-100 text-yellow-800';
            case 'client': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const togglePasswordVisibility = (userId) => {
        setHiddenPasswords(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'ajout de l'utilisateur");
            }

            const data = await response.json();
            setUsers([...users, data.user]);
            setHiddenPasswords(prev => ({ ...prev, [data.user._id]: false }));
            setShowAddModal(false);
            setNewUser({ name: "", email: "", password: "", role: "client" });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression");
                }

                setUsers(users.filter(user => user._id !== userId));
                
                // Mettre à jour l'état de visibilité
                setHiddenPasswords(prev => {
                    const newState = { ...prev };
                    delete newState[userId];
                    return newState;
                });
            } catch (error) {
                setError(error.message);
            }
        }
    };

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
                <div className="flex-1 p-8">
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className="font-bold">Erreur</p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Gestion des Utilisateurs
                        </h1>
                        <button 
                            onClick={() => setShowAddModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                        >
                            <FaPlus className="mr-2" /> Ajouter Utilisateur
                        </button>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">Nom</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">Mot de passe</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">Rôle</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 flex items-center">
                                                {hiddenPasswords[user._id] ? (
                                                    <span className="mr-2">{user.password}</span>
                                                ) : (
                                                    <span className="mr-2">••••••••</span>
                                                )}
                                                <button 
                                                    onClick={() => togglePasswordVisibility(user._id)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                    title={hiddenPasswords[user._id] ? "Masquer" : "Afficher"}
                                                >
                                                    {hiddenPasswords[user._id] ? <FaEye /> :  <FaEyeSlash />}
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}> 
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                                <button 
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="text-red-600 hover:text-red-800 mr-3"
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
            </div>

            {/* Modal d'ajout */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Ajouter un Utilisateur</h2>
                        
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom complet</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                    required
                                    placeholder="Minimum 8 caractères"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Rôle</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                    required
                                >
                                    <option value="client">Client</option>
                                    <option value="provider">Provider</option>
                                </select>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;