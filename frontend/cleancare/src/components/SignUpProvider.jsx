import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

function SignUpProvider() {
    const navigate = useNavigate();
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

    const handleChange = (e) => {
        if (e.target.name === "photo") {
            setFormData({ ...formData, photo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        try {
            const formDataToSend = new FormData();

            // Ajoutez tous les champs sauf confirmPassword
            Object.keys(formData).forEach(key => {
                if (key !== 'confirmPassword' && formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await fetch("http://localhost:5000/api/providers/register", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userType', 'provider');
                
                // Stockez également les données de l'utilisateur si nécessaire
                localStorage.setItem('userData', JSON.stringify(data.provider));
    

                alert("Inscription réussie !");
                navigate("/Interface", { state: { userData: data.provider } });
            } else {
                setErrors(data.errors || [{ message: data.message || "Erreur lors de l'inscription" }]);
                alert(`Erreur : ${data.message || "Problème inconnu"}`);
            }
        } catch (error) {
            console.error("Erreur :", error);
            setErrors([{ message: "Erreur de connexion au serveur" }]);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mb-4 z-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Inscription Prestataire</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        {errors.find((error) => error.field === "firstName") && (
                            <p className="text-red-600 text-sm">{errors.find((error) => error.field === "firstName").message}</p>
                        )}
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
                        {errors.find((error) => error.field === "lastName") && (
                            <p className="text-red-600 text-sm">{errors.find((error) => error.field === "lastName").message}</p>
                        )}
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
                            {errors.find((error) => error.field === "email") && (
                                <p className="text-red-600 text-sm">{errors.find((error) => error.field === "email").message}</p>
                            )}
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
                            {errors.find((error) => error.field === "phone") && (
                                <p className="text-red-600 text-sm">{errors.find((error) => error.field === "phone").message}</p>
                            )}
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
                            <input type="text" name="city" placeholder="Entrez votre ville" value={formData.city} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
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
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">S'inscrire</button>
            </form>
        </div>
    );
}

export default SignUpProvider;
