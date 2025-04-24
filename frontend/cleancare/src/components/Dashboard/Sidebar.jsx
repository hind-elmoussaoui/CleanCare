import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FiUsers, FiLogOut, FiMessageSquare, FiSettings, 
  FiShoppingCart, FiHome, FiPlusSquare, FiUser, 
  FiClipboard, FiChevronsLeft, FiChevronsRight 
} from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");

  useEffect(() => {
    // Détermine l'élément actif en fonction du chemin actuel
    const currentPath = location.pathname.split('/').pop() || 'dashboard';
    setActiveItem(currentPath);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/signin");
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: <FiHome className="text-lg" />, label: "Dashboard", key: "dashboard" },
    { path: "/admin/dashboard/profile", icon: <FiUser className="text-lg" />, label: "Profile", key: "profile" },
    { path: "/admin/dashboard/avis", icon: <FiPlusSquare className="text-lg" />, label: "Avis", key: "avis" },
    { path: "/admin/dashboard/orders", icon: <FiClipboard className="text-lg" />, label: "Commandes", key: "orders" },
    { path: "/admin/dashboard/users", icon: <FiUsers className="text-lg" />, label: "Utilisateurs", key: "users" },
    { path: "/admin/dashboard/services", icon: <FiShoppingCart className="text-lg" />, label: "Services", key: "services" },
    { path: "/admin/dashboard/messages", icon: <FiMessageSquare className="text-lg" />, label: "Messages", key: "messages" },
    { path: "/admin/dashboard/settings", icon: <FiSettings className="text-lg" />, label: "Paramètres", key: "settings" },
  ];

  return (
    <div className={`
      sticky top-0 left-0 h-screen flex flex-col
      ${isOpen ? "w-64" : "w-20"} 
      bg-gradient-to-b from-indigo-900 to-indigo-950
      text-indigo-50 
      transition-all duration-300 ease-in-out 
      border-r border-indigo-800
      z-50
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-800">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-semibold">Admin</h1>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 rounded-lg hover:bg-indigo-800 transition-colors text-indigo-200 hover:text-white"
          aria-label={isOpen ? "Réduire le menu" : "Étendre le menu"}
        >
          {isOpen ? <FiChevronsLeft size={20} /> : <FiChevronsRight size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link 
                to={item.path}
                className={`
                  flex items-center p-3 rounded-lg transition-all
                  ${activeItem === item.key 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-indigo-800/50 text-indigo-100 hover:text-white'}
                  ${!isOpen ? 'justify-center' : ''}
                `}
                title={!isOpen ? item.label : ''}
              >
                <span className={`${activeItem === item.key ? "text-white" : "text-indigo-300"}`}>
                  {item.icon}
                </span>
                {isOpen && <span className="ml-3 font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-1 border-t border-indigo-800">
        <button 
          onClick={handleLogout}
          className={`
            flex items-center w-full p-3 rounded-lg transition-colors
            hover:bg-rose-700/30 text-rose-300 hover:text-rose-100
            ${!isOpen ? 'justify-center' : ''}
          `}
          title={!isOpen ? "Déconnexion" : ''}
        >
          <FiLogOut className="text-lg" />
          {isOpen && <span className="ml-3">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;