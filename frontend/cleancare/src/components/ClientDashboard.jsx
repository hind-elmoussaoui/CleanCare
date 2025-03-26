import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/loginProvider");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/clients/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setClient(data);
        } else {
          setError(data.message || "Erreur lors de la récupération des données.");
        }
      } catch (error) {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-2xl w-full bg-white p-6 shadow-lg rounded-xl border-2 border-pink-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Tableau de Bord Client</h2>
        
        {error && (
          <div className="bg-red-200 p-4 rounded-md mb-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {client ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Prénom</label>
              <p className="w-full p-2 border rounded-lg bg-gray-100">{client.firstName}</p>
            </div>
            <div>
              <label className="block text-gray-700">Nom</label>
              <p className="w-full p-2 border rounded-lg bg-gray-100">{client.lastName}</p>
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <p className="w-full p-2 border rounded-lg bg-gray-100">{client.email}</p>
            </div>
            <div>
              <label className="block text-gray-700">Téléphone</label>
              <p className="w-full p-2 border rounded-lg bg-gray-100">{client.phone}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Aucune donnée disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;