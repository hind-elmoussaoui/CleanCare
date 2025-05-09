import { useState } from "react";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa"; // Add FaArrowLeft for back icon
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterProvider = () => {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    services: "",
    experience: "",
    password: "",
    confirmPassword: "",
    photo: null,
    idCard: "",
});

const [errors, setErrors] = useState([]);
const navigate = useNavigate(); // Initialize useNavigate

const handleChange = (e) => {
    if (e.target.name === "photo") {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Log les données du formulaire

    // Clear previous errors
    setErrors([]);

    const newErrors = [];

    if (!formData.firstName || formData.firstName.length < 3) {
        newErrors.push({ field: "firstName", message: "Le prénom doit comporter au moins 3 caractères." });
    }
    if (!formData.lastName || formData.lastName.length < 3) {
        newErrors.push({ field: "lastName", message: "Le nom doit comporter au moins 3 caractères." });
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.push({ field: "email", message: "Entrez une adresse email valide." });
    }
    if (!formData.phone || formData.phone.length < 10) {
        newErrors.push({ field: "phone", message: "Le numéro de téléphone doit comporter au moins 10 chiffres." });
    }
    if (!formData.password || formData.password.length < 6) {
        newErrors.push({ field: "password", message: "Le mot de passe doit comporter au moins 6 caractères." });
    }
    if (formData.password !== formData.confirmPassword) {
        newErrors.push({ field: "confirmPassword", message: "Les mots de passe ne correspondent pas." });
    }
    

    // If there are any validation errors, display them and stop the form submission
    if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
    }

    // If there are no validation errors, proceed with the form submission
    const formDataToSend = new FormData();
    for (const key in formData) {
        formDataToSend.append(key, formData[key]);
    }

    try {
        const response = await fetch("http://localhost:5000/api/providers/register", {
            method: "POST", 
            body: formDataToSend,
        });
        console.log("Response status:", response.status); // Log le statut de la réponse
        const data = await response.json();
        console.log("Réponse du serveur:", data); // Log the complete response

        if (response.ok) {
            alert("Inscription réussie !");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                services: "",
                experience: "",
                password: "",
                confirmPassword: "",
                photo: null,
                idCard: "",
            });
        } else {
        // If there are validation errors from the server, display them
        setErrors(data.errors || []);
        alert(`Erreur lors de l'inscription: ${data.message || "Problème inconnu"}`);
        }
    } catch (error) {
        console.error("Error during fetch:", error); // Log les erreurs
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue lors de l'inscription.");
    }
};

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50">
      {/* Back Button */}
        <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="absolute top-8 left-50 flex items-center text-gray-700 hover:text-pink-500 transition duration-300"
        >
        <FaArrowLeft className="mr-2" /> Retour
        </button>
    <div className="max-w-2xl w-full bg-white p-6 shadow-lg rounded-xl border-2 border-pink-200 relative mb-6 mt-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Inscription Prestataire</h2>
        
        {/* Display Errors */}
        {errors.length > 0 && (
        <div className="bg-red-200 p-4 rounded-md mb-4">
            <ul>
                {errors.map((error, index) => (
                <li key={index} className="text-red-600">{error.msg}</li>
                ))}
            </ul>
        </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <div> 
                <label className="block text-gray-700">Prénom</label>
                <input
                type="text"
                name="firstName"
                placeholder="Entrez votre prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label className="block text-gray-700">Nom</label>
                <input
                type="text"
                name="lastName"
                placeholder="Entrez votre nom"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

            </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-700">Email</label>
                <input
                type="email"
                name="email"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label className="block text-gray-700">Téléphone</label>
                <input
                type="text"
                name="phone"
                placeholder="Entrez votre téléphone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-700">Adresse</label>
                <input
                type="text"
                name="address"
                placeholder="Entrez votre adresse"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label className="block text-gray-700">Ville</label>
                <input
                type="text"
                name="city"
                placeholder="Entrez votre ville"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-700">Expérience (années)</label>
                <input
                type="number"
                name="experience"
                placeholder="Entrez votre expérience (années)"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label className="block text-gray-700">CIN</label>
                <input
                type="text"
                name="idCard"
                placeholder="Entrez votre code de la carte d'identité"
                value={formData.idCard}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            </div>
            <div>
            <label className="block text-gray-700">Services</label>
            <select
            name="services"
            value={formData.services}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
                <option value="">Sélectionner un service</option>
                <option value="Nettoyage">Nettoyage</option>
                <option value="Garde d'enfants">Garde d'enfants</option>
            </select>
            </div>
            <div>
            <label className="block text-gray-700">Photo de profil</label>
            <div className="relative">
                <input
                type="file"
                name="photo"
                onChange={handleChange}
                required
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            <button type="button">
                <FaCloudUploadAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </button>
            </div>
            </div>
            <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {/* Password Error Message */}
            {errors.find((error) => error.field === "password") && (
                <p className="text-red-600 text-sm">{errors.find((error) => error.field === "password").message}</p>
            )}
            </div>
            <div>
            <label className="block text-gray-700">Confirmer le mot de passe</label>
            <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {/* Confirm Password Error */}
            {errors.find((error) => error.field === "confirmPassword") && (
                <p className="text-red-600 text-sm">{errors.find((error) => error.field === "confirmPassword").message}</p>
            )}
            </div>
            <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition duration-300"
            >
            S'inscrire
            </button>
        </form>
        </div>
    </div>
    );
};

export default RegisterProvider;