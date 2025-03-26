import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginProvider = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/providers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Stocker le token dans le localStorage
        localStorage.setItem("role", data.role); // Stocker le rôle dans le localStorage

        // Rediriger en fonction du rôle
        if (data.role === "provider") {
          navigate("/dashboard"); // Rediriger vers le tableau de bord du prestataire
        } else if (data.role === "client") {
          navigate("/client-dashboard"); // Rediriger vers le tableau de bord du client
        } else {
          setError("Rôle non reconnu.");
        }
      } else {
        setError(data.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      setError("Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-md w-full bg-white p-6 shadow-lg rounded-xl border-2 border-pink-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Connexion Prestataire</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition duration-300"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginProvider;