import React, { useEffect, useState } from "react";
import logo from "../../assets/CleanCare.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function Header() {
    const [bgColor, setBgColor] = useState("bg-transparent");
    const [textColor, setTextColor] = useState("text-white");
    const [logoBg, setLogoBg] = useState(""); // Pas de fond initial
    const [isOpen, setIsOpen] = useState(false);
    
    const navLinks = [
        { to: "/", label: "ACCUEIL" },
        { to: "/services", label: "SERVICES" },
        { to: "/Avis", label: "AVIS" },
        { to: "/contact", label: "CONTACT" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setBgColor("bg-gradient-to-l from-[#a4bde7] to-white");
                setTextColor("text-[#0463a3]");
                setLogoBg("bg-white rounded-full px-2 py-1"); // Ajout du fond rond blanc
            } else {
                setBgColor("bg-transparent");
                setTextColor("text-white");
                setLogoBg(""); // Retrait du fond
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className={`fixed w-full z-50 p-1 ${bgColor} transition-all duration-300`}>
            <nav className="flex justify-between items-center px-6">
                {/* Logo avec fond conditionnel */}
                <div className={`flex ${logoBg} transition-all duration-300`}>
                    <img src={logo} alt="Logo" className="w-20 h-20 md:w-25 md:h-23" />
                </div>

                {/* Bouton Burger (Mobile) */}
                <button
                    className={`md:hidden ${textColor} focus:outline-none text-3xl`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? "✖" : "☰"}
                </button>

                {/* Menu Desktop */}
                <ul className={`hidden md:flex space-x-6 uppercase font-semibold text-lg ${textColor}`}>
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link 
                                to={link.to} 
                                className="hover:text-[#ed117f] transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li> 
                        <Link 
                            to="/signin"
                            className="text-[#ed117f] hover:text-white flex items-center justify-center border-1 rounded-full w-10 h-7 border-[#ed117f] hover:bg-[#ed117f] transition-colors duration-200"
                        >
                            <FaUserAlt className="text-xl"/>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="md:hidden absolute top-23 left-0 w-full bg-gradient-to-l from-[#a4bde7] to-white shadow-lg">
                    <ul className="flex flex-col items-center py-4 space-y-4 uppercase font-semibold text-lg text-[#0463a3]">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link 
                                    to={link.to} 
                                    className="hover:text-[#ed117f] transition-colors duration-200" 
                                    onClick={toggleMenu}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="md:hidden">
                            <Link 
                                to="/signin"
                                className="text-[#ed117f] hover:text-white flex items-center justify-center space-x-2 bg-white/50 px-4 py-2 rounded-full transition-colors duration-200"
                            >
                                <FaUserAlt className="text-xl" /> 
                                <span>Connexion</span> 
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;