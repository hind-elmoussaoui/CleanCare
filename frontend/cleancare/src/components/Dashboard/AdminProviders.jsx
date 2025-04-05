import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";

const ReadMoreCell = ({ text, maxLength = 20 }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!text) return <span className="text-gray-400">-</span>;
  
  if (text.length <= maxLength || expanded) {
    return (
      <div className="flex items-center">
        <span>{text}</span>
        {text.length > maxLength && (
          <button 
            onClick={() => setExpanded(false)}
            className="ml-1 text-xs text-blue-500 hover:underline"
          >
            (Less)
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <span>{text.substring(0, maxLength)}...</span>
      <button 
        onClick={() => setExpanded(true)}
        className="ml-1 text-xs text-blue-500 hover:underline"
      >
        (More)
      </button>
    </div>
  );
};

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
      await axios.put(`http://localhost:5000/api/providers/activate/${id}`);
      setProviders(prevProviders =>
        prevProviders.map(provider =>
          provider._id === id ? { ...provider, isActive: !provider.isActive } : provider
        )
      );
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

  if (loading) return <div className="flex min-h-screen"><Sidebar /><div className="p-6 w-full text-center text-gray-500">Loading...</div></div>;

  return (
    <div className="flex min-h-screen bg-gray-50"> 
      <Sidebar />
      <div className="flex-1 p-6 overflow-hidden">
        <h1 className="text-2xl font-bold mb-6">Providers Admin</h1>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 w-full">
          <div className="w-full">
            <table className="w-full table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-16 px-2 py-3 text-left text-xs font-medium text-gray-600">Photo</th>
                  <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-600">Name</th>
                  <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-600">CIN</th>
                  <th className="w-58 px-2 py-3 text-left text-xs font-medium text-gray-600">Email</th>
                  <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-600">Phone</th>
                  <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-600">Address</th>
                  <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-600">City</th>
                  <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-600">Service</th>
                  <th className="w-10 px-2 py-3 text-left text-xs font-medium text-gray-600">Exp.</th>
                  <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-600">Status</th>
                  <th className="w-40 px-2 py-3 text-left text-xs font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {providers.map((provider) => (
                  <tr key={provider._id} className="hover:bg-gray-50">
                    <td className="px-2 py-4">
                      {provider.photo ? (
                        <img 
                          src={`http://localhost:5000${provider.photo}`}  
                          alt="Provider"
                          className="w-10 h-10 object-cover rounded-full mx-auto"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-xs text-gray-500">No Photo</span>
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700">
                      <ReadMoreCell text={`${provider.firstName} ${provider.lastName}`} maxLength={15} />
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700">
                      {provider.idCard || '-'}
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700">
                      <ReadMoreCell text={provider.email} maxLength={20} />
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700">
                      {provider.phone || '-'}
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700">
                      <ReadMoreCell text={provider.address} maxLength={15} />
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700">
                      <ReadMoreCell text={provider.city} maxLength={15} />
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700">
                      <ReadMoreCell text={provider.services} maxLength={15} />
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-700 text-center">
                      {provider.experience ? `${provider.experience} yrs` : '-'}
                    </td>
                    <td className="px-2 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        provider.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {provider.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-2 py-4 space-x-1">
                      <button
                        onClick={() => toggleActivation(provider._id)}
                        className={`px-2 py-1 rounded text-white text-xs flex items-center ${
                          provider.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {provider.isActive ? (
                          <XCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {provider.isActive ? 'Off' : 'On'}
                      </button>
                      <button
                        onClick={() => deleteProvider(provider._id)}
                        className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs flex items-center"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Del
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
  );
};

export default AdminProviders;