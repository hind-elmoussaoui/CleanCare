import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiStar, FiPlus, FiX } from 'react-icons/fi';
import Sidebar from './Sidebar';

const GestionAvis = () => {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAvis, setCurrentAvis] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    comment: '',
    rating: 0,
    city: ''
  });

  const villesParRegion = {
    "Casablanca-Settat": ["Casablanca", "Mohammédia", "El Jadida", "Settat"],
    "Rabat-Salé-Kénitra": ["Rabat", "Salé", "Kénitra", "Témara"],
    "Tanger-Tétouan-Al Hoceïma": ["Tanger", "Tétouan", "Al Hoceïma", "Larache"],
    "Fès-Meknès": ["Fès", "Meknès", "Ifrane", "Sefrou"],
    "Marrakech-Safi": ["Marrakech", "Safi", "Essaouira", "Youssoufia"],
    Oriental: ["Oujda", "Nador", "Berkane", "Taourirt"],
    "Béni Mellal-Khénifra": ["Béni Mellal", "Khénifra", "Khouribga", "Azilal"],
    "Souss-Massa": ["Agadir", "Taroudant", "Tiznit", "Tata"],
    "Guelmim-Oued Noun": ["Guelmim", "Sidi Ifni", "Tan-Tan"],
    "Laâyoune-Sakia El Hamra": ["Laâyoune", "Boujdour"],
    "Dakhla-Oued Ed-Dahab": ["Dakhla"],
    "Drâa-Tafilalet": ["Ouarzazate", "Tinghir", "Zagora"]
  };

  const fetchAvis = async () => {
    try {
      let url = 'http://localhost:5000/api/avis';
      if (filter !== 'all') {
        url += `?status=${filter}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur lors de la récupération des avis');
      
      const data = await response.json();
      setAvis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAvis();
  }, [filter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleAddAvis = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/avis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'approved'
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout');

      const newAvis = await response.json();
      setAvis([newAvis, ...avis]);
      setShowAddModal(false);
      setFormData({
        name: '',
        role: '',
        comment: '',
        rating: 0,
        city: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/avis/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour');
      
      fetchAvis();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/avis/${currentAvis._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setAvis(avis.filter(item => item._id !== currentAvis._id));
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 text-red-500">
        Erreur: {error}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Avis Clients</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Ajouter un Avis
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg ${
                filter === f 
                  ? f === 'all' ? 'bg-blue-600 text-white' :
                    f === 'pending' ? 'bg-yellow-500 text-white' :
                    f === 'approved' ? 'bg-green-600 text-white' :
                    'bg-red-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {f === 'all' ? 'Tous' :
               f === 'pending' ? 'En attente' :
               f === 'approved' ? 'Approuvés' : 'Rejetés'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {avis.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.comment.substring(0, 30)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.role.split(' - ')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'approved' ? 'bg-green-100 text-green-800' :
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'approved' ? 'Approuvé' : 
                       item.status === 'pending' ? 'En attente' : 'Rejeté'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {item.status !== 'approved' && (
                      <button
                        onClick={() => handleStatusChange(item._id, 'approved')}
                        className="text-green-600 hover:text-green-900"
                        title="Approuver"
                      >
                        ✓
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(item._id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                        title="Rejeter"
                      >
                        ✗
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCurrentAvis(item);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                      title="Supprimer"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Ajouter un Avis</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddAvis}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Type de service</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="Client Femme de Ménage">Femme de ménage</option>
                    <option value="Client Nounou">Nounou</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Ville</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    {Object.entries(villesParRegion).map(([region, villes]) => (
                      <optgroup label={region} key={region}>
                        {villes.map(ville => (
                          <option key={ville} value={ville}>{ville}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Note</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className="mr-2 focus:outline-none"
                      >
                        <FiStar
                          className={`w-6 h-6 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Commentaire</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="mr-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
              <p className="mb-6">Êtes-vous sûr de vouloir supprimer l'avis de {currentAvis?.name} ?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="mr-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionAvis;