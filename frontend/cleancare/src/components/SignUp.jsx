import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaTools } from 'react-icons/fa';
import Image from "../assets/joel.jpg";

function SignUp() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "client" // 'client' ou 'provider'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserTypeChange = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Validation des champs
        if (!formData.name || !formData.email || !formData.password ) {
            return setError("Tous les champs sont obligatoires");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return setError("Format d'email invalide");
        }
    
        if (formData.password.length < 6) {
            return setError("Le mot de passe doit contenir au moins 6 caractères");
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'inscription");
            }
    
            // Si succès
            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', data.user.role);
            
            // Redirection avec message
            navigate('/signin', { 
                state: { 
                    successMessage: `Inscription réussie en tant que ${formData.role === 'client' ? 'client' : 'provider'}!`,
                    registeredEmail: formData.email
                }
            });
    
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            setError(error.message || "Une erreur est survenue lors de l'inscription");
        }
    };
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {/* Image de fond */}
            <div className="absolute inset-0">
                <img
                    src={Image}
                    alt="Background"
                    className="w-full h-70 object-cover bg-gray-900 opacity-70"
                />
                {/* Texte centré sur l'image */}
                <div className="absolute inset-0 flex items-start justify-center text-center text-amber-600 z-10">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 mt-1">Rejoignez-nous !</h1>
                        <p className="text-lg text-white">
                            Créez votre compte pour accéder à nos services
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulaire d'inscription centré */}
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full z-20 mt-20 mb-4">
                <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>
                
                {/* Sélection visuelle du type de compte */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Je suis :
                    </label>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange('client')}
                            className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-all ${formData.role === 'client' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                        >
                            <FaUser className={`text-2xl mb-2 ${formData.role === 'client' ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className={`font-medium ${formData.role === 'client' ? 'text-blue-600' : 'text-gray-600'}`}>Client</span>
                            <p className="text-xs text-gray-500 mt-1">Je cherche des services</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange('provider')}
                            className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-all ${formData.role === 'provider' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                        >
                            <FaTools className={`text-2xl mb-2 ${formData.role === 'provider' ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className={`font-medium ${formData.role === 'provider' ? 'text-blue-600' : 'text-gray-600'}`}>Prestataire</span>
                            <p className="text-xs text-gray-500 mt-1">Je propose des services</p>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                        <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-medium text-red-800">Erreur d'inscription</h3>
                                <p className="text-sm text-red-700 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                            Nom complet
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="name"
                            type="text"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                            Mot de passe
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Vous avez déjà un compte ?{' '}
                    <a href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                        Se connecter
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SignUp;