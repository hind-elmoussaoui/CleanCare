import React from 'react';
import { Phone, MapPin, Calculator, Clock, Mail } from 'lucide-react';
import {FaFacebook, FaTwitter, FaWhatsapp, FaInstagram} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importez Link

const Footer = () => {
  // Liste des services avec leurs IDs correspondants
  const services = [
    { id: "menage-domicile", name: "Ménage à domicile" },
    { id: "garde-enfants", name: "Garde d’enfants" },
    { id: "menage-bureaux", name: "Ménage de bureaux" },
    { id: "garde-nuit", name: "Garde de nuit" },
    { id: "menage-profondeur", name: "Ménage en profondeur" },
    { id: "baby-sitting-weekend", name: "Baby-sitting week-end" }
  ];

  return (
    <footer className="relative w-full py-12 px-4">
      {/* Fond avec dégradé similaire à la navbar */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#a4bde7] to-white" />
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Colonne 1 - Contact */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#0463a3] mb-4">CONTACTEZ-NOUS</h3>
          <div className="flex items-start space-x-3">
            <Phone className="text-[#ed117f] mt-1 flex-shrink-0" />
            <span className="text-[#0463a3]">+212 6 12 34 56 78</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="text-[#ed117f] mt-1 flex-shrink-0" />
            <address className="not-italic text-[#0463a3]">
            123 Rue Hassan II,<br />
            Casablanca, Maroc
            </address>
          </div>
        </div>

        {/* Colonne 2 - À propos */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#0463a3] mb-4">À PROPOS</h3>
          <p className="text-[#0463a3]">
            Fondée en 2025, CleanCare s'est rapidement imposée comme l'une des principales plateformes pour les services de ménage et de garde d'enfants.
          </p>
          <p className="text-[#0463a3]">
            Notre objectif est d'écouter nos clients, de comprendre leurs besoins et de fournir un service exceptionnel.
          </p>
        </div>

        {/* Colonne 3 - Services */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#0463a3] mb-4">NOS SERVICES</h3>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.id} className="flex items-center text-[#0463a3]">
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

        {/* Colonne 4 - Infos pratiques */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#0463a3] mb-4">INFOS PRATIQUES</h3>
          
          <div className="flex items-start space-x-3 mb-4">
            <Clock className="text-[#ed117f] mt-1 flex-shrink-0" />
            <div className="text-[#0463a3]">
              <p className="font-semibold">Heures d'ouverture:</p>
              <p>Lundi-Vendredi: 8h00 - 18h00</p>
              <p>Samedi-Dimanche: 9h00 - 14h00</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="text-[#ed117f] mt-1 flex-shrink-0" />
            <a href="mailto:contact@cleancare.com" className="text-[#0463a3] hover:text-[#719be5]">contact@cleancare.com</a>
          </div>

          <button className="mt-4 flex items-center space-x-2 bg-[#ed117f] text-white px-4 py-2 rounded hover:bg-[#d10c6a] transition">
            <Calculator size={18} />
            <span>Estimer vos coûts</span>
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-12 pt-6 text-center border-t border-[#719be5]">
        <div className="mb-2.5 flex justify-center">
          <a href="#https://Facebook.com/cleanCare" className="text-[#0463a3] my-0 mx-2.5 text-[20px] no-underline hover:text-[#ed117f]"><FaFacebook/></a>
          <a href="#https://Twitter.com/cleanCare" className="text-[#0463a3] my-0 mx-2.5 text-[20px] no-underline hover:text-[#ed117f]"><FaTwitter/></a>
          <a href="#https://Whatsapp.com/cleanCare" className="text-[#0463a3] my-0 mx-2.5 text-[20px] no-underline hover:text-[#ed117f]"><FaWhatsapp/></a>
          <a href="#https://Instagram.com/cleanCare" className="text-[#0463a3] my-0 mx-2.5 text-[20px] no-underline hover:text-[#ed117f]"><FaInstagram/></a>
        </div>
        <p className="text-[#0463a3]">© Copyright {new Date().getFullYear()} CleanCare. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;