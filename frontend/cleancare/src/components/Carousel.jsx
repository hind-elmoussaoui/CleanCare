import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image1 from "../assets/menage.jpg"; 
import Image2 from "../assets/kampus.jpg"; 
import Image3 from "../assets/drew-9462345.jpg";
import Image4 from "../assets/tima.jpg";
import Image5 from "../assets/pexels.jpg"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Pour les flèches
import { useState, useEffect } from "react"; // Pour gérer le slogan dynamique et l'animation

const services = [
  {
    src: Image1,
    slogan: "CleanCare : Propreté et Sérénité à votre service.",
  },
  {
    src: Image2,
    slogan: "Votre quotidien simplifié, grâce à CleanCare.",
  },
  {
    src: Image3,
    slogan: "Ménage impeccable, garde d'enfants fiable.",
  },
  {
    src: Image4,
    slogan: "CleanCare : Des services qui font la différence.",
  },
  {
    src: Image5,
    slogan: "Votre tranquillité, notre mission.",
  },
];

const Carousel = () => {
  const [activeSlogan, setActiveSlogan] = useState(services[0].slogan); // État pour le slogan actif
  const [displayedSlogan, setDisplayedSlogan] = useState(""); // État pour le slogan affiché (animation)
  const [animate, setAnimate] = useState(false); // État pour déclencher l'animation

  useEffect(() => {
    if (animate) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= activeSlogan.length) {
          setDisplayedSlogan(activeSlogan.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Vitesse de l'animation (50ms par caractère)
      return () => clearInterval(interval);
    }
  }, [animate, activeSlogan]);

  return (
    <div className="relative p-9">
      {/* Carrousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // Espace entre les slides
        slidesPerView={1.5} // Nombre de slides visibles (1.5 pour montrer une partie des slides adjacentes)
        centeredSlides={true} // Centre l'image active
        loop={true} // Boucle infinie
        navigation={{
          nextEl: ".swiper-button-next", // Flèche suivante
          prevEl: ".swiper-button-prev", // Flèche précédente
        }}
        pagination={{ clickable: true }} // Pagination pour les points
        autoplay={{ delay: 3000 }} // Défilement automatique
        className="w-full max-w-5xl mx-auto"
        onSlideChange={(swiper) => {
          // Appliquer des effets dynamiques lors du changement de slide
          const slides = swiper.slides;
          slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
              // Slide active (centrale)
              slide.style.transform = "scale(1)";
              slide.style.opacity = "1";
            } else {
              // Slides adjacentes
              slide.style.transform = "scale(0.8)";
              slide.style.opacity = "0.5";
            }
          });

          // Mettre à jour le slogan actif en utilisant realIndex
          setActiveSlogan(services[swiper.realIndex].slogan);

          // Déclencher l'animation
          setAnimate(true);
        }}
        onSwiper={(swiper) => {
          // Appliquer les effets initiaux
          const slides = swiper.slides;
          slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
              // Slide active (centrale)
              slide.style.transform = "scale(1)";
              slide.style.opacity = "1";
            } else {
              // Slides adjacentes
              slide.style.transform = "scale(0.8)";
              slide.style.opacity = "0.5";
            }
          });

          // Définir le slogan initial
          setActiveSlogan(services[0].slogan);
          setDisplayedSlogan(services[0].slogan); // Afficher le slogan initial sans animation
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className="relative transition-transform duration-300">
            <img
              src={service.src}
              alt={`Service ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slogan en dessous du carrousel avec animation de texte dévoilé */}
      <div className="text-center mt-6">
        <p className="text-2xl font-bold text-[#4d9ddb]">
          {displayedSlogan}
          <span className="inline-block w-1 h-5 bg-[#4d9ddb] animate-blink"></span> {/* Curseur clignotant */}
        </p>
      </div>

      {/* Flèches de navigation en dessous du slogan */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        {/* Flèche précédente (prev) */}
        <div className="swiper-button-prev p-3 rounded-full  cursor-pointer">
          <FaChevronLeft className="text-gray-800" />
        </div>

        {/* Flèche suivante (next) */}
        <div className="swiper-button-next  p-3 rounded-full cursor-pointer">
          <FaChevronRight className="text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;