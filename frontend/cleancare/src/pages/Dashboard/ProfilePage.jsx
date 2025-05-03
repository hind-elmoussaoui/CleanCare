import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaMapMarkerAlt, FaBriefcase, FaStar, FaTools, FaSyncAlt } from 'react-icons/fa';
import Sidebar from '../../components/Dashboard/Sidebar';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      let url = 'http://localhost:5000/api/users';
      if (filter === 'provider') {
        url = 'http://localhost:5000/api/users?role=provider';
      } else if (filter === 'client') {
        url = 'http://localhost:5000/api/users?role=client';
      } else if (filter === 'unvalidated') {
        url = 'http://localhost:5000/api/users?role=provider&validated=false';
      }
      
      const res = await axios.get(url);
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleUserValidation = async (userId, newValidationStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/validate/${userId}`, {
        validated: newValidationStatus
      });
      
      // Mise à jour optimiste de l'état local
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, validated: newValidationStatus } : user
        )
      );
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      // Recharger les données en cas d'erreur
      fetchUsers();
    }
  };

  if (loading) return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 text-center">Chargement...</div>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Tous
            </button>
            <button 
              onClick={() => setFilter('client')}
              className={`px-4 py-2 rounded ${filter === 'client' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Clients
            </button>
            <button 
              onClick={() => setFilter('provider')}
              className={`px-4 py-2 rounded ${filter === 'provider' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Prestataires
            </button>
            <button 
              onClick={() => setFilter('unvalidated')}
              className={`px-4 py-2 rounded ${filter === 'unvalidated' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Non validés
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard 
              key={user._id} 
              user={user} 
              onValidation={handleUserValidation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user, onValidation }) => {
  const [isValidating, setIsValidating] = useState(false);

  const handleValidation = async () => {
    setIsValidating(true);
    await onValidation(user._id, !user.validated);
    setIsValidating(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaUser className="text-blue-500 text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{user.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm px-2 py-1 rounded-full ${
                user.role === 'provider' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {user.role === 'provider' ? 'Prestataire' : 'Client'}
              </span>
              {user.role === 'provider' && user.validated && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                  <FaStar className="mr-1" /> Validé
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <FaPhone className="mr-2" />
            <span>{user.phone || 'Non renseigné'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>{user.address || 'Non renseignée'}</span>
          </div>
        </div>

        {user.role === 'provider' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold flex items-center">
                <FaBriefcase className="mr-2" />
                Informations Pro
              </h4>
              <button
                onClick={handleValidation}
                disabled={isValidating}
                className={`px-3 py-1 text-sm rounded flex items-center ${
                  user.validated 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                } ${isValidating ? 'opacity-50' : ''}`}
              >
                {isValidating ? (
                  <span className="flex items-center">
                    <FaSyncAlt className="animate-spin mr-1" />
                    {user.validated ? 'Dévalidation...' : 'Validation...'}
                  </span>
                ) : user.validated ? (
                  'Validé ✓'
                ) : (
                  'Valider le profil'
                )}
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaStar className="mr-2 text-yellow-500" />
                <span>{user.experience || 0} ans d'expérience</span>
              </div>
              {user.services?.length > 0 && (
                <div>
                  <p className="font-medium flex items-center">
                    <FaTools className="mr-2" />
                    Services:
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.services.map((service, index) => (
                      <span key={index} className="bg-white px-2 py-1 text-xs rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {user.photo && (
          <div className="mt-4">
            <img 
              src={`http://localhost:5000/uploads/${user.photo}`} 
              alt="Profile" 
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;