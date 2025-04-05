import React, { useEffect } from 'react';
import { ShieldCheck, Users, Check, Heart } from "lucide-react";
import Image from "../../assets/pexels-minan1398-1441585.jpg";

const MoreInfo = () => {
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

    const services = [
        {
            title: "Service Ménage Premium",
            features: [
                "Nettoyage approfondi de toutes les pièces",
                "Utilisation de produits écologiques",
                "Matériel professionnel fourni",
                "Flexibilité des horaires",
                "Service ponctuel ou régulier"
            ]
        },
        {
            title: "Garde d'Enfants Professionnelle",
            features: [
                "Nounous diplômées et expérimentées",
                "Activités éducatives adaptées",
                "Aide aux devoirs",
                "Garde d'enfants malades",
                "Service de nuit disponible"
            ]
        },
        {
            title: "Sécurité Totale",
            features: [
                "Contrôle rigoureux des antécédents",
                "Formation continue du personnel",
                "Assurance responsabilité civile",
                "Remplacement immédiat si besoin",
                "Suivi qualité régulier"
            ]
        }
    ];

    const stats = [
        { value: "98%", label: "Clients satisfaits" },
        { value: "500+", label: "Familles accompagnées" },
        { value: "10 ans", label: "D'expérience" },
        { value: "24/7", label: "Disponibilité" }
    ];

    return (
        <div className="bg-gray-50">
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">En savoir plus sur nos services</h1>
                    <p className="text-xl max-w-3xl mx-auto text-[#6b345c]">
                        Découvrez pourquoi des centaines de familles nous font confiance pour l'entretien de leur maison et la garde de leurs enfants.
                    </p>
                </div>
            </section>

            {/* Nos Services */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
                <h2 
                    className="text-3xl font-bold text-center mb-12 text-[#ed117f]"
                    data-aos="fade-up"
                >
                    Nos Services en Détail
                </h2>
                
                <div 
                    className="grid md:grid-cols-3 gap-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300"
                            data-aos="fade-up"
                            data-aos-delay={300 + (index * 100)}
                        >
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                            </div>
                            <ul className="space-y-3">
                                {service.features.map((feature, i) => (
                                    <li 
                                        key={i} 
                                        className="flex items-start hover:translate-x-1 transition-transform"
                                    >
                                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pourquoi Nous Choisir */}
            <section className="py-10 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 
                        className="text-3xl font-bold text-center mb-12 text-[#ed117f]"
                        data-aos="fade-up"
                    >
                        Notre Engagement
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div
                            data-aos="fade-right"
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                                    <Heart className="text-[#ed117f] mr-3" />
                                    Qualité Inégalée
                                </h3>
                                <p className="text-gray-600">
                                    Nous recrutons uniquement les meilleurs professionnels et leur offrons une formation continue pour garantir des services de la plus haute qualité.
                                </p>
                            </div>
                            
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                                    <ShieldCheck className="text-[#ed117f] mr-3" />
                                    Sécurité Maximale
                                </h3>
                                <p className="text-gray-600">
                                    Tous nos intervenants passent des vérifications d'antécédents approfondies et sont suivis régulièrement pour votre tranquillité d'esprit.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                                    <Users className="text-[#ed117f] mr-3" />
                                    Flexibilité Totale
                                </h3>
                                <p className="text-gray-600">
                                    Nous nous adaptons à vos besoins spécifiques, que ce soit pour un service ponctuel ou régulier, en journée ou en soirée.
                                </p>
                            </div>
                        </div>
                        
                        <div
                            data-aos="fade-left"
                            className="bg-white p-8 rounded-lg shadow-md"
                        >
                            <h3 className="text-2xl font-semibold mb-6 text-center text-[#7098da]">Nos Chiffres Clés</h3>
                            <div 
                                className="grid grid-cols-2 gap-6"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {stats.map((stat, index) => (
                                    <div 
                                        key={index} 
                                        className="text-center p-4 bg-gray-50 rounded-lg hover:bg-[#f0e6ee] transition-colors"
                                        data-aos="zoom-in"
                                        data-aos-delay={300 + (index * 100)}
                                    >
                                        <p className="text-4xl font-bold text-[#d15cb1]">{stat.value}</p>
                                        <p className="text-gray-600">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            

            {/* CTA Section */}
            <section 
                className="py-10 px-2 mt-20 ml-10 mr-10 bg-[#f4b3b1] text-black text-center rounded-xl"
                data-aos="zoom-in"
            >
                <div className="px-4 mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Prêt à essayer nos services ?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contactez-nous dès aujourd'hui pour un devis gratuit et sans engagement.
                    </p>
                    <button 
                        className="px-8 py-3 bg-white text-[#d15cb1] font-semibold rounded-lg shadow-md hover:bg-[#d15cb1] hover:text-white transition duration-300 hover:scale-105 active:scale-95"
                    >
                        Nous Contacter
                    </button>
                </div>
            </section>
            </section>
        </div>
    );
};

export default MoreInfo;