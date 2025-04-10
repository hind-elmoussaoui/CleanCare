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
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Essai d'authentification admin
      let adminResponse = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        localStorage.setItem('token', adminData.token);
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('user', JSON.stringify({ 
          id: adminData.userId, 
          role: 'admin' 
        }));
        navigate('/admin/dashboard');
        return;
      }

      // Si pas admin, essai d'authentification user
      let userResponse = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userType', userData.userType);
        localStorage.setItem('user', JSON.stringify(userData.user));
        
        // Redirection en fonction du rôle
        if (userData.userType === 'client' || userData.userType === 'provider') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
        return;
      }

      // Si aucune des authentifications n'a fonctionné
      const errorData = await userResponse.json();
      throw new Error(errorData.message || 'Échec de la connexion');

    } catch (error) {
      console.error("Erreur :", error);
      setError(error.message || "Email ou mot de passe incorrect");
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
              Connectez-vous dès maintenant pour accéder à votre espace personnel
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire de connexion centré */}
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full z-20 mt-20 mb-4">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

        {/* Icônes de connexion sociale */}
        <div className="flex justify-center space-x-4 mb-4">
          <button className="p-2 bg-white rounded-full border border-gray-200 shadow-sm">
            <FaFacebook size={20} className="text-blue-600" />
          </button>
          <button className="p-2 bg-white rounded-full border border-gray-200 shadow-sm">
            <FaApple size={20} className="text-gray-800" />
          </button>
          <button className="p-2 bg-white rounded-full border border-gray-200 shadow-sm">
            <FcGoogle size={20} />
          </button>
        </div>

        <div className="text-center mb-4 text-sm text-gray-500">
          Ou connectez-vous avec votre email
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
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
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
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
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Se connecter
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Vous n'avez pas de compte ?{' '}
          <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Créer un compte
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;