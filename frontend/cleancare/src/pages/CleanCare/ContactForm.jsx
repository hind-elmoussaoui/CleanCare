import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
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
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");

  // Effet pour faire disparaître le message après 5 secondes
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    const formData = { name, email, subject, service, message };

    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(
          "Votre message a été envoyé avec succès ! Nous vous contacterons bientôt."
        );

        // Réinitialiser les champs après l'envoi
        setName("");
        setEmail("");
        setSubject("");
        setService("Service de Nettoyage");
        setMessage("");
      } else {
        throw new Error(data.message || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setSubmitStatus("error");
      setStatusMessage(
        error.message ||
          "Une erreur s'est produite. Veuillez réessayer plus tard."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sticky flex-grow flex flex-col items-center w-full">
      {/* Section Carte */}
      <div className="w-full h-70">
        <Maps />
      </div>

      {/* Section Formulaire */}
      <div className="flex flex-wrap gap-15 items-center justify-center p-4 bg-white relative">
        {/* Message de statut */}
        {submitStatus && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 rounded-lg shadow-lg z-50 
                        ${
                          submitStatus === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
          >
            <div className="flex items-center">
              {submitStatus === "success" ? (
                <FaCheckCircle className="mr-2 text-xl" />
              ) : (
                <FaTimesCircle className="mr-2 text-xl" />
              )}
              <span>{statusMessage}</span>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div className="md:w-2/3 lg:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Contactez <span className="text-[#ed117f]">CleanCare</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Appelez-nous ou soumettez le formulaire en ligne pour demander un
            devis ou pour toute question concernant nos services de nettoyage et
            de garde d'enfants.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Sujet"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option value="">Sélectionnez le service recherché</option>
              <option value="Femme de ménage à domicile">
                Femme de ménage à domicile
              </option>
              <option value="Nounou/Garde d'enfants">
                Nounou/Garde d'enfants
              </option>
              <option value="Service de nettoyage professionnel">
                Service de nettoyage professionnel (bureaux, locaux)
              </option>
              <option value="Autre demande">Autre demande</option>
            </select>

            <textarea
              rows="4"
              placeholder="Votre message"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className="bg-[#ed117f] text-white px-6 py-3 rounded-md hover:bg-red-700 w-full md:w-auto transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                "Envoyer"
              )}
            </button>
          </form>
        </div>

        {/* Infos + Image */}
        <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center">
          <div className="w-full max-w-xs">
            <img
              src="/src/assets/image1.png"
              alt="Cleaning Service"
              className="object-cover"
            />
          </div>

          {/* Infos de Contact */}
          <div className="w-75 h-85 bg-[#f575a6] text-white rounded-lg flex flex-col justify-center items-start mt-[-150px] md:mt-[-145px] p-6 z-10">
            <h3 className="text-xl font-bold mb-4">Informations de Contact</h3>
            <div className="flex items-center mb-4">
              <FaPhone className="mr-2" /> <span>+212 6 12 34 56 78</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="mr-2" /> <span>contact@cleancare.com</span>
            </div>
            <div className="flex items-start">
              <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0" />
              <span>123 Rue Hassan II, Casablanca, Maroc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
