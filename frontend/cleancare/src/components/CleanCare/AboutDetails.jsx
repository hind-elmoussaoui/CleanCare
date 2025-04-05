import React, { useEffect } from 'react';
import { Check, Shield, Home } from "lucide-react";
import Image1 from "../../assets/fem.jpg";
import Image2 from "../../assets/nounou.jpg";
import Image3 from "../../assets/ménage.jpg";
import TeamImage from "../../assets/be.jpg";
import Image from "../../assets/pexels-timmossholder-1154738.jpg";
import 'aos/dist/aos.css';

const AboutDetails = () => {
    // Initialize AOS
    useEffect(() => {
        const loadAOS = async () => {
            const AOS = (await import('aos')).default;
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        };
        loadAOS();
    }, []);

    const features = [
        {
            icon: <Home size={32} className="text-[#ed117f]" />,
            title: "Services de Ménage",
            items: [
                "Nettoyage approfondi toutes surfaces",
                "Produits écologiques certifiés",
                "Matériel professionnel fourni",
                "Personnel formé aux techniques modernes"
            ]
        },
        {
            icon: <Shield size={32} className="text-[#ed117f]" />,
            title: "Garde d'Enfants",
            items: [
                "Nounous diplômées petite enfance",
                "Activités éducatives adaptées",
                "Aide aux devoirs scolaires",
                "Garde périscolaire disponible"
            ]
        }
    ];

    return (
        <div className="bg-gray-50 overflow-hidden">
            {/* Hero Section */}
            <section 
                className="relative py-20 px-6 text-white"
                data-aos="fade"
            >
                <div className="absolute inset-0">
                    <img
                        src={Image}
                        alt="Background"
                        className="w-full h-80 object-cover opacity-70"
                        data-aos="fade-in"
                        data-aos-delay="200"
                    />
                    <div className="absolute inset-0 opacity-50"></div>
                </div>
                <div 
                    className="relative z-10 max-w-6xl mx-auto text-center"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Histoire</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Découvrez l'engagement et les valeurs qui font de CleanCare un leader dans les services à domicile.
                    </p>
                </div>
            </section>

            {/* Notre Histoire */}
            <section className="py-16 px-4 container mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div 
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Fondation & Croissance</h2>
                        <div className="space-y-4 text-gray-800">
                            <p>
                                Créée en 2025 par une équipe de professionnels du service à domicile, CleanCare est née d'un constat simple : 
                                les familles méritent des services fiables et de qualité.
                            </p>
                            <p>
                                En seulement quelques années, nous avons construit un réseau de plus de 200 professionnels rigoureusement 
                                sélectionnés et formés selon nos standards exigeants.
                            </p>
                            <p>
                                Aujourd'hui présent dans 10 villes, CleanCare continue son expansion tout en maintenant sa promesse 
                                originelle : un service personnalisé et humain.
                            </p>
                        </div>
                    </div>
                    
                    <div 
                        className="grid md:grid-cols-2 gap-6 p-2"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <div className="md:col-span-1 flex flex-col space-y-6">
                            <img 
                                src={Image1} 
                                alt="Service 1" 
                                className="rounded-lg shadow-md h-50"
                                data-aos="zoom-in"
                                data-aos-delay="400"
                            />
                            <img 
                                src={Image2} 
                                alt="Service 2" 
                                className="rounded-lg shadow-md h-50"
                                data-aos="zoom-in"
                                data-aos-delay="500"
                            />
                        </div>
                        <img 
                            src={Image3} 
                            alt="Service 3" 
                            className="rounded-lg shadow-md w-full h-full object-cover"
                            data-aos="zoom-in"
                            data-aos-delay="600"
                        />
                    </div>
                </div>
            </section>

            {/* Nos Services */}
            <section className="py-16 bg-gray-100">
                <div className="container px-6 max-w-5xl mx-auto">
                    <h2 
                        className="text-3xl font-bold text-center text-gray-900 mb-12"
                        data-aos="fade-up"
                    >
                        Nos Engagements
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                data-aos="fade-up"
                                data-aos-delay={index * 100 + 200}
                            >
                                <div className="flex items-center mb-4">
                                    {feature.icon}
                                    <h3 className="text-2xl font-semibold ml-3 text-gray-900">{feature.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {feature.items.map((item, i) => (
                                        <li 
                                            key={i} 
                                            className="flex items-start"
                                            data-aos="fade-right"
                                            data-aos-delay={i * 50 + index * 100 + 300}
                                        >
                                            <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                            <span className="text-gray-800">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notre Équipe */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div 
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <img 
                            src={TeamImage} 
                            alt="Notre équipe" 
                            className="rounded-lg shadow-md w-full"
                        />
                    </div>
                    <div 
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Philosophie</h2>
                        <div className="space-y-6 text-gray-800">
                            <p data-aos="fade-up" data-aos-delay="400">
                                Chez CleanCare, nous croyons que des services à domicile de qualité commencent par des professionnels 
                                épanouis et reconnus à leur juste valeur.
                            </p>
                            <p data-aos="fade-up" data-aos-delay="500">
                                Nous investissons continuellement dans la formation de notre personnel et maintenons des standards 
                                salariaux au-dessus du marché.
                            </p>
                            <p data-aos="fade-up" data-aos-delay="600">
                                Notre approche humaine nous permet d'offrir une expérience personnalisée à chaque famille, adaptée 
                                à leurs besoins spécifiques.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section 
                className="py-10 px-2 mb-10 mt-10 ml-10 mr-10 bg-[#f4b3b1] text-black text-center rounded-xl"
                data-aos="zoom-in"
                data-aos-delay="200"
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Prêt à faire confiance à CleanCare ?</h2>
                    <p className="text-xl mb-8 max-w-4xl mx-auto">
                        Contactez-nous pour discuter de vos besoins et obtenir un service sur mesure.
                    </p>
                    <button 
                        className="px-8 py-3 bg-white text-[#d15cb1] font-semibold rounded-lg shadow-md hover:bg-[#d15cb1] hover:text-white transition duration-300"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        Nous Contacter
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutDetails;