import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const ServicesPage = () => {
  const [services, setServices] = useState({ data: [] });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Erreur de chargement des services:", error));

    fetch("http://localhost:5000/api/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Erreur de chargement des réservations:", error));
  }, []);

  return (
    <div className="flex h-screen"> 
     {/* Ajout de `flex h-screen` pour aligner Sidebar et Content */}
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">  {/* `flex-1` pour occuper l'espace restant */}
        <h1 className="text-2xl font-bold mb-4">Services Page</h1>

        {/* Affichage des Services */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Service</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Date Start</th>
                <th className="p-2 text-left">Date End</th>
                <th className="p-2 text-left">Days</th>
                <th className="p-2 text-left">Client</th>
                <th className="p-2 text-left">Number of People</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(services.data) && services.data.length > 0 ? (
                services.data.map((service) => (
                  <tr key={service._id} className="border-t">
                    <td className="p-2">{service.service.name}</td>
                    <td className="p-2">{service.service.price}MAD</td>
                    <td className="p-2">{new Date(service.startDate).toLocaleDateString()}</td>
                    <td className="p-2">{new Date(service.endDate).toLocaleDateString()}</td>
                    <td className="p-2">{service.selectedDays.join(", ") || "Aucun jour sélectionné"}</td>
                    <td className="p-2">{service.name}</td>
                    <td className="p-2">{service.accommodates}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2" colSpan="7">No services available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Affichage des Réservations */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Service</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Date Start</th>
                <th className="p-2 text-left">Date End</th>
                <th className="p-2 text-left">Days</th>
                <th className="p-2 text-left">Client</th>
                <th className="p-2 text-left">Number of People</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((service) => (
                  <tr key={service._id} className="border-t">
                    <td className="p-2">{service.service.name}</td>
                    <td className="p-2">{service.service.price}MAD</td>
                    <td className="p-2">{new Date(service.startDate).toLocaleDateString()}</td>
                    <td className="p-2">{new Date(service.endDate).toLocaleDateString()}</td>
                    <td className="p-2">{service.selectedDays.join(", ") || "Aucun jour sélectionné"}</td>
                    <td className="p-2">{service.name}</td>
                    <td className="p-2">{service.accommodates}</td>
                  </tr>
                ))


              ) : (
                <tr>
                  <td className="p-2" colSpan="7">No bookings available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
