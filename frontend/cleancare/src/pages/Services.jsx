import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChild, FaBuilding, FaMoon, FaBoxes, FaBaby } from "react-icons/fa"; 
import "../index.css";
import image_01 from "../assets/m.jpg";
import image_02 from "../assets/be.jpg";
import image_03 from "../assets/image.jpg";
import image_04 from "../assets/n.jpg";

const backgroundImages = [image_01, image_02, image_03, image_04];

// Données des services avec icônes associées
const servicesData = [
    { 
        id: 1, 
        name: "Ménage à domicile", 
        description: "Un service complet de nettoyage pour un espace propre et sain.", 
        icon: <FaHome />,
        price: "150"
    },
    { 
        id: 2, 
        name: "Garde d’enfants", 
        description: "Prise en charge des enfants avec activités et soins adaptés.", 
        icon: <FaChild />,
        image: image_02,
        price: "200"
    },
    { 
        id: 3, 
        name: "Ménage de bureaux", 
        description: "Nettoyage des espaces professionnels pour un environnement agréable.", 
        icon: <FaBuilding /> ,
        price: "250"
    },
    { 
        id: 4, 
        name: "Garde de nuit", 
        description: "Assurez le bien-être et la sécurité de vos enfants la nuit.", 
        icon: <FaMoon /> ,
        image: image_02,
        price: "300"
    },
    { 
        id: 5, 
        name: "Ménage en profondeur", 
        description: "Nettoyage intensif des murs, plafonds, plinthes et appareils électroménagers pour un intérieur impeccable.", 
        icon: <FaBoxes /> ,
        price: "350"
    },
    { 
        id: 6, 
        name: "Baby-sitting week-end", 
        description: "Garde d’enfants avec activités adaptées durant les week-ends.", 
        icon: <FaBaby /> ,
        image: image_02,
        price: "180"
    }
];


export default function Services() {
    const [flipped, setFlipped] = useState({});
    const [currentImage, setCurrentImage] = useState(0);

    const handleFlip = (id, isFlipped) => {
        setFlipped((prev) => ({ ...prev, [id]: isFlipped }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
            <div className="relative flex flex-col items-center text-white text-center overflow-y-auto">
                {backgroundImages.map((image, index) => (
                    <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 w-full ${
                        index === currentImage ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100%"
                        }}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
                    </div>
                    ))}
                    <div className="relative mt-2 px-4 mb-4">
                        <h1 className="text-3xl font-bold text-[#ed117f] mb-5">Nos Services</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:ml-4 mb-4">
                            {servicesData.map((service) => (
                                <div
                                key={service.id}
                                className={`flip-card w-80 max-w-xs h-55 cursor-pointer ${
                                    flipped[service.id] ? "flipped" : ""
                                }`}
                                onMouseEnter={() => handleFlip(service.id, true)}
                                onMouseLeave={() => handleFlip(service.id, false)}
                                >
                                    <div className="flip-card-inner w-full ">
                                        <div className="flip-card-front flex flex-col justify-center items-center bg-[#ed117f] p-4">
                                            <div className="icon text-3xl">{service.icon}</div>
                                            <h2 className="text-xl font-bold">{service.name}</h2>
                                        </div>
                                        <div className={`flip-card-back flex flex-col justify-center items-center text-black p-4 ${
                                                [2, 4, 6].includes(service.id) ? "nounou" : ""
                                            }`} >
                                            <h2>{service.name}</h2>
                                            <p className="text-sm">{service.description}</p>
                                            <p className="text-lg font-semibold text-white">Prix: {service.price} MAD</p> {/* Ajout du prix ici */}
                                            <Link 
                                            to={`/services/${service.id}`} 
                                            state={{ 
                                                selectedService: { 
                                                    id: service.id, 
                                                    name: service.name, 
                                                    description: service.description,
                                                    price: service.price
                                                }, 
                                            }}
                                            className="px-3 py-1 bg-[#ed117f] text-white rounded-md mt-2"
                                            onClick={() => console.log("Données envoyées :", { 
                                                id: service.id, 
                                                name: service.name, 
                                                description: service.description,
                                                price: service.price 
                                            })}
                                            >
                                                Réserver maintenant →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> 
                    </div>
            </div>
    );
}