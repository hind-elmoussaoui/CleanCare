import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../index.css";
import { motion } from "framer-motion";

export default function ServiceDetails() {
    const location = useLocation();
    const selectedService = location.state?.selectedService || {};
    const servicePrice = selectedService.price ?? "Prix non disponible";

    console.log("Données reçues :", selectedService);

    if (!selectedService) {
        return <p className="text-red-500">Service introuvable</p>;
    }
    
    const steps = ["Planning", "Coordonnées", "Confirmation"];
    const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const [step, setStep] = useState(0);
    const [frequency, setFrequency] = useState("une seule fois");
    const [selectedDate, setSelectedDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        if (!selectedService.price) return 0;

        const pricePerService = Number(selectedService.price);
        
        if (frequency === "une seule fois") {
            return pricePerService;
        } else {
            // Pour les services répétitifs
            if (!startDate || !endDate) return 0;
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le dernier jour
            const weeks = Math.ceil(diffDays / 7);
            
            // Nombre de services par semaine (nombre de jours sélectionnés)
            const servicesPerWeek = selectedDays.length;
            
            // Calcul du nombre total de services
            const totalServices = weeks * servicesPerWeek;
            
            return totalServices * pricePerService;
        }
    };

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [frequency, selectedDate, startDate, endDate, selectedDays, selectedService.price]);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const toggleDaySelection = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleReservation = async () => {
        if (!selectedService) {
            setApiError("Veuillez choisir un service.");
            return;
        }
        
        if (frequency === "une seule fois" && !selectedDate) {
            setApiError("Veuillez choisir une date.");
            return;
        }
        
        if (frequency === "plusieurs fois par semaine" && 
            (!startDate || !endDate || selectedDays.length === 0 || new Date(startDate) > new Date(endDate))) {
            setApiError("Veuillez choisir une date de début, une date de fin valide et au moins un jour.");
            return;
        }
        
        if (!name || !email || !phone || !address) {
            setApiError("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        setIsLoading(true);
        setApiError(null);

        try {
            const response = await fetch('http://localhost:5000/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service: {
                        id: selectedService.id,
                        name: selectedService.name || "Nom inconnu",
                        description: selectedService.description || "Aucune description",
                        price: selectedService.price ? Number(selectedService.price) : 0,
                    },
                    schedule: {
                        frequency,
                        selectedDate: frequency === "une seule fois" ? selectedDate : null,
                        startDate: frequency === "plusieurs fois par semaine" ? startDate : null,
                        endDate: frequency === "plusieurs fois par semaine" ? endDate : null,
                        selectedDays: frequency === "plusieurs fois par semaine" ? selectedDays : [],
                    },
                    client: { 
                        name, 
                        email, 
                        phone, 
                        address 
                    },
                    notes,
                    status: "confirmed",
                    createdAt: new Date().toISOString(),
                    totalPrice: totalPrice
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la réservation");
            }

            const data = await response.json();
            console.log("Réservation réussie:", data);
            nextStep();
        } catch (error) {
            console.error("Erreur:", error);
            setApiError(error.message || "Erreur de connexion au serveur. Vérifiez que le serveur backend est en cours d'exécution.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setStep(0);
        setFrequency("une seule fois");
        setSelectedDate("");
        setStartDate("");
        setEndDate("");
        setSelectedDays([]);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setNotes("");
        setApiError(null);
        setTotalPrice(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* En-tête */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Réservez votre service</h1>
                    <p className="text-gray-600">Remplissez le formulaire pour réserver votre service en quelques étapes simples</p>
                </div>

                {/* Barre de progression */}
                <div className="mb-12">
                    <div className="flex justify-between relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                        {steps.map((s, index) => (
                            <div key={index} className="flex flex-col items-center z-10">
                                <button
                                onClick={() => index < step && setStep(index)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-medium ${
                        index <= step ? "bg-pink-600" : "bg-gray-300"
                      } ${index < step ? "cursor-pointer" : "cursor-default"}`}
                                >
                                   {index + 1}
                                </button>
                                <span className={`text-sm mt-2 font-medium ${
                                    index === step ? "text-pink-600" : index < step ? "text-gray-700" : "text-gray-400"
                                }`}>
                                    {s}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contenu du formulaire */}
                <motion.div 
                    key={step}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    {apiError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{apiError}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 0 && (
                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Planifiez votre service</h2>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">Fréquence</label>
                                <select
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                >
                                    <option value="une seule fois">Une seule fois</option>
                                    <option value="plusieurs fois par semaine">Répétitif (plusieurs fois par semaine)</option>
                                </select>
                            </div>

                            {frequency === "une seule fois" ? (
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Date de début</label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Date de fin</label>
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                min={startDate || new Date().toISOString().split('T')[0]}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">Jours de la semaine</label>
                                        <div className="flex flex-wrap gap-2">
                                            {daysOfWeek.map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => toggleDaySelection(day)}
                                                    className={`px-4 py-2 rounded-lg border transition ${
                                                        selectedDays.includes(day)
                                                            ? "bg-pink-600 text-white border-pink-600"
                                                            : "bg-white text-gray-700 border-gray-300 hover:border-pink-300"
                                                    }`}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                                        <p className="text-gray-700">
                                            <span className="font-medium">Estimation totale :</span> {totalPrice} MAD
                                        </p>
                                        {frequency === "plusieurs fois par semaine" && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                ({selectedDays.length} fois/semaine × {selectedService.price} MAD)
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={
                                        frequency === "une seule fois"
                                            ? !selectedDate
                                            : !startDate || !endDate || selectedDays.length === 0
                                    }
                                    className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )} 

                    {step === 1 && (
                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vos coordonnées</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Nom complet*</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Email*</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Téléphone*</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Adresse*</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">Notes supplémentaires (optionnel)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                    placeholder="Informations supplémentaires que nous devrions connaître..."
                                />
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={handleReservation}
                                    disabled={!name || !email || !phone || !address || isLoading}
                                    className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Traitement...
                                        </>
                                    ) : (
                                        "Confirmer la réservation"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-6 sm:p-8 text-center">
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation confirmée !</h2>
                                <p className="text-gray-600">Merci {name}, votre réservation a bien été enregistrée.</p>
                                <p className="text-gray-600 mt-2">Un email de confirmation vous a été envoyé à {email}.</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                    </svg>
                                    Détails de la réservation
                                </h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Service</p>
                                        <p className="font-medium">{selectedService.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Prix unitaire</p>
                                        <p className="font-medium">{servicePrice} MAD</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Prix total</p>
                                    <p className="font-medium">{totalPrice} MAD</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Fréquence</p>
                                    <p className="font-medium capitalize">{frequency}</p>
                                </div>

                                {frequency === "une seule fois" ? (
                                    <div>
                                        <p className="text-sm text-gray-500">Date prévue</p>
                                        <p className="font-medium">{new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Du</p>
                                                <p className="font-medium">{new Date(startDate).toLocaleDateString('fr-FR')}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Au</p>
                                                <p className="font-medium">{new Date(endDate).toLocaleDateString('fr-FR')}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Jours</p>
                                            <p className="font-medium">{selectedDays.join(", ")}</p>
                                        </div>
                                    </>
                                )}

                                {notes && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">Notes</p>
                                        <p className="font-medium">{notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Vos informations
                                </h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Nom</p>
                                        <p className="font-medium">{name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Téléphone</p>
                                        <p className="font-medium">{phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Adresse</p>
                                        <p className="font-medium">{address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="/"
                                    className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition text-center"
                                >
                                    Retour à l'accueil
                                </a>
                                <button
                                    onClick={resetForm}
                                    className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                                >
                                    Nouvelle réservation
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}