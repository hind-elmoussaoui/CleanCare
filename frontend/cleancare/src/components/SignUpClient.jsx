import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpClient() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);

                alert("Inscription réussie !");
                navigate("/Interface", { state: { userData: data.client // ou autre champ d'identification de l'API
                    }  });
            } else {
                setErrors(data.errors || []);
                alert(`Erreur : ${data.message || "Problème inconnu"}`);
            }
        } catch (error) {
            console.error("Erreur :", error);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mb-4 z-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Inscription Client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
                                <label className="block text-gray-700">Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Entrez votre prénom"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4d9ddb]"
                                />
                                {errors.find((error) => error.field === "firstName") && (
                                    <p className="text-red-600 text-sm">{errors.find((error) => error.field === "firstName").message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Entrez votre nom"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4d9ddb]"
                                />
                                {errors.find((error) => error.field === "lastName") && (
                                    <p className="text-red-600 text-sm">{errors.find((error) => error.field === "lastName").message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Entrez votre email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4d9ddb]"
                                />
                                {errors.find((error) => error.field === "email") && (
                                    <p className="text-red-600 text-sm">{errors.find((error) => error.field === "email").message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Téléphone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Entrez votre téléphone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4d9ddb]"
                                />
                                {errors.find((error) => error.field === "phone") && (
                                    <p className="text-red-600 text-sm">{errors.find((error) => error.field === "phone").message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Mot de passe</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Entrez votre mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4d9ddb]"
                                />
                                {errors.find((error) => error.field === "password") && (
                                    <p className="text-red-600 text-sm">{errors.find((error) => error.field === "password").message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirmer le mot de passe"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4d9ddb]"
                                />
                                {errors.find((error) => error.field === "confirmPassword") && (
                                    <p className="text-red-600 text-sm">{errors.find((error) => error.field === "confirmPassword").message}</p>
                                )}
                            </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">S'inscrire</button>
            </form>
        </div>
    );
}

export default SignUpClient;
