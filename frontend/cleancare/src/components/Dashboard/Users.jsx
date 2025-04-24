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
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        userId: null,
        userName: "",
        userEmail: ""
    });
    const [isDeleting, setIsDeleting] = useState(false);

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
            
            const initialHiddenState = {};
            data.forEach(user => {
                initialHiddenState[user._id] = true;
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
            setHiddenPasswords(prev => ({ ...prev, [data.user._id]: true }));
            setShowAddModal(false);
            setNewUser({ name: "", email: "", password: "", role: "client" });
        } catch (error) {
            setError(error.message);
        }
    };

    const confirmDelete = (userId, userName, userEmail) => {
        setDeleteModal({
            isOpen: true,
            userId,
            userName,
            userEmail
        });
    };

    const handleDeleteUser = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/admin/users/${deleteModal.userId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression");
            }

            setUsers(users.filter(user => user._id !== deleteModal.userId));
            
            setHiddenPasswords(prev => {
                const newState = { ...prev };
                delete newState[deleteModal.userId];
                return newState;
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsDeleting(false);
            setDeleteModal({ isOpen: false, userId: null, userName: "", userEmail: "" });
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
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
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
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 flex items-center">
                                                {hiddenPasswords[user._id] ? (
                                                    <span className="mr-2">••••••••</span>
                                                ) : (
                                                    <span className="mr-2 font-mono">{user.password}</span>
                                                )}
                                                <button 
                                                    onClick={() => togglePasswordVisibility(user._id)}
                                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                                    title={hiddenPasswords[user._id] ? "Afficher" : "Masquer"}
                                                >
                                                    {hiddenPasswords[user._id] ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}> 
                                                    {user.role === 'provider' ? 'Prestataire' : 'Client' }
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                                <button 
                                                    onClick={() => confirmDelete(user._id, user.name, user.email)}
                                                    className="text-red-600 hover:text-red-800 mr-3 transition-colors duration-200"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 scale-95">
                        <h2 className="text-xl font-bold mb-4">Ajouter un Utilisateur</h2>
                        
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom complet</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                    required
                                    minLength="6"
                                    placeholder="Minimum 6 caractères"
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Rôle</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                    required
                                >
                                    <option value="client">Client</option>
                                    <option value="provider">Prestataire</option>
                                </select>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmation de suppression */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-white border border-red-500 rounded-lg p-6 w-full max-w-md transform transition-all duration-300 scale-95">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Confirmer la suppression</h2>
                        <div className="mb-6">
                            <p className="text-gray-700 mb-2">Vous êtes sur le point de supprimer l'utilisateur suivant :</p>
                            <div className="bg-gray-100 p-3 rounded-md">
                                <p className="font-medium">{deleteModal.userName}</p>
                                <p className="text-sm text-gray-600">{deleteModal.userEmail}</p>
                            </div>
                            <p className="text-red-600 mt-3 font-medium">Cette action est irréversible.</p>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: "", userEmail: "" })}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors duration-200"
                                disabled={isDeleting}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Suppression...
                                    </>
                                ) : (
                                    "Confirmer la suppression"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;