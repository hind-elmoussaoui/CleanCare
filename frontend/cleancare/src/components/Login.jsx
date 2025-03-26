import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminPassword = "admin"; // Mot de passe admin

    // Vérification du mot de passe
    if (password === adminPassword) {
      // Stocke un flag dans localStorage pour indiquer que l'admin est authentifié
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/login/admin");
    } else {
      alert("Mot de passe incorrect !");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Connexion Admin</h2>
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}

export default Login;
