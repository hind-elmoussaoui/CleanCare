import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import image1 from "../../assets/m.jpg";
import image2 from "../../assets/be.jpg";
import image3 from "../../assets/image.jpg";
import image4 from "../../assets/n.jpg";
import Button from './Button'; // Importer le bouton 3D

const backgroundImages = [image1, image2, image3, image4];

const texts = [
    "Un service fiable pour votre maison et vos enfants",
    "Nos employées sont formées et expérimentées",
    "Une garde d’enfants attentive et sécurisée",
    "Un service flexible et adapté à vos besoins"
];

const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate(); // Hook pour la navigation

    // Fonction pour passer à l'image suivante
    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
    };

    // Fonction pour revenir à l'image précédente
    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + backgroundImages.length) % backgroundImages.length);
    };

    // Changer l'image automatiquement toutes les 5 secondes
    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="relative w-full h-screen flex items-center justify-center text-white text-center overflow-hidden">
            {/* Affichage des images avec transitions */}
            {backgroundImages.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                        index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
                </div>
            ))}

            {/* Contenu textuel */}
            <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-10 md:w-[50rem] w-full px-6">
                <p className="text-2xl font-semibold">{texts[currentImage]}</p>
                <h1 className="text-4xl md:text-6xl font-light uppercase mt-6 leading-tight">
                    Des <span className="font-bold text-[#a4bde7]">femmes de ménage</span> et <span className="font-bold text-[#a4bde7]">nounous</span> de confiance
                </h1>
                <button
                    onClick={() => navigate("/reservation")} // Redirection vers la page de réservation
                    className="mt-12 px-6 py-3 bg-[#ed117f] hover:bg-[#d10c6a] text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Réserver un service
                </button>

                <div className="absolute flex md:left-1 left-1/6 space-x-4">
                    {/* Boutons 3D pour changer d'image */}
                    <Button onClick={prevImage} direction="❮" />
                    <Button onClick={nextImage} direction="❯" />
                </div>
            </div>
        </main>
    );
};

export default HeroSection;
