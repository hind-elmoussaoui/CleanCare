import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image1 from "../../assets/me.jpg";
import Image2 from "../../assets/kampus.jpg";
import Image3 from "../../assets/fem.jpg";
import Image4 from "../../assets/pexels.jpg";
import Image5 from "../../assets/pexels-cottonbro-4108789.jpg";
import Image6 from "../../assets/no.jpg";
import "../../App.css"

const services = [
  {
    id: "menage-domicile",
    image: Image1,
    title: "Ménage à domicile",
    description: "Un service complet de nettoyage pour un espace propre et sain."
  },
  {
    id: "garde-enfants",
    image: Image2,
    title: "Garde d'enfants",
    description: "Prise en charge des enfants avec activités et soins adaptés."
  },
  {
    id: "menage-bureaux",
    image: Image3,
    title: "Ménage de bureaux",
    description: "Nettoyage des espaces professionnels pour un environnement agréable."
  },
  {
    id: "garde-nuit",
    image: Image4,
    title: "Garde de nuit",
    description: "Assurez le bien-être et la sécurité de vos enfants la nuit."
  },
  {
    id: "menage-profondeur",
    image: Image5,
    title: "Ménage en profondeur",
    description: "Nettoyage intensif des murs, plafonds, plinthes et appareils électroménagers."
  },
  { 
    id: "baby-sitting-weekend",
    image: Image6,
    title: "Baby-sitting week-end", 
    description: "Garde d'enfants avec activités adaptées durant les week-ends.", 
  }
];

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [transitionDirection, setTransitionDirection] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSlide = (index) => {
    if (index > currentIndex) {
      setTransitionDirection('right');
    } else {
      setTransitionDirection('left');
    }
    setCurrentIndex(index);
  };

  // Animation classes
  const getAnimationClass = () => {
    if (transitionDirection === 'right') {
      return 'animate-fadeInRight';
    } else if (transitionDirection === 'left') {
      return 'animate-fadeInLeft';
    }
    return '';
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-screen flex flex-col justify-center py-16 px-6 md:px-0">
      {/* Titre et description */}
      <div className="text-center mb-6">
        <h2 className="text-4xl md:text-4xl font-bold text-gray-800">Nos Services</h2>
        <div className="w-16 h-1 bg-[#ed117f] mx-auto mt-2 mb-6"></div>
        <p className="text-gray-600 text-sm md:text-base mt-2">Découvrez nos services professionnels pour un quotidien plus serein.</p>
      </div>

      {/* Conteneur des cartes avec animation */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${getAnimationClass()}`}>
        {services.slice(currentIndex, currentIndex + itemsPerPage).map((service) => (
          <div key={service.id} className="group relative">
            <Link 
              to={`/service/${service.id}`} 
              className="absolute inset-0 z-10"
              aria-label={`Voir détails pour ${service.title}`}
            ></Link>
            <div className="bg-white shadow-lg rounded-xl p-4 h-full flex flex-col hover:shadow-xl transition-all duration-300 group-hover:bg-gray-50">
              <div className="relative overflow-hidden rounded-md">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-60 object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg font-semibold mt-4 flex items-center justify-center group-hover:text-[#ed117f] transition-colors">
                {service.title}
              </h3>
              <div className="w-16 h-0.5 bg-[#ed117f] mx-auto mt-2 mb-6"></div>
              <p className="text-gray-600 text-sm text-center min-h-[80px]">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>


      {/* Pagination Dots avec navigation intégrée */}
      <div className="flex justify-center mt-8 space-x-4">
        {Array.from({ length: Math.ceil(services.length / itemsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i * itemsPerPage)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${currentIndex / itemsPerPage === i ? 'bg-[#ed117f] w-6' : 'bg-gray-300'}`}
            aria-label={`Aller au service ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}