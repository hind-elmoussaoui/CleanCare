import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
    <>
    {/* Barre d'informations de contact */}
    <div className="shadow-lg w-11/12 -mb-18 mx-auto py-4 text-white relative z-10 bg-[#e09998] border-b border-[#e09998]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Heures d'ouverture */}
            <div className="flex flex-col items-center text-center">
                <Clock className="text-[#ed117f] mb-2" size={24} />
                <h3 className="text-lg font-bold text-white mb-2">Heures d'ouverture</h3>
                <p>Lundi au Vendredi: 8h00 - 18h00</p>
                <p>Samedi: 9h00 - 14h00</p>
            </div>

            {/* Localisation */}
            <div className="flex flex-col items-center text-center">
                <MapPin className="text-[#ed117f] mb-2" size={24} />
                <h3 className="text-lg font-bold text-white mb-2">Nos locaux</h3>
                <p>123 Rue Hassan II</p>
                <p>Casablanca, Maroc</p>
            </div>
        
            {/* Téléphone */}
            <div className="flex flex-col items-center text-center">
                <Phone className="text-[#ed117f] mb-2" size={24} />
                <h3 className="text-lg font-bold text-white mb-2">Contactez-nous</h3>
                <p>+212 6 12 34 56 78</p>
                <p>contact@cleancare.com</p>
            </div>
        </div>
    </div>

    <div className="bg-[#a4bde7] text-white relative pt-15">
        {/* Contenu principal du footer */}
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Section Services */}
                <div>
                    <h3 className="text-xl font-bold text-[#0071bc] mb-4">Nos Services</h3>
                    <ul className="space-y-2">
                        {[
                            "Ménage à domicile",
                            "Garde d'enfants",
                            "Ménage de bureaux",
                            "Garde de nuit",
                            "Ménage en profondeur",
                            "Baby-sitting week-end"
                        ].map((service, index) => (
                            <li key={index} className="hover:text-white cursor-pointer transition">
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Section Catégories */}
                <div>
                    <h3 className="text-xl font-bold text-[#0071bc] mb-4">Catégories</h3>
                    <ul className="space-y-2">
                        {[
                            "Services résidentiels",
                            "Services commerciaux",
                            "Services d'urgence",
                            "Abonnements",
                            "Cadeaux"
                        ].map((category, index) => (
                            <li key={index} className="hover:text-white cursor-pointer transition">
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Section Actualités */}
                <div>
                    <h3 className="text-xl font-bold text-[#0071bc] mb-4">Actualités</h3>
                    <ul className="space-y-3">
                        {[
                            { title: "Conseils pour un ménage efficace", date: "10 juin 2024" },
                            { title: "Comment choisir sa nounou", date: "5 juin 2024" },
                            { title: "Nouveaux services disponibles", date: "1 juin 2024" }
                        ].map((news, index) => (
                            <li key={index} className="hover:text-white cursor-pointer transition">
                                <p className="font-medium">{news.title}</p>
                                <p className="text-sm text-[#0071bc]">{news.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                 {/* Section Réseaux sociaux */}
                <div>
                    <h3 className="text-xl font-bold text-[#0071bc] mb-4">Suivez-nous</h3>
                    <div className="flex space-x-4 mb-6">
                        <a href="#" className="text-white hover:text-[#ed117f] transition">
                            <FaFacebook size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-[#ed117f] transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-[#ed117f] transition">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-[#ed117f] transition">
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                    <button className="bg-[#ed117f] text-white px-6 py-2 rounded hover:bg-[#d10c6a] transition">
                        Estimation en ligne
                    </button>
                </div>
            </div>
        </div>
        
        {/* Copyright et liens légaux */}
        <div className="bg-[#e09998] py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0">
                        © Copyright {new Date().getFullYear()} CleanCare. Tous droits réservés.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-sm hover:text-white transition">News</a>
                        <a href="#" className="text-sm hover:text-white transition">FAQ</a>
                        <a href="#" className="text-sm hover:text-white transition">Politique de confidentialité</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default Footer;