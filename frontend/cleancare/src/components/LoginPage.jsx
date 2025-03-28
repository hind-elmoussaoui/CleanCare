import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client'); // 'client' ou 'provider'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Détermine l'endpoint en fonction du type d'utilisateur
      const endpoint = userType === 'client' 
        ? 'http://localhost:5000/api/clients/login'
        : 'http://localhost:5000/api/providers/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }

      // Stockage des données
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userData', JSON.stringify(data[userType]));

      // Redirection vers l'interface appropriée
      navigate('/dashboard', { state: { userData: data[userType] } });

    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        
        {/* Sélecteur de type d'utilisateur */}
        <div className="flex mb-6 border-b">
          <button
            type="button"
            className={`flex-1 py-2 font-medium ${userType === 'client' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setUserType('client')}
          >
            Client
          </button>
          <button
            type="button"
            className={`flex-1 py-2 font-medium ${userType === 'provider' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setUserType('provider')}
          >
            Prestataire
          </button>
        </div>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {userType === 'client' 
              ? "Vous êtes prestataire? " 
              : "Vous êtes client? "}
            <button 
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setUserType(userType === 'client' ? 'provider' : 'client')}
            >
              Connectez-vous {userType === 'client' ? 'en tant que prestataire' : 'en tant que client'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;