import React, {useState} from 'react';
import { ShieldCheck, Baby, Sparkles, Users} from "lucide-react";
import { FaBroom, FaChild, FaShieldAlt } from "react-icons/fa";
import backgroundImage from "../assets/image_01-4.jpg";
import Image from "../assets/pour.jpg";

const services = [
    {
    id: "menage",
    icon: <FaBroom className="text-5xl mb-2 " />,
    title: "SERVICE MÉNAGE",
    description: `Nos femmes de ménage sont rigoureusement sélectionnées et formées pour garantir un nettoyage de qualité.
    Que ce soit pour un entretien régulier, un grand ménage de printemps ou un nettoyage après travaux, nous nous adaptons
    à vos besoins spécifiques. Profitez d’une maison propre et saine sans effort!`
    },
    {
    id: "nounou",
    icon: <FaChild className="text-5xl mb-2 " />,
    title: "GARDE D'ENFANTS",
    description: `Nos nounous qualifiées assurent la sécurité et le bien-être de vos enfants à domicile.
    Nous proposons un service personnalisé, adapté à votre emploi du temps et aux besoins de votre famille.
    Que ce soit pour une garde périscolaire, un baby-sitting occasionnel ou une nounou à plein temps, nous sommes là pour vous aider.`
    },
    {
    id: "securite",
    icon: <FaShieldAlt className="text-5xl mb-2 " />,
    title: "SÉCURITÉ & FIABILITÉ",
    description: `Votre sécurité est notre priorité. Tous nos intervenants sont soigneusement sélectionnés et vérifiés,
    avec des contrôles de références approfondis. Nous mettons un point d'honneur à fournir des services de qualité,
    avec un personnel de confiance, formé et expérimenté, pour garantir votre tranquillité d'esprit.`
    }
];

function Main() {

    const points = [
        {
        id: 1,
        icon: <Sparkles size={40} className="text-[#ed117f]" />,
        title: "Un Service Impeccable",
        description: "Nos agents assurent un ménage parfait et un environnement sain pour votre famille.",
        },
        {
        id: 2,
        icon: <ShieldCheck size={40} className="text-[#ed117f]" />,
        title: "Sécurité et Confiance",
        description: "Nous sélectionnons rigoureusement nos nounous et femmes de ménage pour garantir votre sérénité.",
        },
        {
        id: 3,
        icon: <Baby size={40} className="text-[#ed117f]" />,
        title: "Garde d’Enfants Expérimentée",
        description: "Nos nounous sont qualifiées et formées pour veiller sur vos enfants avec soin et attention.",
        },
        {
        id: 4,
        icon: <Users size={40} className="text-[#ed117f]" />,
        title: "Équipe Fiable et Professionnelle",
        description: "Nous offrons des services adaptés à vos besoins, que ce soit pour le ménage ou la garde d’enfants.",
        },
    ];

    const [selectedService, setSelectedService] = useState("menage");

    return (
        <div>
    <section className="bg-gray-100 py-16 px-6">
    <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Pourquoi nous choisir ?</h2>
        <div className="w-16 h-1 bg-[#ed117f] mx-auto mt-2 mb-6"></div>
        <p className="text-gray-600 text-lg mb-8">
            CleanCare vous assure un service de qualité, que ce soit pour 
            <br/>l’entretien de votre maison ou la garde de vos enfants.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2 flex flex-col gap-6">
            {points.slice(0, 2).map((point) => (
                <div key={point.id} className="flex items-center gap-4  p-6 rounded-lg ">
                {point.icon}
                <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-800">{point.title}</h3>
                    <p className="text-gray-600">{point.description}</p>
                </div>
            </div>
            ))}
        </div>

        <div className="relative flex justify-center items-center my-5">
        <div className="w-75 h-75 border-2 border-[#ed117f] rounded-full absolute"></div>
            <img
            src={Image}
            alt="Famille heureuse"
            className="w-full max-w-[300px] mx-auto rounded-full object-cover"
            />
        </div>

        <div className="md:w-1/2 flex flex-col gap-6">
            {points.slice(2).map((point) => (
            <div key={point.id} className="flex items-center gap-4  p-6 rounded-lg ">
                {point.icon}
                <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-800">{point.title}</h3>
                    <p className="text-gray-600">{point.description}</p>
                </div>
            </div>
            ))}
        </div>
        </div>

        <button className="mt-8 px-6 py-3 bg-[#ed117f] hover:bg-[#d10c6a] text-white font-semibold rounded-lg shadow-md transition duration-300">
            En savoir plus
        </button>
    </div>
    </section>
    
    <section
    className="relative w-full min-h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundAttachment: "fixed" }}
>
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50"></div>

    {/* Contenu */}
    <div className="relative z-10 text-center w-full max-w-5xl py-16 px-6">
        <h1 className="text-4xl font-semibold">Nos Priorités</h1>
        <div className="w-16 h-1 bg-white mx-auto mt-2 mb-6"></div>
        <p className="text-lg md:text-xl">
            Nos experts prennent soin de votre maison et de vos enfants avec professionnalisme.
        </p>
        

        {/* Menu avec liens */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
            {services.map((service) => (
                <button 
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex flex-col items-center px-4 py-2 transition-all ${
                        selectedService === service.id ? " opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                >
                    <span className="hidden md:block"> {/* Cache l'icône sur mobile */}
                        {service.icon}  
                    </span>
                    <p className="mt-2 text-xl font-semibold">{service.title}</p>
                </button>
            ))}
        </div>

        {/* Affichage du texte du service sélectionné */}
        <div className="mt-6 max-w-3xl mx-auto text-white text-lg md:text-base p-4 rounded-lg">
            <p>{services.find((s) => s.id === selectedService)?.description}</p>
        </div>
    </div>
</section>


    </div>
);
};

export default Main;



