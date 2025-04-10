import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    // 1. Récupération plus sécurisée des données utilisateur
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const token = localStorage.getItem('token');

    // 2. Vérification plus complète
    const isAuthenticated = !!token;
    const hasValidRole = allowedRoles.includes(userData?.role);

    // 3. Gestion des cas d'erreur
    if (!isAuthenticated) {
        // Redirection vers la page de connexion avec origine pour redirection post-login
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (!hasValidRole) {
        // 4. Option 1: Redirection vers page non-autorisé
        return <Navigate to="/unauthorized" replace />;
        
        // Option 2: Retourner null + message d'erreur (selon votre UX)
        // return null;
    }

    // 5. Vérification du token côté serveur (optionnel mais recommandé)
    // Vous pourriez ajouter une vérification API ici

    return children;
};

export default ProtectedRoute;