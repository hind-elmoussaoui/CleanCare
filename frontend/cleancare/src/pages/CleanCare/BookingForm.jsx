import React, { useState } from "react";

const steps = [" Détails", " Dates", "Infos perso", "Confirmer"];

const servicesData = [
    { id: 1, name: "Ménage à domicile", description: "Nettoyage complet de votre maison.", price: "150" },
    { id: 2, name: "Garde d’enfants", description: "Une nounou qualifiée pour vos enfants.", price: "200" },
    { id: 3, name: "Ménage de bureaux", description: "Entretien et propreté de votre espace de travail.", price: "250" },
    { id: 4, name: "Garde de nuit", description: "Une assistance pour la nuit pour vos enfants.", price: "300" },
    { id: 5, name: "Ménage en profondeur", description: "Nettoyage après un départ ou une arrivée.", price: "350" },
    { id: 6, name: "Baby-sitting week-end", description: "Garde de vos enfants le week-end.", price: "180" },
];

const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function BookingForm() {
    const [step, setStep] = useState(0);
    const [selectedService, setSelectedService] = useState(null);
    const [frequency, setFrequency] = useState("une seule fois");
    const [selectedDate, setSelectedDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [accommodates, setAccommodates] = useState(1);
    

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));

    const toggleDaySelection = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleReservation = async () => {
        // Validation des champs
        if (!selectedService) return alert("Veuillez choisir un service.");
        if (frequency === "une seule fois" && !selectedDate) return alert("Veuillez choisir une date.");
        if (frequency === "plusieurs fois par semaine" && (!startDate || !endDate || selectedDays.length === 0 || new Date(startDate) > new Date(endDate))) {
            return alert("Veuillez choisir une date de début, une date de fin valide et au moins un jour.");
        }
        if (!name || !location) return alert("Veuillez entrer votre nom et localisation.");
    
        // Préparer les données à envoyer
        const bookingData = {
            service: {
                name: selectedService.name,
                description: selectedService.description,
                price: selectedService.price,
            },
            frequency,
            selectedDate: frequency === "une seule fois" ? selectedDate : null,
            startDate: frequency === "plusieurs fois par semaine" ? startDate : null,
            endDate: frequency === "plusieurs fois par semaine" ? endDate : null,
            selectedDays: frequency === "plusieurs fois par semaine" ? selectedDays : [],
            name,
            location,
            accommodates,
        };
    
        console.log("Données envoyées à l'API :", bookingData); // Log des données
    
        try {
            // Envoyer les données à l'API
                    const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
            console.log("Réponse de l'API :", response); // Log de la réponse
    
            if (response.ok) {
                const data = await response.json();
                console.log("Données reçues de l'API :", data); // Log des données reçues
                if (data) {
                    alert("Réservation confirmée !");
                    nextStep(); // Passer à l'étape suivante
                } else {
                //    alert("Erreur lors de la réservation. Veuillez réessayer.");
                }
            } else {
                const errorData = await response.json(); // Lire le message d'erreur de l'API
                console.error("Erreur de l'API :", errorData);
                alert(`Erreur lors de la réservation : ${errorData.message || "Veuillez réessayer."}`);
            }
        } catch (err) {
            console.error("Erreur :", err);
            alert("Erreur lors de la réservation. Veuillez réessayer.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <div className="flex justify-between">
                    {steps.map((s, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                                index === step ? "bg-[#ed117f]" : "bg-gray-300"
                            }`}>
                                {index + 1}
                            </div>
                            <span className={`text-sm mt-1 ${index === step ? "font-bold text-[#ed117f]" : "text-gray-500"}`}>
                                {s}
                            </span>
                        </div>
                    ))}
                </div>

                {step === 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-center mb-4">Choisissez un service</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {servicesData.map((service) => (
                                <button 
                                    key={service.id} 
                                    onClick={() => setSelectedService(service)}
                                    className={`p-4 rounded-lg border ${
                                        selectedService?.id === service.id ? "bg-[#ed117f] text-white" : "bg-gray-200"
                                    }`}
                                >
                                    {service.name}
                                </button>
                            ))}
                        </div>
                        {selectedService && (
                            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                                <p className="font-bold">Description :</p>
                                <p>{selectedService.description}</p>
                                <p className="font-bold mt-2">Prix : {selectedService.price}MAD</p>
                            </div>
                        )}
                        <button onClick={nextStep} className="w-full py-3 mt-5 bg-[#ed117f] text-white font-semibold rounded-lg hover:bg-pink-700 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!selectedService}>
                            Suivant
                        </button>
                    </div>
                )}

                {step === 1 && selectedService && (
                    <div>
                        <h2 className="text-xl font-bold text-center mb-4">Choisissez les dates</h2>
                        <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="mt-2 p-2 border rounded-lg w-full">
                            <option value="une seule fois">Une seule fois</option>
                            <option value="plusieurs fois par semaine">Plusieurs fois par semaine</option>
                        </select>
                        {frequency === "une seule fois" ? (
                            <div className="mt-4">
                                <label>Date :</label>
                                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-2 border rounded-lg w-full" />
                            </div>
                        ) : (
                            <>
                                <div className="mt-4">
                                    <label>Date de début :</label>
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded-lg w-full" />
                                </div>
                                <div className="mt-4">
                                    <label>Date de fin :</label>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded-lg w-full" />
                                    <div className="flex flex-wrap mt-4">
                                    {daysOfWeek.map((day) => (
                                        <button key={day} onClick={() => toggleDaySelection(day)} className={`m-1 px-3 py-2 rounded-lg border ${selectedDays.includes(day) ? "bg-green-500 text-white" : "bg-gray-200"}`}>{day}</button>
                                    ))}
                                </div>
                                </div>
                            </>
                        )}
                        <button onClick={nextStep} className="w-full py-3 mt-5 bg-[#ed117f] text-white font-semibold rounded-lg hover:bg-pink-700 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">Suivant</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-bold text-center mb-4">Informations personnelles</h2>
                        <input type="text" placeholder="Entrez votre nom" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded-lg w-full mb-4" />
                        <input type="text" placeholder="Localisation" value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 border rounded-lg w-full mb-4" />
                        <label>Nombre de personnes :</label>
                        <input type="number" min="1" max="6" value={accommodates} onChange={(e) => setAccommodates(e.target.value)} className="p-2 border rounded-lg w-full" />
                        <button onClick={handleReservation} className="w-full py-3 mt-5 bg-[#ed117f] text-white font-semibold rounded-lg hover:bg-pink-700 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">Suivant</button>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Réservation confirmée 🎉</h2>
                    <div className="text-left bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="font-bold text-lg">🛎️ Détails de la réservation</h3>
                        <p><strong>Service :</strong> {selectedService.name}</p>
                        <p><strong>Description :</strong> {selectedService.description}</p>
                        <p><strong>Prix total :</strong> {selectedService.price}MAD</p>

                        <h3 className="font-bold text-lg mt-4">👤 Informations du client</h3>
                        <p><strong>Nom :</strong> {name}</p>
                        <p><strong>Localisation :</strong> {location}</p>
                        <p><strong>Nombre de personnes :</strong> {accommodates}</p>

                        <h3 className="font-bold text-lg mt-4">📅 Détails des dates</h3>
                        <p><strong>Fréquence :</strong> {frequency}</p>

                        {frequency === "une seule fois" && (
                            <p><strong>Date choisie :</strong> {selectedDate}</p>
                        )}

                        {frequency === "plusieurs fois par semaine" && (
                            <>
                            <p><strong>Date de début :</strong> {startDate}</p>
                            <p><strong>Date de fin :</strong> {endDate}</p>
                            <p><strong>Jours sélectionnés :</strong> {selectedDays.join(", ") || "Aucun jour sélectionné"}</p>
                            </>
                        )}

                    </div>

                    <button 
                    onClick={() => setStep(0)} 
                    className="mt-6 w-full py-2 bg-[#a4bde7] text-white rounded-lg">
                        Retour à l'accueil
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}  