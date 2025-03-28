import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Image from "../assets/joel.jpg";

function SignIn() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (!response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.userType);
        navigate("/interface");
      }
    
    } catch (error) {
      console.error("Erreur :", error);
      setError("Une erreur est survenue");
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
            <h1 className="text-4xl font-bold mb-2 mt-1">Bienvenue !</h1>
            <p className="text-lg text-white">
              Connectez-vous dès maintenant pour accéder à votre espace personnel et profiter de nos services.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire de connexion centré */}
      <div className="bg-white bg-opacity-50 p-6 py-4 rounded-lg shadow-lg max-w-md w-full z-20 mt-20 mb-4">
        <h1 className="text-2xl font-bold text-center mb-2">Connexion</h1>

        {/* Icônes de connexion */}
        <div className="flex justify-center space-x-4 mb-2">
          <button
            className="p-3 bg-white text-blue-900 rounded-lg border-1 border-gray-100 shadow-gray-300 transition duration-300"
            aria-label="Se connecter avec Facebook"
          >
            <FaFacebook size={24} />
          </button>
          <button
            className="p-3 bg-white rounded-lg border-1 border-gray-100 shadow-gray-300 transition duration-300"
            aria-label="Se connecter avec Apple"
          >
            <FaApple size={24} />
          </button>
          <button
            className="p-3 bg-white rounded-lg border-1 border-gray-100 shadow-gray-300 transition duration-300"
            aria-label="Se connecter avec Google"
          >
            <FcGoogle size={24} />
          </button>
        </div>

        {error && 
          <p className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </p>
        }

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={FormData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Se souvenir de moi</span>
            </label>
          </div>

          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >Se connecter
            </button>
          </div>

          <div className="text-center mb-4">
            <a href="/forgot-password" className="text-blue-500">Mot de passe oublié ?</a>
          </div>
        </form>

        <p className="text-center text-gray-600">
          Vous n'avez pas de compte ? <a href="/signup" className="text-blue-500">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;