import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image1 from "../assets/me.jpg";
import Image2 from "../assets/n.jpg";
import Image3 from "../assets/fem.jpg";
import Image4 from "../assets/nono.jpg";
import Image5 from "../assets/netoi.jpg";
import Image6 from "../assets/pour.jpg";

const services = [
  {
    image: Image1, 
    title: "Ménage à domicile",
    description: "Un service complet de nettoyage pour un espace propre et sain."
  },
  {
    image: Image2,
    title: "Garde d’enfants",
    description: "Prise en charge des enfants avec activités et soins adaptés."
  },
  {
    image: Image3,
    title: "Ménage de bureaux",
    description: "Nettoyage des espaces professionnels pour un environnement agréable."
  },
  {
    image: Image4,
    title: "Garde de nuit",
    description: "Assurez le bien-être et la sécurité de vos enfants la nuit."
  },
  {
    image: Image5,
    title: "Ménage en profondeur",
    description: "Nettoyage intensif des murs, plafonds, plinthes et appareils électroménagers pour un intérieur impeccable."
  },
  { 
    image: Image6,
    title: "Baby-sitting week-end", 
    description: "Garde d’enfants avec activités adaptées durant les week-ends.", 
  }
];

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = window.innerWidth < 768 ? 1 : 3; // Responsive: 1 carte sur mobile, 3 sur desktop

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage + services.length) % services.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-screen flex flex-col justify-center py-16 px-6 md:px-0">
      {/* Titre et description */}
      <div className="text-center mb-6">
        <h2 className="text-4xl md:text-4xl font-bold text-gray-800">Nos Services</h2>
        <div className="w-16 h-1 bg-[#ed117f] mx-auto mt-2 mb-6"></div>
        <p className="text-gray-600 text-sm md:text-base mt-2">Découvrez nos services professionnels pour un quotidien plus serein.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.slice(currentIndex, currentIndex + itemsPerPage).map((service, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-4 h-full flex flex-col">
            <img src={service.image} alt={service.title} className="w-full h-60 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-4 flex items-center justify-center">{service.title}</h3>
            <div className="w-16 h-0.5 bg-[#ed117f] mx-auto mt-2 mb-6"></div>
            <p className="text-gray-600 text-sm text-center min-h-[80px]">{service.description}</p>
          </div>
        ))}
      </div>
      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#ed117f] text-white hover:bg-white hover:text-[#ed117f] p-2 rounded-full shadow-md"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#ed117f] text-white hover:bg-white hover:text-[#ed117f] p-2 rounded-full shadow-md"
      >
        <ChevronRight />
      </button>
      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(services.length / itemsPerPage) }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${currentIndex / itemsPerPage === i ? 'bg-[#719be5]' : 'bg-gray-300'}`}
          ></span>
        ))}
      </div>
    </div>
  );
}