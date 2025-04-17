import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation(); // Correction 1: Utilisez le hook useLocation
    
    // Récupération des données
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const token = localStorage.getItem('token');

    // Vérifications
    const isAuthenticated = !!token;
    const userRole = userData?.role || '';
    const hasValidRole = allowedRoles.length === 0 || allowedRoles.includes(userRole);

    if (!isAuthenticated) {
        // Correction 2: Simplifiez l'objet state pour éviter DataCloneError
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }

    if (!hasValidRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;