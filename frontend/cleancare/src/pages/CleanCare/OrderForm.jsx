import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle, FaCheck, FaTimes } from "react-icons/fa";

const OrderPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { plan } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "votre prénom";
        if (!formData.lastName.trim()) newErrors.lastName = "votre nom de famille";
        if (!formData.city.trim()) newErrors.city = "votre ville";
        if (!formData.address.trim()) newErrors.address = "votre adresse domicile";
        if (!formData.phone.trim()) newErrors.phone = "votre numéro de téléphone";
        if (!formData.email.trim()) newErrors.email = "votre adresse email";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            setSubmissionStatus({
                loading: false,
                success: false,
                error: "Veuillez remplir tous les champs obligatoires.",
            });
            return;
        }

        setSubmissionStatus({ loading: true, success: false, error: null });

        try {
            const planData = {
                ...plan,
                price: parseFloat(plan.price.replace(" MAD", "")),
            };

            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, plan: planData }),
            });

            const text = await response.text();
            let data;
            
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(text || "Réponse invalide du serveur");
            }

            if (response.ok) {
                setSubmissionStatus({ loading: false, success: true, error: null });
                setTimeout(() => {
                    navigate("/confirmation", { state: { formData, plan } });
                }, 1500); // Redirection après 1.5s pour laisser voir le message
            } else {
                throw new Error(data.message || "Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error("Erreur:", error);
            setSubmissionStatus({
                loading: false,
                success: false,
                error: error.message || "Une erreur est survenue. Veuillez réessayer.",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <button
                onClick={() => navigate(-1)}
                className="fixed top-8 left-20 flex items-center text-gray-500 hover:text-blue-500"
            >
                <FaArrowLeft className="mr-2" /> Retour
            </button>

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex gap-8">
                {plan && (
                    <div className="flex-1 p-6 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-4">
                            <FaInfoCircle className="text-blue-500 mr-2" />
                            <h3 className="text-lg font-semibold">Votre commande</h3>
                        </div>
                        <p className="text-gray-700 font-bold mb-2">Nom du pack: {plan.name}</p>
                        <p className="text-gray-700 font-bold mb-4">Prix: {plan.price}</p>
                        <hr className="border-gray-300 mb-4" />
                        <h4 className="text-md font-semibold mb-2">Fonctionnalités incluses :</h4>
                        <ul className="text-gray-700 mb-4">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center mb-2">✔️ {feature}</li>
                            ))}
                        </ul>
                        <h4 className="text-md font-semibold mb-2">Non inclus :</h4>
                        <ul className="text-gray-700">
                            {plan.unavailable.map((feature, i) => (
                                <li key={i} className="flex items-center mb-2 line-through opacity-50">❌ {feature}</li>
                            ))}
                        </ul>
                        </div>
                )}

                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-center">Détails de facturation</h2>
                    
                    {/* Message de statut */}
                    {submissionStatus.loading && (
                        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
                            Envoi en cours...
                        </div>
                    )}
                    
                    {submissionStatus.success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                            <FaCheck className="mr-2" />
                            Commande enregistrée avec succès !
                        </div>
                    )}
                    
                    {submissionStatus.error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                            <FaTimes className="mr-2" />
                            {submissionStatus.error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700">Prénom *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Votre prénom"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nom *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Votre nom"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Ville *</label>
                            <input
                                type="text"
                                name="city"
                                className="w-full p-2 border rounded-lg"
                                placeholder="Votre ville"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Adresse *</label>
                            <input
                                type="text"
                                name="address"
                                className="w-full p-2 border rounded-lg"
                                placeholder="Votre adresse"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Téléphone *</label>
                            <input
                                type="text"
                                name="phone"
                                className="w-full p-2 border rounded-lg"
                                placeholder="Votre téléphone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Adresse email *</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 border rounded-lg"
                                placeholder="Votre email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold mb-4">Informations supplémentaires</h2>
                            <label className="block text-gray-700">Notes de commande (optionnel)</label>
                            <textarea
                                name="notes"
                                className="w-full p-2 border rounded-lg"
                                rows="4"
                                placeholder="Notes sur votre commande..."
                                value={formData.notes}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 rounded-lg text-white font-bold transition duration-300 ${
                                submissionStatus.loading 
                                    ? "bg-blue-300 cursor-not-allowed" 
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={submissionStatus.loading}
                        >
                            {submissionStatus.loading ? "Envoi en cours..." : "Valider la commande"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;