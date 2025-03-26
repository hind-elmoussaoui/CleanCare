import React, { useEffect, useState } from "react";
import logo from "../assets/CleanCare.png";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Header() {
    const [bgColor, setBgColor] = useState("bg-transparent");
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
                setBgColor("bg-[#a4bde7] shadow-lg transition-all duration-300");
            } else {
                setBgColor("bg-transparent transition-all duration-300");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className={`fixed w-full z-50 p-1 ${bgColor}`}>
            <nav className="flex justify-between items-center text-white px-6">
                {/* Logo centré sur mobile */}
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-20 h-20 md:w-25 md:h-23" />
                </div>

                {/* Bouton Burger (Mobile) */}
                <button
                    className="md:hidden text-white focus:outline-none text-3xl"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? "✖" : "☰"}
                </button>

                {/* Menu Desktop */}
                <ul className="hidden md:flex space-x-6 uppercase font-semibold text-lg">
                {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="hover:text-[#719be5]">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li> 
                        <Link 
                        to="/signin"
                        className="text-white hover:text-[#719be5] flex items-center justify-center"
                        >
                            <FaUserCircle  className="text-2xl"/>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-[#a4bde7] text-white shadow-lg">
                    <ul className="flex flex-col items-center py-4 space-y-4 uppercase font-semibold text-lg">
                    {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link to={link.to} className="hover:text-[#719be5]" onClick={toggleMenu}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="md:hidden">
                            <Link 
                            to="/signin"
                            className="text-white hover:text-[#719be5] flex items-center justify-center space-x-2"
                            >
                                <FaUserCircle className="text-2xl" /> 
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
