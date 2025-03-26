import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUsers, FiLogOut, FiMessageSquare, FiSettings, FiShoppingCart, FiHome, FiPlusSquare, FiUser, FiClipboard } from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminPassword");
    navigate("/login");
  };

  return (
    <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-purple-500 text-white transition-all duration-300`}>
      {/* Bouton pour réduire la sidebar */}
      <div className="flex justify-end p-3">
      
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? "⋘" : "⋙"}
        </button>
      </div>

      <nav className="mt-4">
        <ul>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin" className="flex items-center">
              <FiHome className="mr-3 text-lg" />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin/profile" className="flex items-center">
              <FiUser className="mr-3 text-lg" />
              {isOpen && <span>Profile</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin/add" className="flex items-center">
              <FiPlusSquare className="mr-3 text-lg" />
              {isOpen && <span>Add</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin/orders" className="flex items-center">
              <FiClipboard className="mr-3 text-lg" />
              {isOpen && <span>Order</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin/users" className="flex items-center">
              <FiUsers className="mr-3 text-lg" />
              {isOpen && <span>Utilisateurs</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin/services" className="flex items-center">
              <FiShoppingCart className="mr-3 text-lg" /> 
              {isOpen && <span>Services</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin/messages" className="flex items-center">
              <FiMessageSquare className="mr-3 text-lg" /> 
              {isOpen && <span>Messages</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-purple-700">
            <Link to="/admin/settings" className="flex items-center">
              <FiSettings className="mr-3 text-lg" />
              {isOpen && <span>Paramètres</span>}
            </Link>
          </li>
          <li className="p-3 hover:bg-orange-600 cursor-pointer" onClick={handleLogout}>
            <div className="flex items-center">
              <FiLogOut className="mr-3 text-lg" />
              {isOpen && <span>Déconnexion</span>}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;