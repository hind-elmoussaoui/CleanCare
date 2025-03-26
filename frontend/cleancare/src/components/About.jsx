import React from 'react';
import Image1 from "../assets/fem.jpg";
import Image2 from "../assets/nounou.jpg";
import Image3 from "../assets/ménage.jpg";

const About = () => {
    return (
        <div className="w-full bg-gray-100">
            {/* Section À Propos de Nous */}
            <section className="container px-4 py-4">
                <div className=" grid grid-cols-1 md:grid-cols-2">
                    {/* Section des Images */}
                    <div className="grid md:grid-cols-2 gap-6 p-10">
                        {/* Colonne gauche (2 images en colonne) */}
                        <div className="md:col-span-1 flex flex-col space-y-4">
                            <img src={Image1} alt="Service 1"  />
                            <img src={Image2} alt="Service 2"  />
                        </div>
                        {/* Image grande à droite */}
                        <div>
                            <img src={Image3} alt="Service 3" className=" shadow-md w-full h-90 object-cover" />
                        </div>
                    </div>
                    {/* Section du Texte */}
                    <div className="md:col-span-1 text-center px-2">
                        <h2 className="text-4xl font-bold mt-8 mb-6">À PROPOS DE CLEANCARE</h2>
                        <div className="w-20 h-1 bg-[#ed117f] mx-auto mt-2 mb-12"></div>
                        <p className="text-gray-700 mb-7">
                            Un niveau exceptionnel de services de ménage et de garde d'enfants.
                        </p>
                        <p className="mt-4 text-gray-700">
                            Fondée en 2025, CleanCare s'est rapidement imposée comme l'une des principales plateformes pour les services de ménage et de nounou. Notre quête constante de perfection nous a permis de croître chaque année. Notre objectif est d'écouter nos clients, de comprendre leurs besoins et de fournir un niveau exceptionnel de service.
                        </p>
                        <button className="mt-16 bg-[#4d9ddb] text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-300 ">
                            En Savoir Plus
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;