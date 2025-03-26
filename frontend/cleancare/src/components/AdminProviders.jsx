import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/providers");
      setProviders(response.data); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching providers:", error);
      setLoading(false);
    }
  };

  const toggleActivation = async (id) => {
    try {
      console.log("Toggling activation for provider ID:", id); // Log l'ID du prestataire
    const response = await axios.put(`http://localhost:5000/api/providers/activate/${id}`);
    console.log("Server response:", response.data); // Log la réponse du serveur
    // Mettre à jour l'état `providers`
    setProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider._id === id ? { ...provider, isActive: !provider.isActive } : provider
      )
    ); // Rafraîchir la liste des prestataires
  } catch (error) {
    console.error("Error toggling provider activation:", error);
    }
  };

  const deleteProvider = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/providers/${id}`);
      fetchProviders();
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <> 
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Providers Admin</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600">
              <th className="px-4 py-3 text-left text-sm font-semibold">Photo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">CIN</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Address</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">City</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Experience</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider._id} className="border-b hover:bg-gray-50 text-gray-700">
                <td className="px-4 py-3">
                  {provider.photo ? (
                    <img 
                      src={`http://localhost:5000${provider.photo}`}  
                      alt="Provider"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500">No Photo</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">{provider.firstName} {provider.lastName}</td>
                <td className="px-4 py-3">{provider.idCard}</td>
                <td className="px-4 py-3">{provider.email}</td>
                <td className="px-4 py-3">{provider.phone}</td>
                <td className="px-4 py-3">{provider.address}</td>
                <td className="px-4 py-3">{provider.city}</td>
                <td className="px-4 py-3">{provider.services}</td>
                <td className="px-4 py-3">{provider.experience} years</td>
                <td className="px-4 py-3">
                  {provider.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button 
                    className="px-3 py-1 rounded-md text-white text-sm transition-all"
                    onClick={() => toggleActivation(provider._id)}
                    style={{
                      backgroundColor: provider.isActive ? "#ef4444" : "#10b981",
                    }}
                  >
                    {provider.isActive ? <XCircle className="inline-block mr-1" /> : <CheckCircle className="inline-block mr-1" />}
                    {provider.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button 
                    className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-700 transition-all"
                    onClick={() => deleteProvider(provider._id)}
                  >
                    <Trash2 className="inline-block mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default AdminProviders;
