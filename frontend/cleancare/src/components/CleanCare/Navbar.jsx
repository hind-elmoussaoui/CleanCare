import React, { useState } from "react";
import logo from "../../assets/CleanCare.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
            <nav className={`sticky top-0 left-0 w-full z-50 p-1 transition-all duration-500`}>
                <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#a4bde7] to-white" />
                <div className="flex justify-between items-center px-6 text-[#0071bc]">
                    {/* Logo */}
                    <div className="flex bg-white rounded-full px-7 py-1">
                        <img src={logo} alt="Logo" className="w-20 h-20 md:w-25 md:h-23" />
                    </div>

                    {/* Burger Button (Mobile) */}
                    <button
                        className="md:hidden text-white focus:outline-none text-3xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "✖" : "☰"}
                    </button>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 uppercase font-semibold text-lg">
                        <li><Link to="/" className="hover:text-[#ed117f]">ACCUEIL</Link></li>
                        <li><Link to="/services" className="hover:text-[#ed117f]">SERVICES</Link></li>
                        <li><Link to="/Avis" className="hover:text-[#ed117f]">AVIS</Link></li>
                        <li><Link to="/contact" className="hover:text-[#ed117f]">CONTACT</Link></li>
                        <li> 
                            <Link 
                            to="/signin" className="text-[#ed117f] hover:text-white flex items-center justify-center border-1 rounded-full w-10 h-7 border-[#ed117f] hover:bg-[#ed117f] transition-colors duration-200">
                                <FaUserAlt className="text-xl"/>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-[#bfcee8] text-white shadow-lg">
                        <ul className="flex flex-col items-center py-4 space-y-4 uppercase font-semibold text-lg">
                            <li><Link to="/" className="hover:text-[#719be5]" onClick={() => setIsOpen(false)}>ACCUEIL</Link></li>
                            <li><Link to="/services" className="hover:text-[#719be5]" onClick={() => setIsOpen(false)}>SERVICES</Link></li>
                            <li><Link to="/Avis" className="hover:text-[#719be5]" onClick={() => setIsOpen(false)}>AVIS</Link></li>
                            <li><Link to="/contact" className="hover:text-[#719be5]" onClick={() => setIsOpen(false)}>CONTACT</Link></li>
                            <li className="md:hidden">
                                <Link 
                                to="/signin" className="text-[#ed117f] hover:text-[#719be5] flex items-center justify-center space-x-2"
                                >
                                    <FaUserAlt className="text-xl" /> 
                                    <span>Connexion</span> 
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
    );
}

export default Navbar;
