import React from "react";
import { useNavigate } from "react-router-dom"; // Import pour la navigation

const plans = [
    {
        name: "Pack Essentiel",
        price: "399",
        features: ["Ménage quotidien", "Nettoyage des sols et poussières", "Poussières et sanitaires"],
        unavailable: ["Garde d'enfants", "Repassage", "Grand ménage", "Courses"],
        buttonColor: "red",
    },
    {
        name: "Pack Confort",
        price: "599",
        features: ["Ménage quotidien", "Nettoyage des sols et poussières", "Poussières et sanitaires", "Garde d'enfants (2h/jour)", "Repassage des vêtements"],
        unavailable: ["Grand ménage", "Courses"],
        buttonColor: "red",
    },
    {
        name: "Pack Premium",
        price: "899",
        features: ["Ménage quotidien", "Grand ménage", "Nettoyage des sols et poussières", "fenêtres", "tapis et rideaux"],
        unavailable: ["Garde d'enfants", "Repassage des vêtements"],
        buttonColor: "yellow",
    },
    {
        name: "Pack Luxe",
        price: "1299",
        features: ["Ménage premium (8h/jour)", "Nettoyage intérieur/extérieur", "Garde d'enfants avec activités", "Repassage", "organisation des vêtements", "Courses et préparation des repas"],
        unavailable: [],
        buttonColor: "red",
    },
];

const PricingSection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-12 bg-blue-300/30">
            <div className="max-w-6xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-[#0071bc] mb-8">
                    Nos offres pour les femmes de ménage et les nounous
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-7 flex flex-col justify-between rounded-lg shadow-md ${
                                plan.name === "Pack Premium"
                                    ? "bg-[#9e588b] text-white translate-y-[-10px]"
                                    : "mb-5 bg-white cursor-pointer transition-transform duration-300 hover:scale-105"
                            }`}
                        >
                            <div>
                                <h3 className="text-lg font-bold uppercase mb-4">{plan.name}</h3>
                                <hr className="border-gray-300" />
                                <p className="text-2xl font-bold mt-8 mb-4">
                                    {plan.price} MAD <span className="text-gray-300">/mois</span>
                                </p>
                                <ul className="text-sm mb-6 space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            {feature}
                                        </li>
                                    ))}
                                    {plan.unavailable.map((feature, i) => (
                                        <li key={i} className="flex items-center line-through opacity-50">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() =>
                                    navigate("/commande", {
                                        state: { plan }, // Transmettre le plan sélectionné
                                    })
                                }
                                className={`py-2 w-full text-white font-semibold uppercase rounded-lg ${
                                    plan.buttonColor === "yellow"
                                        ? "bg-[#d15cb1] hover:bg-[#b565a0]"
                                        : "bg-[#9e588b] hover:bg-[#d15cb1]"
                                } transition duration-300`}
                            >
                                Commander maintenant
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;