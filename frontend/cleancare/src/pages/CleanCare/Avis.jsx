import React, { useState, useEffect } from "react";
import { FiX, FiStar, FiChevronDown } from "react-icons/fi";
import starBackground from '../../assets/avis.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvisCard = ({ name, role, comment, rating }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 border-l-4 border-blue-500">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
          {name[0]}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4 italic">"{comment}"</p>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
      </div>
    </div>
  );
};

const Avis = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAvis, setNewAvis] = useState({
    name: "",
    role: "",
    comment: "",
    rating: 0,
    city: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [avisList, setAvisList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gestion séparée du type de service et de la ville
  const handleServiceChange = (e) => {
    const serviceType = e.target.value;
    setNewAvis(prev => ({
      ...prev,
      role: newAvis.city ? `${serviceType} - ${newAvis.city}` : serviceType
    }));
  };
  
  const handleCityChange = (e) => {
    const city = e.target.value;
    const serviceBase = newAvis.role.split(" - ")[0] || "";
    setNewAvis(prev => ({
      ...prev,
      city,
      role: serviceBase ? `${serviceBase} - ${city}` : ""
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvis((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setNewAvis((prev) => ({ ...prev, rating }));
  };

  // Charger uniquement les avis approuvés
  useEffect(() => {
    const fetchApprovedAvis = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/avis?status=approved');
        if (!response.ok) throw new Error('Erreur de chargement des avis');
        
        const data = await response.json();
        setAvisList(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedAvis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer l'avis avec status "pending" par défaut
      const response = await fetch('http://localhost:5000/api/avis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newAvis,
          rating: newAvis.rating || 1,
          status: "pending" // Statut initial
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la soumission');

      // Réinitialiser le formulaire
      setNewAvis({
        name: "",
        role: "",
        comment: "",
        rating: 0,
        city: "",
      });
      setShowModal(false);
      
      // Nouveau message toast stylé
    toast.success(
      <div className="p-2">
        <h3 className="font-bold text-lg">Merci pour votre avis !</h3>
        <p className="text-gray-600">Il sera publié après validation par notre équipe.</p>
      </div>, 
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "border-l-4 border-green-500",
      }
    );

    } catch (error) {
      console.error('Erreur:', error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Toutes les villes marocaines par région
  const villesParRegion = {
    "Casablanca-Settat": ["Casablanca", "Mohammédia", "El Jadida", "Settat", "Benslimane", "Berrechid", "Nouaceur", "Médiouna" ],
    "Rabat-Salé-Kénitra": ["Rabat", "Salé", "Kénitra", "Témara", "Skhirat", "Sidi Kacem", "Sidi Slimane" ],
    "Tanger-Tétouan-Al Hoceïma": ["Tanger", "Tétouan", "Al Hoceïma", "Larache", "Chefchaouen", "Fnideq", "M'diq"],
    "Fès-Meknès": ["Fès", "Meknès", "Ifrane", "Sefrou", "Moulay Yacoub", "El Hajeb", "Taounate", "Taza"],
    "Marrakech-Safi": ["Marrakech", "Safi", "El Kelâa des Sraghna", "Essaouira", "Youssoufia", "Rehamna", "Chichaoua"],
    Oriental: ["Oujda", "Nador", "Berkane", "Taourirt", "Jerada", "Figuig", "Driouch"],
    "Béni Mellal-Khénifra": ["Béni Mellal", "Khénifra", "Khouribga", "Fquih Ben Salah", "Azilal"],
    "Souss-Massa": ["Agadir", "Inezgane-Aït Melloul", "Taroudant", "Tiznit", "Tata", "Oulad Teima", "Chtouka-Aït Baha"],
    "Guelmim-Oued Noun": ["Guelmim", "Sidi Ifni", "Tan-Tan", "Assa-Zag"],
    "Laâyoune-Sakia El Hamra": ["Laâyoune", "Boujdour", "Tarfaya", "Es-Semara"],
    "Dakhla-Oued Ed-Dahab": ["Dakhla", "Aousserd"],
    "Drâa-Tafilalet": [ "Errachidia", "Ouarzazate", "Tinghir", "Zagora", "Midelt"]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Témoignages de Nos Clients
          </h1>
          <p className="text-xl text-gray-600">
            Ce que disent les familles marocaines sur nos services
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avisList.length > 0 ? (
            avisList.map((avis) => (
              <AvisCard 
                key={avis._id} 
                name={avis.name}
                role={avis.role}
                comment={avis.comment}
                rating={avis.rating}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Aucun avis approuvé pour le moment</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Vous aussi, partagez votre expérience
          </h2>
          <p className="text-gray-600 mb-6">
            Votre avis compte pour nous aider à améliorer nos services
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
          >
            Laisser un Avis
          </button>
        </div>

        {/* Modal pour ajouter un avis */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${starBackground})` }}
            ></div>
            <div className="bg-white text-black rounded-lg w-full max-w-md p-6 relative z-10 border">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Donnez votre avis
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="block text-gray-700">
                    Votre nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newAvis.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700">
                    Type de service
                  </label>
                  <select
                    name="role"
                    value={newAvis.role.split(" - ")[0] || ""}
                    onChange={handleServiceChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="Client Femme de Ménage">Femme de ménage</option>
                    <option value="Client Nounou">Nounou</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700">Ville</label>
                  <select
                    name="city"
                    value={newAvis.city}
                    onChange={handleCityChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    required
                  >
                    <option value="">Sélectionnez votre ville</option>
                    {Object.entries(villesParRegion).map(([region, villes]) => (
                      <optgroup label={region} key={region}>
                        {villes.map((ville) => (
                          <option key={ville} value={ville}>
                            {ville}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700">Note</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl focus:outline-none"
                      >
                        <FiStar
                          className={`${
                            (hoverRating || newAvis.rating) >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 ">
                    Votre commentaire
                  </label>
                  <textarea
                    name="comment"
                    value={newAvis.comment}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                >
                  Envoyer votre avis
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer 
      toastClassName="shadow-lg"
      bodyClassName="font-sans"
      progressClassName="bg-blue-500"
      />
    </div>
  );
};

export default Avis;