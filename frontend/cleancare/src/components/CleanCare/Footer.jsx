import React from 'react';
import { Phone, MapPin,  Mail, Calendar, Contact } from 'lucide-react';
import {FaFacebook, FaTwitter, FaWhatsapp, FaInstagram} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const services = [
    { id: "menage-domicile", name: "Ménage à domicile" },
    { id: "garde-enfants", name: "Garde d'enfants" },
    { id: "menage-bureaux", name: "Ménage de bureaux" },
    { id: "garde-nuit", name: "Garde de nuit" },
    { id: "menage-profondeur", name: "Ménage en profondeur" },
    { id: "baby-sitting-weekend", name: "Baby-sitting week-end" }
  ];

  return (
    <footer className="relative w-full py-4 px-2 bg-gradient-to-l from-[#a4bde7] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Contenu principal centré */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          
          {/* Colonne À propos */}
          <div className="max-w-xs text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#0463a3] mb-4">À PROPOS</h3>
            <p className="text-[#0463a3] mb-3">
              Fondée en 2025, CleanCare s'est rapidement imposée comme l'une des principales plateformes pour les services de ménage et de garde d'enfants.
            </p>
            <p className="text-[#0463a3]">
              Notre objectif est d'écouter nos clients, de comprendre leurs besoins et de fournir un service exceptionnel.
            </p>
          </div>

          {/* Colonne Services */}
          <div className="max-w-xs text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#0463a3] mb-4">NOS SERVICES</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id} className="flex items-center justify-center md:justify-start text-[#0463a3]">
                  <span className="w-2 h-2 bg-[#ed117f] rounded-full mr-2"></span>
                  <Link 
                    to={`/service/${service.id}`} 
                    className="hover:text-[#ed117f] hover:underline transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne Infos pratiques */}
          <div className="max-w-xs text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#0463a3] mb-4">INFOS PRATIQUES</h3>
            
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="text-[#ed117f] flex-shrink-0" />
                <span className="text-[#0463a3]">7j/7</span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="text-[#ed117f] flex-shrink-0" />
                <span className="text-[#0463a3]">+212 6 12 34 56 78</span>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="text-[#ed117f] flex-shrink-0" />
                <address className="not-italic text-[#0463a3]">
                  123 Rue Hassan II,<br />
                  Casablanca, Maroc
                </address>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="text-[#ed117f] flex-shrink-0" />
                <a href="mailto:contact@cleancare.com" className="text-[#0463a3] hover:text-[#719be5]">
                  contact@cleancare.com
                </a>
              </div>

              <button className="mt-2 flex items-center justify-center md:justify-start space-x-2 bg-[#ed117f] text-white px-4 py-2 rounded hover:bg-[#d10c6a] transition">
                <Link 
                to="/contact"
                className="inline-block bg-[#ed117f] text-white py-1 px-4 rounded-lg font-semibold hover:bg-[#d10c6a] transition-colors text-lg"
                >
                  contactez nous
                  </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright centré */}
        <div className="mt-2 pt-6 text-center border-t border-[#719be5]">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#https://Facebook.com/cleanCare" className="text-[#0463a3] text-xl hover:text-[#ed117f] transition">
              <FaFacebook />
            </a>
            <a href="#https://Twitter.com/cleanCare" className="text-[#0463a3] text-xl hover:text-[#ed117f] transition">
              <FaTwitter />
            </a>
            <a href="#https://Whatsapp.com/cleanCare" className="text-[#0463a3] text-xl hover:text-[#ed117f] transition">
              <FaWhatsapp />
            </a>
            <a href="#https://Instagram.com/cleanCare" className="text-[#0463a3] text-xl hover:text-[#ed117f] transition">
              <FaInstagram />
            </a>
          </div>
          <p className="text-[#0463a3]">
            © Copyright {new Date().getFullYear()} CleanCare. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;