import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Image from "../assets/joel.jpg";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      console.log("Tentative de connexion avec:", { email, password });

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Réponse du serveur:", response.status);
      
      // Vérifiez si la réponse est JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error("Réponse non-JSON:", text);
        throw new Error('Le serveur a renvoyé une réponse inattendue');
      }
  
      const data = await response.json();
      console.log("Données reçues:", data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }
  
      console.log("Connexion réussie, récupération des données utilisateur...");
      const clientResponse = await fetch('http://localhost:5000/api/me', {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
  
      console.log("Réponse données utilisateur:", clientResponse.status);
      
      if (!clientResponse.ok) {
        throw new Error('Échec de la récupération des données utilisateur');
      }
  
      const clientData = await clientResponse.json();
      console.log("Données utilisateur:", clientData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(clientData));
      navigate('/Interface', { state: { userData: clientData } });
  
    } catch (err) {
      console.error("Erreur complète:", err);
      setError(err.message.includes('<!DOCTYPE html>') 
        ? 'Erreur serveur - Vérifiez la console pour plus de détails' 
        : err.message);
    } finally {
      setLoading(false);
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

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'CONNEXION'}
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