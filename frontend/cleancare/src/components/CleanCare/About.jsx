import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image1 from "../../assets/fem.jpg";
import Image2 from "../../assets/nounou.jpg";
import Image3 from "../../assets/ménage.jpg";

const About = () => {
    const navigate = useNavigate();

    const handleLearnMore = () => {
        navigate("/details");
    };

    return (
        <div className="w-full bg-gray-100">
            {/* Section À Propos de Nous */}
            <section className="container px-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Section des Images */}
                    <div className="grid md:grid-cols-2 gap-6 p-10">
                        {/* Colonne gauche (2 images en colonne) */}
                        <div className="md:col-span-1 flex flex-col space-y-4">
                            <img src={Image1} alt="Service 1" className="rounded-lg shadow-md" />
                            <img src={Image2} alt="Service 2" className="rounded-lg shadow-md" />
                        </div>
                        {/* Image grande à droite */}
                        <div>
                            <img src={Image3} alt="Service 3" className="rounded-lg shadow-md w-full h-full object-cover" />
                        </div>
                    </div>
                    {/* Section du Texte */}
                    <div className="md:col-span-1 text-center px-2">
                        <h2 className="text-4xl font-bold mt-8 mb-6">À PROPOS DE CLEANCARE</h2>
                        <div className="w-20 h-1 bg-[#ed117f] mx-auto mt-2 mb-12"></div>
                        <p className="text-gray-800 mb-7 text-lg">
                            Un niveau exceptionnel de services de ménage et de garde d'enfants.
                        </p>
                        <p className="mt-4 text-gray-700">
                            Fondée en 2025, CleanCare s'est rapidement imposée comme l'une des principales plateformes pour les services de ménage et de nounou. Notre quête constante de perfection nous a permis de croître chaque année. Notre objectif est d'écouter nos clients, de comprendre leurs besoins et de fournir un niveau exceptionnel de service.
                        </p>
                        <button 
                            onClick={handleLearnMore}
                            className="mt-16 bg-[#4d9ddb] text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg font-semibold"
                        >
                            En Savoir Plus
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;