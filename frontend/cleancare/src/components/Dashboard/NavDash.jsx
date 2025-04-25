import React from "react";
import { FaHome, FaSearch, FaBell, FaUserCircle, FaCog, FaChevronDown, FaQuestionCircle  } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function NavDash() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaHome className="mr-2" />
            <span>Accueil</span>
          </Link>
          
          {pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            
            return (
              <div key={routeTo} className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                {isLast ? (
                  <span className="text-gray-500 capitalize">{path}</span>
                ) : (
                  <Link 
                    to={routeTo} 
                    className="text-blue-600 hover:text-blue-800 capitalize"
                  >
                    {path}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Icons */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <FaBell className="text-gray-600 text-lg" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaQuestionCircle className="text-gray-600 text-lg" />
          </button>

          {/* User Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaUserCircle className="text-indigo-600 text-xl" />
              </div>
              <span className="text-gray-700 hidden md:inline">Hind</span>
              <FaChevronDown className="text-gray-500 text-xs" />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
              <Link 
                to="/admin/profile" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <FaUserCircle className="mr-2" /> Profil
                </div>
              </Link>
              <Link 
                to="/admin/settings" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <FaCog className="mr-2" /> Paramètres
                </div>
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <Link 
                to="/signin" 
                className="block px-4 py-2 text-red-600 hover:bg-red-50"
              >
                Déconnexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavDash;