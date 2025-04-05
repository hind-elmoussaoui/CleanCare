import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import Maps from "../../components/CleanCare/Maps";

export default function ContactForm() {
    // États pour les champs du formulaire
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [service, setService] = useState("Service de Nettoyage");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Active le chargement

        const formData = { name, email, subject, service, message };

        try {
            const response = await fetch("http://localhost:5000/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            alert(data.message);

            // Réinitialiser les champs après l'envoi
            setName("");
            setEmail("");
            setSubject("");
            setService("Service de Nettoyage");
            setMessage("");
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
        setIsLoading(false); // Désactive le chargement après la réponse
    };

    return (
        <div className="sticky flex-grow flex flex-col items-center w-full">
            {/* Section Carte */}
            <div className="w-full h-70">
            <Maps />
            </div>

            {/* Section Formulaire */}
            <div className="flex flex-wrap gap-15 items-center justify-center p-4 bg-white">
                {/* Formulaire */}
                <div className="md:w-2/3 lg:w-1/2 p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Contactez <span className="text-[#ed117f]">CleanCare</span>
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Appelez-nous ou soumettez le formulaire en ligne pour demander un devis ou pour toute question
                        concernant nos services de nettoyage et de garde d'enfants.
                    </p>

                    {/* Formulaire avec l'événement onSubmit */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="votre Name"
                                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="votre Email"
                                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />

                        <select
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                        >
                            <option>Service de Nettoyage</option>
                            <option>Garde d'Enfants</option>
                            <option>Support Client</option>
                        </select>

                        <textarea
                            rows="4"
                            placeholder="votre Message"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <button
                        className="bg-[#ed117f] text-white px-6 py-3 rounded-md hover:bg-red-700 w-full md:w-auto"
                        disabled={isLoading}
                        >
                            {isLoading ? "Envoi en cours..." : "Envoyer"}
                        </button>
                    </form>
                </div>

                {/* Infos + Image */}
                <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center">
                    <div className="w-full max-w-xs">
                        <img src="/src/assets/image1.png" alt="Cleaning Service" className="object-cover" />
                    </div>

                    {/* Infos de Contact */}
                    <div className="w-75 h-85 bg-[#f575a6] text-white rounded-lg flex flex-col justify-center items-start mt-[-150px] md:mt-[-145px] p-6 z-10">
                        <h3 className="text-xl font-bold mb-4">Informations de Contact</h3>
                        <div className="flex items-center justify-center mb-4">
                            <FaPhone className="mr-2" /> <span>+212 6 12 34 56 78</span>
                        </div>
                        <div className="flex items-center justify-center mb-4">
                            <FaEnvelope className="mr-2" /> <span>contact@cleancare.com</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <FaMapMarkerAlt className="mr-2 mb-6" /> <span>123 Rue Hassan II, Casablanca, Maroc</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
